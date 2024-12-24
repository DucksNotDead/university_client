import { appMessages } from './messages';

export const stringRules = [
  { min: 4, message: appMessages.validation.min(4) },
  { max: 50, message: appMessages.validation.max(50) },
];
