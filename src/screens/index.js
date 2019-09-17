import Home from './Home'
import Settings from './Settings'

import Welcome from './Welcome'
import Register from './Register'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import AuthAction from './AuthAction'

export const INITIAL_ROUTE = '/welcome'

export default [
  {
    path: '/',
    screen: Home,
  },
  {
    path: '/settings',
    screen: Settings,
  },
  {
    path: '/welcome',
    screen: Welcome,
    noAuth: true,
  },
  {
    path: '/register',
    screen: Register,
    noAuth: true,
  },
  {
    path: '/login',
    screen: Login,
    noAuth: true,
  },
  {
    path: '/forgot-password',
    screen: ForgotPassword,
    noAuth: true,
  },
  {
    path: '/auth-action',
    screen: AuthAction,
    noAuth: true,
  },
]
