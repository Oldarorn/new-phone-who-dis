import { useRecoilState } from 'recoil';
import { uberState } from './state';

export const useDriverModal = () => {
  const [ modal, setModal ] = useRecoilState(uberState.modal);
  return { modal, setModal };
}