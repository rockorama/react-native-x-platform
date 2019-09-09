// @flow
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import ROUTES from './routes'

const MAPPED_ROUTES = {}

ROUTES.forEach(route => {
  MAPPED_ROUTES[route.path] = {
    screen: route.screen,
  }
})

const routeStack = createStackNavigator(MAPPED_ROUTES, {
  initialRouteName: '/',
  headerMode: 'none',
})

const AppContainer = createAppContainer(routeStack)

export default AppContainer
