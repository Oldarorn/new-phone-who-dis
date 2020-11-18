import { atom } from 'recoil';

export const uberState = {
  drivers: atom({
    key: 'uberDrivers',
    default: null
  }),
  modal: atom({
    key: 'requestDriverModal',
    default: true
  }),
  driverDetails: atom({
    key: 'uberDriverDetails',
    default: null
  }),
  loggedIn: atom({
    key: 'uberLoggedIn',
    default: true
  }),
  userType: atom({
    key: 'uberUserType',
    default: null
  })
}