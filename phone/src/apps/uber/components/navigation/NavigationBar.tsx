import React, { useState } from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import useStyles from './navigation.styles';

export const NavigationBar = () => {
  const [ page, setPage ] = useState(0);
  const classes = useStyles();
  return (
    <BottomNavigation
      value={page}
      onChange={(event, newPage) => {
        setPage(newPage)
      }}
      className={classes.root}
    >
      <BottomNavigationAction 
        component={Link}
        to="/uber"
        icon={<FontAwesomeIcon icon={faHome} />}
      />
      <BottomNavigationAction 
        component={Link}
        to="/uber/profile"
        icon={<FontAwesomeIcon icon={faUser} />}
      />
    </BottomNavigation>
  )
}
