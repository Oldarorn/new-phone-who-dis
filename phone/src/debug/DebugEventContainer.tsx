import React from 'react'
import useStyles from './debug.styles';
import { Card } from '@material-ui/core';

function DebugEventContainer({debugEvent}) {
  const classes = useStyles()
  return(
    <Card className={classes.debugEventContainer} raised>
      <div>Action:
        <code style={{color: '#e3e1e1'}}> {debugEvent.action} </code>
      </div>
      {debugEvent.data && 
        <> 
          <div>Data</div>
          <div className={classes.dataBlock}>
            <pre>{JSON.stringify(debugEvent.data, null, 2)}</pre>
          </div>
        </>
      }
      {debugEvent.message && 
        <>
          <div>Message</div>
          <div className={classes.message}>
            <code>{debugEvent.message}</code>
          </div>
        </>
      }
    </Card>
  )
}

export default DebugEventContainer