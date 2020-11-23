import React from 'react'
import { useUberAuth } from '../../hooks/useUberAuth';
import { Button, TextField } from '@material-ui/core';
import useStyles from './auth.styles';
import Nui from '../../../../os/nui-events/utils/Nui';

export const Auth = () => {
  const { setUser } = useUberAuth();
  const classes = useStyles();

  const handleLogin = () => {
    setUser(true)
  }

  return (
    <div className={classes.form}>
      <TextField
        placeholder="Name"
      />
      <TextField
        placeholder="Password"
      />
      <Button onClick={handleLogin}>Log in</Button>
    </div>
  )
}
