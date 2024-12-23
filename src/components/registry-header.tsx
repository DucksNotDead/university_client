import { IHeaderProps } from '../shared/types';
import { useAuth } from '../entities/auth/lib';
import { Button } from 'antd';
import { useCallback, useState } from 'react';
import { Plus, User2 } from 'lucide-react';
import { LoginFormModal } from './login-form-modal';
import { TUserCredits } from '../entities/user/types';
import { useSearchParams } from 'react-router';
import { ERole } from '../shared/roles';
import { useRights } from '../shared/utils';

interface IProps extends IHeaderProps {
  role: ERole | null;
}

export function RegistryHeader({ title, role }: IProps) {
  const [, setSearchParams] = useSearchParams();
  const { user, logout, login } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const canCreate = useRights(role);

  const handleCreate = useCallback(() => {
    setSearchParams(() => ({ create: 'true' }));
  }, [setSearchParams]);

  const handleLoginButtonClick = useCallback(() => {
    if (user) {
      logout.fn();
    } else {
      setIsLoginModalOpen(() => true);
    }
  }, [user, logout]);

  const handleLoginModalClose = useCallback(() => {
    setIsLoginModalOpen(() => false);
  }, []);

  const handleLoginConfirm = useCallback(
    (credits: TUserCredits) => {
      login.fn(credits);
    },
    [login],
  );

  return (
    <header>
      <div className="col left">
        <h1>{title}</h1>
        {canCreate && (
          <Button shape={'circle'} type={'primary'} onClick={handleCreate}>
            <Plus size={30} color={'white'} />
          </Button>
        )}
      </div>

      <div className="col right">
        <Button type={'link'} icon={<User2 size={18} />} onClick={handleLoginButtonClick}>
          {user ? 'Выйти' : 'Войти'}
        </Button>
      </div>
      <LoginFormModal
        isOpen={isLoginModalOpen}
        onClose={handleLoginModalClose}
        onConfirm={handleLoginConfirm}
        isLoading={login.isPending}
      />
    </header>
  );
}
