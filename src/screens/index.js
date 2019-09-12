import Home from './Home'
import About from './About'
import Login from './Login'

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
    path: '/login',
    screen: Login,
    noAuth: true,
  },
]
