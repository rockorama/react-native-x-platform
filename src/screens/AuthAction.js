// @flow

import React from 'react'
import { type NavigationScreenProps } from 'react-navigation'

import ResetPassword from './ResetPassword'

const AuthAction = (props: NavigationScreenProps) => {
  if (props.navigation.state.params.mode === 'resetPassword') {
    return <ResetPassword {...props} />
  }

  return null
}

export default AuthAction
