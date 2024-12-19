import { Form, Input, Modal, Space } from 'antd';
import { TUserCredits } from '../entities/user/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IFormItem } from '../shared/types';
import { Messages } from '../shared/messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (credits: TUserCredits) => void;
  isLoading: boolean;
}

const loginFormConfig: IFormItem<TUserCredits>[] = [
  {
    name: 'login',
    label: 'Логин',
    rules: [
      { min: 5, message: Messages.validation.min(5) },
      { required: true, message: Messages.validation.required },
    ],
  },
  {
    name: 'password',
    label: 'Пароль',
    rules: [
      { min: 5, message: Messages.validation.min(5) },
      { required: true, message: Messages.validation.required },
    ],
  },
];

export function LoginFormModal({ isOpen, onClose, onConfirm, isLoading }: IProps) {
  const [form] = Form.useForm<TUserCredits>();
  const credits = Form.useWatch([], form);
  const [formIsReady, setFormIsReady] = useState(false);

  const prevIsLoading = useRef(false);

  const handleClose = useCallback(() => {
    form.resetFields();
    onClose();
  }, [onClose, form]);

  const handleOk = useCallback(() => {
    onConfirm(credits);
  }, [onConfirm, credits]);

  const handleEnter = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key === 'Enter' && formIsReady) {
        handleOk();
      }
    },
    [handleOk, formIsReady],
  );

  useEffect(() => {
    form
      ?.validateFields({ validateOnly: true })
      .then(() => setFormIsReady(() => true))
      .catch(() => setFormIsReady(() => false));
  }, [form, credits]);

  useEffect(() => {
    if (!isLoading && prevIsLoading.current) {
      handleClose();
    }
    prevIsLoading.current = isLoading;
  }, [isLoading, handleClose]);

  useEffect(() => {
    window.addEventListener('keypress', handleEnter);
    return () => window.removeEventListener('keypress', handleEnter);
  }, [handleEnter]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      onCancel={handleClose}
      onOk={handleOk}
      confirmLoading={isLoading}
      cancelText={'Отмена'}
      okText={'Войти'}
      okButtonProps={{ disabled: !formIsReady }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <h2>Вход</h2>
        <Form form={form} layout="vertical">
          {loginFormConfig.map((item) => (
            <Form.Item key={item.name} {...item}>
              <Input type={item.name === 'password' ? 'password' : 'text'} />
            </Form.Item>
          ))}
        </Form>
      </Space>
    </Modal>
  );
}
