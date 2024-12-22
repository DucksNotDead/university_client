import { Route, Routes } from 'react-router-dom';
import { IRoute } from './shared/types';
import { appRoutes } from './shared/routes';
import { Navigate } from 'react-router';
import { RegistryView } from './views/registry-view';
import { syllabusViewConfig } from './entities/syllabus/view-config';

const routes: IRoute[] = [
  {
    path: appRoutes.home,
    component: <Navigate to={appRoutes.syllabuses} />,
  },
  {
    path: appRoutes.departments,
    component: <>Departments</>,
  },
  {
    path: appRoutes.disciplines,
    component: <>Disciplines</>,
  },
  {
    path: appRoutes.faculties,
    component: <>Faculties</>,
  },
  {
    path: appRoutes.users,
    component: <>Users</>,
  },
  {
    path: appRoutes.specialities,
    component: <>Specialities</>,
  },
  {
    path: appRoutes.standards,
    component: <>Standards</>,
  },
  {
    path: appRoutes.studyPlans,
    component: <>Study plans</>,
  },
  {
    path: appRoutes.syllabuses,
    component: <RegistryView {...syllabusViewConfig} />,
  },
];

export function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path as string}
          path={route.path as string}
          element={route.component}
        />
      ))}
    </Routes>
  );
}
