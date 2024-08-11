import { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import PrivateRoute from '../src/components/PrivateRoute/PrivateRoute'; // Import PrivateRoute
import authRoutes from './routes/auth';
import privateRoutes from './routes';
import AuthLayout from './layout/AuthLayout';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      {/* Authentication Routes */}
      {authRoutes.map(({ path, component: Component, title }, i) => (
        <Route
          key={i}
          path={path}
          element={
            <AuthLayout>
              <Suspense fallback={<Loader />}>
                <PageTitle title={title + ' | Admin Dashboard Meraksa Aji'} />
                <Component />
              </Suspense>
            </AuthLayout>
          }
        />
      ))}

      {/* Private Routes */}
      {privateRoutes.map(({ path, component: Component, title }, i) => (
        <Route
          key={i}
          path={path}
          element={
            <PrivateRoute>
              <DefaultLayout>
                <Suspense fallback={<Loader />}>
                  <PageTitle title={title + ' | Admin Dashboard Meraksa Aji'} />
                  <Component />
                </Suspense>
              </DefaultLayout>
            </PrivateRoute>
          }
        />
      ))}
    </Routes>
  );
}

export default App;
