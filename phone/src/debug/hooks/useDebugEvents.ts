import { useRecoilState } from 'recoil';
import { debugEventState } from './state';

export const useDebugEventState = () => {
  const [debugEvents, setDebugEvents] = useRecoilState(
    debugEventState.debugEvents
  );
  return { debugEvents, setDebugEvents };
};
