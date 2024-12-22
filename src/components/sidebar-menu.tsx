import { Menu, Space } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../entities/auth/lib';
import { Role } from '../shared/roles';

interface IProps {}

const items: ItemType<MenuItemType>[] = [
  { key: '/departments', label: 'Кафедры' },
  { key: '/disciplines', label: 'Дисциплины' },
  { key: '/faculties', label: 'Факультеты' },
  { key: '/specialities', label: 'Специальности' },
  { key: '/standards', label: 'Стандарты' },
  { key: '/study-plans', label: 'Учебные планы' },
  { key: '/syllabuses', label: 'Учебные программы' },
  { key: '/users', label: 'Пользователи' },
];

const ruRole: Record<Role, string> = {
  [Role.Admin]: 'Администратор',
  [Role.DepartmentHead]: 'Заведующий кафедры',
  [Role.Teacher]: 'Преподаватель',
  [Role.EducationDepartmentEmployee]: 'Сотрудник учебного отдела',
  [Role.User]: 'Пользователь',
};

export function SidebarMenu(props: IProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <Space direction={'vertical'} style={{ padding: 24 }}>
      <h3 style={{ color: '#fff' }}>Образовательный ресурс</h3>

      <div style={{ color: '#fff' }}>Роль: {ruRole[user?.role ?? Role.User]}</div>

      <Menu
        mode={'vertical'}
        items={items}
        onClick={({ key }) => navigate(key)}
        selectedKeys={items
          .filter((item) => pathname.includes(item?.key as string))
          .map((i) => (i?.key as string) ?? '')}
      />
    </Space>
  );
}
