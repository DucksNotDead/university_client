import { Form, Input, Modal, Space } from 'antd';
import { TUserCredits } from '../entities/user/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IConfigFormItem } from '../shared/types';
import { appMessages } from '../shared/messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (credits: TUserCredits) => void;
  isLoading: boolean;
}

const loginFormConfig: IConfigFormItem<TUserCredits>[] = [
  {
    name: 'login',
    rules: [
      { min: 5, message: appMessages.validation.min(5) },
      { required: true, message: appMessages.validation.required },
    ],
  },
  {
    name: 'password',
    rules: [
      { min: 5, message: appMessages.validation.min(5) },
      { required: true, message: appMessages.validation.required },
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

    if (!isOpen) {
      window.removeEventListener('keypress', handleEnter);
    }

    return () => window.removeEventListener('keypress', handleEnter);
  }, [handleEnter, isOpen]);

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
              <Input
                placeholder={'Введите'}
                type={item.name === 'password' ? 'password' : 'text'}
              />
            </Form.Item>
          ))}
        </Form>
      </Space>
    </Modal>
  );
}
