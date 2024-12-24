import { Route, Routes } from 'react-router-dom';
import { IRoute } from './shared/types';
import { appRoutes } from './shared/routes';
import { Navigate, useLocation } from 'react-router';
import { RegistryView } from './views/registry-view';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useRef } from 'react';
import { syllabusConfig } from './entities/syllabus/config';
import { facultyConfig } from './entities/faculty/config';
import { disciplineConfig } from './entities/discipline/config';
import { departmentConfig } from './entities/department/config';
import { userConfig } from './entities/user/config';
import { specialityConfig } from './entities/speciality/config';
import { standardConfig } from './entities/standard/config';
import { studyPlanConfig } from './entities/study-plan/config';
import { academicLoadConfig } from './entities/academic-load/config';
import { disciplineInStudyPlanConfig } from './entities/discipline-in-study-plan/config';

export const appRouterRoutes: IRoute[] = [
  { path: appRoutes.departments, config: departmentConfig },
  { path: appRoutes.disciplines, config: disciplineConfig },
  { path: appRoutes.disciplinesInStudyPlans, config: disciplineInStudyPlanConfig },
  { path: appRoutes.faculties, config: facultyConfig },
  { path: appRoutes.users, config: userConfig },
  { path: appRoutes.specialities, config: specialityConfig },
  { path: appRoutes.standards, config: standardConfig },
  { path: appRoutes.studyPlans, config: studyPlanConfig },
  { path: appRoutes.syllabuses, config: syllabusConfig },
  { path: appRoutes.academicLoads, config: academicLoadConfig },
];

export function AppRouter() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <Routes location={location}>
      {appRouterRoutes.map((route) => (
        <Route
          key={route.path as string}
          path={route.path as string}
          element={
            <SwitchTransition mode={'out-in'}>
              <CSSTransition
                key={route.path}
                nodeRef={nodeRef}
                classNames={'page-transition'}
                timeout={150}
              >
                <div ref={nodeRef} className={'page-transition'}>
                  <RegistryView {...route.config} />
                </div>
              </CSSTransition>
            </SwitchTransition>
          }
        />
      ))}
      <Route path={'*'} element={<Navigate to={appRoutes.syllabuses} />} />
    </Routes>
  );
}
