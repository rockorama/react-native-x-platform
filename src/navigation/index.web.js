// @flow

import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Context from '../context'
import ROUTES from '../screens'

type History = {
  push: (value: string, state: Object) => void,
  goBack: () => void,
}

type RouteProps = {
  history: History,
  noAuth?: boolean,
}

const MAPPED_ROUTES = ROUTES.map(route => {
  return {
    path: route.path,
    component: route.screen,
    exact: !route.hasParams,
    noAuth: route.noAuth,
  }
})

const navigate = (history: History) => {
  return (value, state) => {
    history.push(value, state)
  }
}

const goBack = (history: History) => {
  return () => {
    history.goBack()
  }
}

const getNavigation = (history: History) => {
  return { navigate: navigate(history), goBack: goBack(history) }
}

const navigationWrapper = (Component: any, noAuth?: boolean) => {
  const WrappedComponent = (props: RouteProps) => {
    const context = useContext(Context)
    if (!context.user && !noAuth) {
      return <Redirect to="/login" />
    }

    const navigation = getNavigation(props.history)
    return <Component {...props} navigation={navigation} />
  }
  return WrappedComponent
}

const ROUTE_COMPONENTS = MAPPED_ROUTES.map(
  ({ component, noAuth, path, ...other }) => {
    const Component = navigationWrapper(component, noAuth)
    return <Route key={path} path={path} {...other} component={Component} />
  },
)

const Routes = () => {
  return <Router>{ROUTE_COMPONENTS}</Router>
}

export default Routes
