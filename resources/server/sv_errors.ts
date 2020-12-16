import { CustomError } from "ts-custom-error/dist/custom-error.umd";

/**
 * @class BaseError
 * @extends CustomError
 * A custom error used for handling SQL related exceptions
 **/

class BaseError extends CustomError {
  /**
   * @param {string} ErrorName An error 'name' or category to be displayed
   * @param {message} [message] An optional message to also display with the error
   * */
  constructor(ErrorName: string, message?: string) {
    // Propagate message up a parent class
    super(message);
    // Doing this in case miniturization messes with the name property
    Object.defineProperty(this, "name", { value: name });
  }
}

export class GenericError extends BaseError {
  constructor(message?: string) {
    super("GenericError", message);
  }
}

/**
 * @class SqlTransactionError
 * @extends BaseError
 * A custom error used for handling SQL related exceptions.
 **/

export class SqlTransactionError extends BaseError {
  /**
   * @constructor
   * @param {string} message The error message to send the user
   **/
  constructor(message?: string) {
    super("SqlTransactionError", message);
  }
}

export class DiscordError extends BaseError {
  constructor(message?: string) {
    super("DiscordError", message);
  }
}

// TODO: Need to move these types somewhere else

interface ResponseMessage {
  [key: string]: string;
}

type MissingConvarLiterals =
  | "MISSING_SQL_CONNECT"
  | "SCREENSHOT_BASIC_TOKEN"
  | "DISCORD_CHANNEL_ENV_VAR";

/**
 * @class ConvarError
 * @extends BaseError
 * A Convar related Error that should be thrown when missing certain convars
 * from env variables
 **/

export class ConvarError extends BaseError {
  // Construct and dispatch to parent
  /**
   * @param {string} ConvarType One of the ConvarTypes listed in utils/errors.ts
   **/
  constructor(ConvarType: MissingConvarLiterals) {
    super("MissingConvar", ConvarError.getCodeFromType(ConvarType));
  }
  // Private method to get code form passed type
  private static getCodeFromType(code: MissingConvarLiterals) {
    return ConvarError.response[code];
  }
  // Responses
  public static response: ResponseMessage = {
    MISSING_SQL_CONNECT: "You are missing your MySQL Connect String!",
    MISSING_DISCORD_TOKEN:
      "You have enabled Discord logging, but do not have a token",
    SCREENSHOT_BASIC_TOKEN:
      "You are missing the screenshot basic service token.",
  };
}

export const handleErrorEvent = (e: Error) => {
  console.error("An error occured.");
  console.error(`${e.name}: ${e.message}`);
  console.error(e.stack);
};
