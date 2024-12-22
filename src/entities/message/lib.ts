import { useContext } from 'react';
import { MessageContext } from './context';

export function useMessage() {
  return useContext(MessageContext);
}
