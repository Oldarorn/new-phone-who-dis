import { Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './debug.styles'
import DebugEventContainer from './DebugEventContainer'
import { useDebugEventState } from './hooks/useDebugEvents'
import { DebugEvent } from '../typings/debug'

function DebugSideBar() {
  const classes = useStyles()
  const { debugEvents } = useDebugEventState()
  const debugEventsList = debugEvents.map((e: DebugEvent) => 
    <DebugEventContainer debugEvent={e} />
  )

  return(
    <div className={classes.debugSidebar}>
      <Typography variant='h5' component='h5' className={classes.debugTitle}>Debug Log</Typography>
      <div className={classes.debugEventWrapper}>
        {debugEventsList}
      </div>
    </div>
  )
}

export default DebugSideBar