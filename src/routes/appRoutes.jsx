import { Navigate } from 'react-router-dom';

import LoginPage from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import RoleRoute from '@/components/RoleRoute'
import Unauthorized from '@/pages/Unauthorized'
import StudentDashboard from '@/pages/StudentDashboard'
import AdminDashboard from '@/pages/AdminDashboard'
import TeacherDashboard from '@/pages/TeacherDashboard'
import RegisterTeacher from '@/pages/RegisterTeacher'
import RegisterStudent from '@/pages/RegisterStudent';
import StudentList from '@/pages/StudentList';
import TeacherList from '@/pages/TeacherList';
import MainLayout from '@/layouts/MainLayout';

const getDashboardPath = () => {
  const role = localStorage.getItem('role')
  if (role === 'admin') return '/dashboard/admin'
  if (role === 'teacher') return '/dashboard/teacher'
  if (role === 'student') return '/dashboard/student'
  return '/login'
}

const appRoutes = [
  {path: '/',
    element: <Navigate to={getDashboardPath()} />,
  },
  {path: '/dashboard/student',
    element: (
      <RoleRoute allowedRoles={['student']}>
        <MainLayout />
      </RoleRoute>
    ),
    children: [
      {
        index: true,
        element: <StudentDashboard/>
      }
    ]
  },
  {path: '/dashboard/admin',
    element: (
      <RoleRoute allowedRoles={['admin']}>
        <MainLayout/>
      </RoleRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard/>
      }
    ]
  },
  {path: '/dashboard/teacher',
    element: (
      <RoleRoute allowedRoles={['teacher']}>
        <MainLayout/>
      </RoleRoute>
    ),
    children: [
      {
        index: true,
        element: <TeacherDashboard/>
      }
    ]
  },
  {path: '/register-teacher',
    element: (
      <RoleRoute allowedRoles={['admin']}>
        <MainLayout />
      </RoleRoute>
    ),
    children: [
      { index: true, element: <RegisterTeacher /> }
    ]
  },
  {path: '/register-student',
    element: (
      <RoleRoute allowedRoles={['admin']}>
        <MainLayout />
      </RoleRoute>
    ),
    children: [
      { index: true, element: <RegisterStudent /> }
    ]
  },
  {path: '/users/students',
    element: (
      <RoleRoute allowedRoles={['admin']}>
        <MainLayout />
      </RoleRoute>
    ),
    children: [
      { index: true, element: <StudentList /> }
    ]
  },
  {path: '/teachers',
      element: (
        <RoleRoute allowedRoles={['admin']}>
          <MainLayout />
        </RoleRoute>
      ),
      children: [
        { index: true, element: <TeacherList /> }
      ]
  },
  {path: '/login',
    element: <LoginPage />,
  },
  {path: '/unauthorized',
    element: <Unauthorized />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]


export default appRoutes;
