// @flow

import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'

import ROUTES from '../screens'

type RouteProps = {
  history: {
    navigate: (value: string, state?: Object) => void,
    goBack: () => void,
  },
}

const MAPPED_ROUTES = ROUTES.map(route => {
  return {
    path: route.path,
    component: route.screen,
    exact: !route.hasParams,
  }
})

const navigate = history => {
  return (value, state) => {
    history.push(value, state)
  }
}

const goBack = history => {
  return () => {
    history.goBack()
  }
}

const getNavigation = history => {
  return { navigate: navigate(history), goBack: goBack(history) }
}

const navigationWrapper = Component => {
  const WrappedComponent = (props: RouteProps) => {
    const navigation = getNavigation(props.history)
    return <Component {...props} navigation={navigation} />
  }
  return WrappedComponent
}

const Routes = () => {
  return (
    <Router>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper">
        {MAPPED_ROUTES.map(item => {
          const Component = navigationWrapper(item.component)
          return <Route key={item.path} {...item} component={Component} />
        })}
      </AnimatedSwitch>
    </Router>
  )
}

export default Routes
