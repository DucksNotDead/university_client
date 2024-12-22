import { ReactNode } from 'react';
import { MessageContext } from './context';
import { message } from 'antd';

interface IProps {
  children: ReactNode;
}

export function MessageContextProvider({ children }: IProps) {
  const [api, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <MessageContext.Provider
        value={{
          success: (text) => api.open({ type: 'success', content: text }),
          error: (text) => api.open({ type: 'error', content: text }),
          info: (text) => api.open({ type: 'info', content: text }),
        }}
      >
        {children}
      </MessageContext.Provider>
    </>
  );
}
