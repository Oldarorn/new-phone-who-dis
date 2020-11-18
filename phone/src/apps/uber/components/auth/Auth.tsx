import React from 'react'
import { useUberAuth } from '../../hooks/useUberAuth';
import { Button } from '@material-ui/core';

export const Auth = () => {
  const { setUser } = useUberAuth();

  const handleLogin = () => {
    setUser(true)
  }

  return (
    <div>
      <input></input>
      <Button onClick={handleLogin}>Log in</Button>
    </div>
  )
}
