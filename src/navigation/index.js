// @flow
import React, { useContext } from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Context from '../context'

import ROUTES, { INITIAL_ROUTE } from '../screens'

const APP_ROUTES = {}

ROUTES.filter(route => !route.noAuth).forEach(route => {
  APP_ROUTES[route.path] = {
    screen: route.screen,
  }
})

const AppStack = createStackNavigator(APP_ROUTES, {
  initialRouteName: '/',
  headerMode: 'none',
})

const AUTH_ROUTES = {}

ROUTES.filter(route => route.noAuth).forEach(route => {
  AUTH_ROUTES[route.path] = {
    screen: route.screen,
  }
})

const AuthStack = createStackNavigator(AUTH_ROUTES, {
  initialRouteName: INITIAL_ROUTE,
  headerMode: 'none',
})

const AppContainer = createAppContainer(AppStack)
const AuthContainer = createAppContainer(AuthStack)

const Router = () => {
  const context = useContext(Context)
  return context.user ? <AppContainer /> : <AuthContainer />
}

export default Router
