import Home from './Home'
import About from './About'

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
    path: '/about',
    screen: About,
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
