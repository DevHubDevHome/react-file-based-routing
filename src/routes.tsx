// src/routes.tsx

import  { Fragment } from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

const PRESERVED = import.meta.glob('/src/pages/(_app|404).tsx', { eager: true });
const ROUTES = import.meta.glob('/src/pages/**/[a-z[]*.tsx', { eager: true });

const preserved = Object.keys(PRESERVED).reduce((preserved, file) => {
  const key = file.replace(/\/src\/pages\/|\.tsx$/g, '');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  return { ...preserved, [key]: PRESERVED[file].default };
}, {});

const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, '') // Remove base path, index, and .tsx
    .replace(/\[\.{3}([^\]]+)\]/g, '*') // Match [...slug] and convert to *
    .replace(/\[([^\]]+)\]/g, ':$1'); // Match [param] and convert to :param
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error

  return { path, component: ROUTES[route].default };
});

export const Routes = () => {
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const App = preserved?.['_app'] || Fragment;
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const NotFound = preserved?.['404'] || Fragment;

  return (
    <App>
      <Switch>
        {routes.map(({ path, component: Component = Fragment }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Switch>
    </App>
  );
};