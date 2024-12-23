export enum ERole {
  Admin = 'Admin',
  Teacher = 'Teacher',
  DepartmentHead = 'DepartmentHead',
  EducationDepartmentEmployee = 'EducationDepartmentEmployee',
  User = 'User',
}

export const ruRole: Record<ERole, string> = {
  [ERole.Admin]: 'Администратор',
  [ERole.DepartmentHead]: 'Заведующий кафедры',
  [ERole.Teacher]: 'Преподаватель',
  [ERole.EducationDepartmentEmployee]: 'Сотрудник учебного отдела',
  [ERole.User]: 'Пользователь'
};

export const createRoles: ERole[] = [
  ERole.Admin,
  ERole.Teacher,
  ERole.EducationDepartmentEmployee,
];
