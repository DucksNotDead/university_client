import { createContext } from 'react';
import { IMessageContextValue } from './types';

export const MessageContext = createContext<IMessageContextValue>({
  success: (_) => {},
  error: (_) => {},
  info: (_) => {},
});
