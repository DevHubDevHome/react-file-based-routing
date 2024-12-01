
```js
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
```


# Description of src/routes.tsx

The src/routes.tsx file dynamically sets up routing for a React application using react-router-dom and the import.meta.glob feature. It streamlines the process of configuring routes by automatically loading all page components located in the /src/pages directory and mapping them to corresponding URL paths.

Key Features

	1.	Dynamic Route Generation:
	•	Automatically maps files in the /src/pages directory to routes based on file structure.
	•	Supports dynamic route parameters (e.g., [id] becomes :id) and wildcard routes (e.g., [...slug] becomes *).
	2.	Special Preserved Pages:
	•	Handles special pages like _app and 404:
	•	_app: Acts as a wrapper for the entire application (e.g., layout, context providers).
	•	404: Displays when no matching route is found.
	3.	Error Handling with TypeScript:
	•	Uses @ts-expect-error comments to handle scenarios where TypeScript cannot infer the types of dynamically imported modules.
	4.	React Router Integration:
	•	Uses Routes and Route components from react-router-dom to render the appropriate page component for each route.
	•	Ensures the 404 page is displayed for unmatched routes.

Code Flow

	1.	Loading Special Pages:
	•	Uses import.meta.glob to eagerly load _app and 404 files.
	•	Processes these files into a preserved object where the keys are the filenames without extensions or paths.
	2.	Loading and Mapping Routes:
	•	Dynamically imports all page components in /src/pages/** that match a specific pattern.
	•	Converts filenames into paths by:
	•	Removing /src/pages, index, and .tsx.
	•	Converting [param] to :param.
	•	Converting [...slug] to *.
	3.	Rendering Routes:
	•	Wraps the application in the _app component (if it exists).
	•	Maps the processed routes to <Route> components.
	•	Includes a fallback route to render the 404 component for unmatched paths.

Example Usage

	•	Folder Structure:

src/
├── pages/
│   ├── _app.tsx
│   ├── 404.tsx
│   ├── index.tsx
│   ├── about.tsx
│   ├── [id].tsx
│   ├── posts/
│   │   ├── [slug].tsx


	•	Generated Routes:
	•	/ → index.tsx
	•	/about → about.tsx
	•	/:id → [id].tsx
	•	/posts/:slug → posts/[slug].tsx
	•	* → 404.tsx

Benefits

	•	Scalability: Easily add new pages by creating files in the /src/pages directory without modifying the routing logic.
	•	Maintainability: Centralized routing logic with clear conventions.
	•	Flexibility: Supports dynamic and wildcard routes seamlessly.

This file acts as the backbone of the application’s routing system, offering a clean and efficient way to manage routes dynamically.

```

# react-file-based-routing
# react-file-based-routing
