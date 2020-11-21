import React from "react";
import { ListItemText, Chip, Typography, ListItem } from "@material-ui/core";
import { DriverStars } from "./DriverStars";
import { green, red } from "@material-ui/core/colors";
import useStyles from "./driver.styles";
import { useDriverModal } from "../../hooks/useDriverModal";
import { useDriverDetail } from "../../hooks/useDriverDetail";
import { Avatar } from "@material-ui/core";
//import { T } from '@material-ui/core/styles';

export const DriverItem = (driver) => {
  const classes = useStyles();
  const { setModal } = useDriverModal();
  const { setDetail } = useDriverDetail();

  const driverStatus = {
    busy: {
      backgroundColor: red[500],
      fontSize: 14,
      textTransform: "uppercase",
      color: "#fff",
    },
    free: {
      backgroundColor: green[500],
      fontSize: 14,
      textTransform: "uppercase",
      color: "#fff",
    },
  };

  const handleModal = (driver) => {
    setModal(true);
    setDetail(driver);
  };

  return (
    <ListItem divider button onClick={() => handleModal(driver)}>
      {/* TODO: Replace with driver image when available */}
      <Avatar
        src="https://thispersondoesnotexist.com/image"
        style={{
          height: 50,
          width: 50,
          marginRight: "16px",
        }}
      />
      <ListItemText secondary={<DriverStars {...driver} />}>
        <Typography className={classes.driver}>{driver.name}</Typography>
      </ListItemText>
      <Chip label={driver.status} style={driverStatus[driver.status]} />
    </ListItem>
  );
};
