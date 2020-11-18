import { Button, Chip, Paper, Slide, Avatar as MuiAvatar } from '@material-ui/core';
import React from 'react'
import { useDriverDetail } from '../../hooks/useDriverDetail';
import { useDriverModal } from '../../hooks/useDriverModal'
import useStyles from './modal.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

const DriverModal = () => {
  const classes = useStyles();
  const { modal, setModal } = useDriverModal();
  const { detail, setDetail } = useDriverDetail();

  const _handleClose = () => {
    setModal(false);
    setDetail(null);
  }

  if (!detail) return null

  return (
    <Paper className={modal ? classes.modalRoot : classes.modalHide}>
      <Slide direction="up" in={modal}>
        <div>
          <Button className={classes.closeButton} onClick={_handleClose}><FontAwesomeIcon icon={faAngleDoubleDown} size="2x" /> </Button>
          <div className={classes.driverDetails}>
            <MuiAvatar 
              src="https://thispersondoesnotexist.com/image"
              style={{
                height: 150,
                width: 150,
                margin: 'auto'
              }}
            />
            <div className={classes.driverName}>
              <h2 style={{ marginRight: 10 }}>{detail.name}</h2>
              <Chip style={{ fontSize: 18, textTransform: 'capitalize', fontWeight: 500 }} label={detail.status}/>
            </div>
            <div className={classes.driverDescriptions}>
              <h3 className={classes.descriptionProps}>Trips</h3>
              <h3 className={classes.descriptionProps}>Stars</h3>
              <h3 className={classes.descriptionProps}>Years</h3>
            </div>
            <div className={classes.driverText}>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
            </div>
          </div>
          <div className={classes.modalContent}>
            <div className={classes.actionSection}>
              <Button className={classes.requestButton}>
                <h3>Request Driver</h3>
              </Button>
            </div>
          </div>

        </div>
      </Slide>
    </Paper>
  )
}

export default DriverModal;
