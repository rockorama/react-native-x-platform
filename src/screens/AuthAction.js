// @flow

import React from 'react'
import { type NavigationScreenProps } from 'react-navigation'

import ResetPassword from './ResetPassword'
import VerifyEmail from './VerifyEmail'

const AuthAction = (props: NavigationScreenProps) => {
  if (props.navigation.state.params.mode === 'resetPassword') {
    return <ResetPassword {...props} />
  }

  if (props.navigation.state.params.mode === 'verifyEmail') {
    return <VerifyEmail {...props} />
  }

  return null
}

export default AuthAction
