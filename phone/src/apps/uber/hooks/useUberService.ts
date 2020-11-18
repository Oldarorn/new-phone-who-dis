import { useSetRecoilState } from 'recoil';
import { useNuiEvent } from '../../../os/nui-events/hooks/useNuiEvent';
import { uberState } from './state';
import { useDrivers } from './useDrivers';

export const useUberService = () => {
  const setDrivers = useSetRecoilState(uberState.drivers);
  useNuiEvent("UBER", "setDrivers", setDrivers);
  return useDrivers();
}
