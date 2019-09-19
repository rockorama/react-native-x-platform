// @flow

import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import { parse } from 'query-string'
import Context from '../context'
import ROUTES, { INITIAL_ROUTE } from '../screens'

type History = {
  push: (value: string, state: Object) => void,
  goBack: () => void,
  location: Object,
}

type Match = {
  params?: Object,
}

type RouteProps = {
  history: History,
  match: Match,
  noAuth?: boolean,
}

const MAPPED_ROUTES = ROUTES.map(route => {
  return {
    path: `${route.path}${
      route.params && route.params.length
        ? route.params.map(p => `/:${p}`).join('')
        : ''
    }`,
    component: route.screen,
    exact: !route.params || !route.params.length,
    noAuth: route.noAuth,
  }
})

const navigate = (history: History) => {
  return (value, state) => {
    let params = ''
    if (state) {
      params = `/${Object.keys(state)
        .map(k => state[k])
        .join('/')}`
    }
    history.push(`${value}${params}`)
  }
}

const goBack = (history: History) => {
  return () => {
    history.goBack()
  }
}

const getNavigation = (props: RouteProps) => {
  const state = {
    params: {},
  }

  if (props.match.params) {
    state.params = { ...state.params, ...props.match.params }
  }

  if (props.history.location && props.history.location.search) {
    const params = parse(props.history.location.search)
    state.params = { ...state.params, ...params }
  }

  return {
    navigate: navigate(props.history),
    goBack: goBack(props.history),
    state,
  }
}

const navigationWrapper = (Component: any, noAuth?: boolean) => {
  const WrappedComponent = (props: RouteProps) => {
    const context = useContext(Context)
    if (!context.user && !noAuth) {
      return <Redirect to={INITIAL_ROUTE} />
    }

    const navigation = getNavigation(props)
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
  return (
    <Router>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper">
        {ROUTE_COMPONENTS}
      </AnimatedSwitch>
    </Router>
  )
}

export default Routes
