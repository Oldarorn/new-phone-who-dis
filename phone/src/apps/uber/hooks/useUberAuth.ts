import { useRecoilState } from 'recoil';
import { uberState } from './state';

export const useUberAuth = () => {
  const [ user, setUser ] = useRecoilState(uberState.loggedIn);
  return { user, setUser};
}