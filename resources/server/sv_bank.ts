import events from "../utils/events";
import { ESX } from "./server";
import { getSource } from "./functions";
import { pool } from "./db";
import {
  Transfer,
  IBankCredentials,
} from "../../phone/src/common/typings/bank";
import { useIdentifier } from "./functions";
import { type } from "os";
import {
  SqlTransactionError,
  GenericError,
  handleErrorEvent,
} from "./sv_errors";

/**
 * Fetch all known banking transactions for a user using their
 * identifier
 *
 * @param {string} identifier
 * @returns {Promise<Transfer[]>} Returns a promise for an array of Transfers
 **/
async function fetchAllTransactions(identifier: string): Promise<Transfer[]> {
  try {
    const query =
      "SELECT * FROM npwd_bank_transfers WHERE identifier = ? ORDER BY id DESC";
    const [results] = await pool.query(query, [identifier]);
    return <Transfer[]>results;
  } catch (e) {
    handleErrorEvent(e);
  }
}

/**
 * Fetch banking credentials for a user, based on their NetID and
 * proxying ESX functions.
 *
 * @returns {{name, balance}: {name: string, balance: number}} Returns a promise for an array of Transfers
 **/
function fetchCredentials(): IBankCredentials {
  try {
    const _source = getSource();
    const xPlayer = ESX.GetPlayerFromId(_source);
    const name = xPlayer.getName();
    const balance = ESX.GetPlayerFromId(_source).getAccount("bank").money;

    if (!name || !balance)
      new GenericError(
        `Name or balance not found for player: ${xPlayer.getIdentifier()}`
      );

    return {
      name,
      balance,
    };
  } catch (e) {
    handleErrorEvent(e);
  }
}
/**
 * Add a new bank transfer event to table with
 * User Identifier and Transfer Object
 * @param {string} identifier Player's uniq ID
 * @param {Transfer} transfer Transfer object describing a transaction of money
 * */
async function addTransfer(
  identifier: string,
  transfer: Transfer
): Promise<any> {
  const xPlayer = ESX.GetPlayerFromId(getSource());
  const bankBalance = xPlayer.getAccount("bank").money;
  const sourceName = xPlayer.getName();

  const xTarget = ESX.GetPlayerFromId(transfer.targetID);

  // Emit failure alert if transfer is above bank balance
  if (transfer.transferAmount > bankBalance) {
    emitNet(events.BANK_TRANSACTION_ALERT, getSource(), false);
  }
  // Continue if valid
  else if (transfer.transferAmount < bankBalance) {
    // Sucess alert
    emitNet(events.BANK_TRANSACTION_ALERT, getSource(), true);

    //Remove
    xTarget.addAccountMoney("bank", transfer.transferAmount);
    xPlayer.removeAccountMoney("bank", transfer.transferAmount);

    const query =
      "INSERT INTO npwd_bank_transfers (identifier, target, amount, message, type, source) VALUES (?, ?, ?, ?, ?, ?)";
    try {
      // Exception if query is missing required fields
      if (!identifier || !transfer || !sourceName) new SqlTransactionError();
      const [results] = await pool.query(query, [
        identifier,
        transfer.targetID,
        transfer.transferAmount,
        transfer.message,
        "Transfer",
        sourceName,
      ]);
      const insertData = <any>results;
      return await getTransfer(insertData.insertId);
    } catch (e) {
      handleErrorEvent(e);
    }
  }
}

/**
 * Query a specific transfer based on passed ID
 * @param {number} transferId - Transfer ID
 * @returns {Promise<Transfer>} - Returns back first SQL result based on ID
 */
async function getTransfer(transferId: number): Promise<Transfer> {
  const query = "SELECT * FROM npwd_bank_transfers WHERE id = ?";
  const [results] = await pool.query(query, [transferId]);
  const transfers = <Transfer[]>results;
  // Take first result and returns
  const transfer = transfers[0];
  return { ...transfer };
}
/**
 * Receive BANK_FETCH_TRANSACTIONS event from client
 * and send it right back after fetched.
 * */
onNet(events.BANK_FETCH_TRANSACTIONS, async () => {
  try {
    const _source = (global as any).source;
    const _identifier = await useIdentifier();
    const transfer = await fetchAllTransactions(_identifier);

    emitNet(events.BANK_SEND_TRANSFERS, _source, transfer);
  } catch (e) {
    handleErrorEvent(e);
  }
});

onNet(events.BANK_ADD_TRANSFER, async (transfer: Transfer) => {
  const xTarget = ESX.GetPlayerFromId(transfer.targetID);
  try {
    const _identifier = await useIdentifier();
    const transferNotify = await addTransfer(_identifier, transfer);
    emitNet(events.BANK_TRANSACTION_NOTIFICATION, xTarget, transferNotify);
    emitNet(events.BANK_ADD_TRANSFER_SUCCESS, getSource());
  } catch (e) {
    handleErrorEvent(e);
    emitNet(events.BANK_TRANSACTION_ALERT, getSource(), false);
  }
});

onNet(events.BANK_GET_CREDENTIALS, () => {
  try {
    const credentials = fetchCredentials();
    emitNet(events.BANK_SEND_CREDENTIALS, getSource(), credentials);
  } catch (e) {
    handleErrorEvent(e);
  }
});
