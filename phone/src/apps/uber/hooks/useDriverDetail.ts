import { useRecoilState } from 'recoil';
import { uberState } from './state';
 
export const useDriverDetail = (): any => {
  const [ detail, setDetail ] = useRecoilState(uberState.driverDetails);
  return { detail, setDetail };
}