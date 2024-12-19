import { IHeaderProps } from '../shared/types';
import { useAuth } from '../entities/auth/lib';
import { Button, Input, theme } from 'antd';
import { useCallback, useState } from 'react';
import { Filter, Search, User2 } from 'lucide-react';
import { LoginFormModal } from './login-form-modal';
import { TUserCredits } from '../entities/user/types';
import { RegistryFiltersDrawer } from './registry-filters-drawer';

interface IProps<T extends object> extends IHeaderProps<T> {}

export function RegistryHeader<T extends object>({ title, filters, search }: IProps<T>) {
  const { user, logout, login } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFiltersButtonClick = useCallback(() => {
    setIsFiltersModalOpen(() => true);
  }, []);

  const handleFiltersModalClose = useCallback(() => {
    setIsFiltersModalOpen(() => false);
  }, []);

  const handleFiltersModalConfirm = useCallback((filters: any) => {
    console.log(filters);
  }, []);

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
        {filters?.length && (
          <Button
            type={'text'}
            icon={<Filter size={18} />}
            onClick={handleFiltersButtonClick}
          >
            Отфильтровать
          </Button>
        )}
        {search && (
          <Input
            variant={'borderless'}
            prefix={
              <Search color={theme.getDesignToken().colorTextPlaceholder} size={18} />
            }
            placeholder={'Поиск'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}
      </div>

      <div className="col right">
        <Button type={'link'} icon={<User2 size={18} />} onClick={handleLoginButtonClick}>
          {user ? 'Выйти' : 'Войти'}
        </Button>
      </div>
      {filters?.length && (
        <RegistryFiltersDrawer
          isOpen={isFiltersModalOpen}
          onClose={handleFiltersModalClose}
          onConfirm={handleFiltersModalConfirm}
          filters={filters}
        />
      )}
      <LoginFormModal
        isOpen={isLoginModalOpen}
        onClose={handleLoginModalClose}
        onConfirm={handleLoginConfirm}
        isLoading={login.isPending}
      />
    </header>
  );
}
