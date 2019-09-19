import Home from './Home'
import Settings from './Settings'
import AvatarUpload from './AvatarUpload'
import ChangePassword from './ChangePassword'
import ChangeName from './ChangeName'
import AddFriend from './AddFriend'
import Chat from './Chat'

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
    path: '/avatar',
    screen: AvatarUpload,
  },
  {
    path: '/change-password',
    screen: ChangePassword,
  },
  {
    path: '/add-friend',
    screen: AddFriend,
  },
  {
    path: '/change-name',
    screen: ChangeName,
  },
  {
    path: '/chat',
    screen: Chat,
    params: ['id'],
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
