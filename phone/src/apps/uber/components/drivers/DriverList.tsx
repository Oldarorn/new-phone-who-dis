import { List } from '../../../../ui/components/List';
import React from 'react'
import { useDrivers } from '../../hooks/useDrivers';
import { DriverItem } from './DriverItem';
import { CircularProgress } from '@material-ui/core';

const DriverList = () => {
  const { drivers } = useDrivers()

  if (!drivers) return <CircularProgress />  

  return (
    <div>
      <List>
        {drivers.map((driver) => (
          <DriverItem key={driver.id} {...driver} />
        ))}
      </List>
    </div>
  )
}

export default DriverList;
