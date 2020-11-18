import { useRecoilValue } from 'recoil';
import { IDrivers } from '../../../common/interfaces/uber';
import { uberState } from './state';

interface IDriversHook {
  drivers: IDrivers | null;
}

export const useDrivers = (): IDriversHook => {
  const drivers = useRecoilValue(uberState.drivers);
  return { drivers }
}