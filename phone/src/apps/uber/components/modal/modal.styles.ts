import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  modalRoot: {
    zIndex: 10,
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  modalHide: {
    display: 'none'
  },
  closeButton: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: '10%',
  },
  driverDetails: {
    marginTop: 30,
    width: '100%',
    margin: '0 auto',
  },
  driverName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  driverDescriptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  descriptionProps: {
    margin: 10
  },
  driverText: {
    width: '100%',
    textAlign: 'center'
  },
  modalContent: {
    width: '100%',
    marginTop: 80,
    margin: 'auto'
  },
  driverTitle: {
    fontSize: 20,
    margin: 5
  },
  actionSection: {
    position: 'absolute',
    bottom: '20%',
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  requestButton: {
    backgroundColor: '#b887fc',
    height: 60,
    width: 200
  }
}))

export default useStyles;