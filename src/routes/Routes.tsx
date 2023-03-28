import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Register = lazy(() => import('../pages/Register'));

const Routes: React.FC = () => {
  return (
    <Suspense fallback="">
      <BrowserRouter>
        <RouterRoutes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
