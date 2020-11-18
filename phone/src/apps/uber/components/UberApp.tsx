import React from 'react'
import { AppWrapper } from '../../../ui/components'
import { AppContent } from '../../../ui/components/AppContent'
import DriverList from './drivers/DriverList'
import { UberTitle } from './UberTitle'
import { Route } from 'react-router-dom';

import './UberApp.css'
import DriverModal from './modal/DriverModal'
import { useUberAuth } from '../hooks/useUberAuth'
import { Auth } from './auth/Auth'
import { NavigationBar } from './navigation/NavigationBar'

const UberApp = () => {

  const { user } = useUberAuth();  

  return (
    <AppWrapper id="uber-app">
      <UberTitle />
      <DriverModal />
      <AppContent>
        {!user ? (<Auth />) : (
          <Route path="/uber" exact component={DriverList} />
        )}
      </AppContent>
      {!user ? undefined : <NavigationBar /> }
    </AppWrapper>
  )
}

export default UberApp;