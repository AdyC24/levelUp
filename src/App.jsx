import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import appRoutes from './routes/appRoutes';

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.clear(); // hanya clear saat belum login
    }
  }, []);
  
  return (
    <Routes>
      {appRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children?.map((child, i) => (
            <Route key={i} {...child} />
          ))}
        </Route>
      ))}
    </Routes>
  );
}
