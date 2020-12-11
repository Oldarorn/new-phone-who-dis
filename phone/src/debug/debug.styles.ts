import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  debugEventContainer: {
    width: 250,
    fontSize: 16,
    backgroundColor: '#4B5563',
    padding: 10,
    color: '#fff',
    fontWeight: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 10,
  },
  debugSidebar: {
    width: 300,
    padding: 10,
    height: '100vh',
    backgroundColor: '#111827e8',
    display: 'absolute',
  },
  debugTitle: {
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  debugEventWrapper: {
    alignText: 'center',
    width: '100%',
    overflowY: 'auto',
    height: 850,
    alignItems: 'center',
  },
  dataBlock: {
    backgroundColor: '#6B7280',
    width: '100%',
    minHeight: '70px',
    borderRadius: '5px',
    marginTop: 10,
    padding: 5,
    fontSize: 12,
    overflowX: 'auto',
    color: '#F3F4F6',
    marginBottom: '5px',
  },
  message: {
    backgroundColor: '#6B7280',
    borderRadius: '5px',
    color: '#F3F4F6',
    padding: 5,
    marginTop: 5,
  },
}));

export default useStyles;
