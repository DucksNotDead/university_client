export interface IMessageContextValue {
  success: (text: string) => void;
  error: (text: string) => void;
  info: (text: string) => void;
}
