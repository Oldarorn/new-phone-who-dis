import { faLyft } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Paper } from '@material-ui/core'
import React from 'react'
import useStyles from './uber.styles'

export const UberTitle = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.header} variant="outlined" elevation={24} square>
        <FontAwesomeIcon className={classes.icon} icon={faLyft} />
      </Paper>
    </div> 
  )
}
