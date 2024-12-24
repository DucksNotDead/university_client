import { Menu, Space } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../entities/auth/lib';
import { ERole, ruRole } from '../shared/roles';

const items: ItemType<MenuItemType>[] = [
  { key: '/departments', label: 'Кафедры' },
  { key: '/disciplines', label: 'Дисциплины' },
  { key: '/faculties', label: 'Факультеты' },
  { key: '/specialities', label: 'Специальности' },
  { key: '/academic-loads', label: 'Нагрузки' },
  { key: '/standards', label: 'Стандарты' },
  { key: '/study-plans', label: 'Учебные планы' },
  { key: '/disciplines-in-study-plans', label: 'Дисциплины в учебном плане' },
  { key: '/syllabuses', label: 'Учебные программы' },
  { key: '/users', label: 'Пользователи' },
];

export function SidebarMenu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <Space direction={'vertical'} style={{ padding: 24 }}>
      <h3 style={{ color: '#fff' }}>Образовательный ресурс</h3>

      <div style={{ color: '#fff' }}>Роль: {ruRole[user?.role ?? ERole.User]}</div>

      <Menu
        mode={'vertical'}
        items={items}
        onClick={({ key }) => navigate(key)}
        selectedKeys={items
          .filter((item) => pathname === item?.key)
          .map((i) => (i?.key as string) ?? '')}
      />
    </Space>
  );
}
