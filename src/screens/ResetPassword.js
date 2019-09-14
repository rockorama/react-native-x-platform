// @flow

import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import Navigate from '../navigation/Navigate'
import { COLORS, SPACING } from '../styles'

import Screen from '../components/Screen'
import Text from '../components/Text'
import TextField, { ConfirmPasswordValidation } from '../components/TextField'

import Context from '../context'
import { auth } from '../data/firebase'

const ResetPassword = (props: NavigationScreenProps) => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState(null)

  if (user) {
    return <Navigate to="/" />
  }

  const onSubmit = async payload => {
    if (payload.valid) {
      setLoading(true)
      setError(null)
      try {
        await auth.confirmPasswordReset(
          props.navigation.state.params.oobCode,
          payload.fields.password,
        )
        setDone(true)
      } catch (error) {
        setLoading(false)
        setError(error.message)
      }
    }
  }

  const goBack = () => {
    props.navigation.navigate('/login')
  }

  if (done) {
    return (
      <Screen
        headerProps={{
          title: 'Reset Password',
          onPressIcon: goBack,
        }}
        buttonProps={{
          title: 'Login',
          onPress: goBack,
        }}>
        <View style={styles.container}>
          <Text center style={styles.text}>
            Your password was successfuly reset.
          </Text>
        </View>
      </Screen>
    )
  }

  return (
    <Screen
      headerProps={{
        title: 'Reset Password',
        onPressIcon: goBack,
      }}
      buttonProps={{
        title: 'Reset',
        submit: true,
        loading,
      }}
      formProps={{
        onSubmit,
      }}>
      <View style={styles.container}>
        <TextField
          required
          type="password"
          name="oldPassword"
          label="Password"
        />
        <TextField
          required
          type="password"
          name="password"
          label="New Password"
        />
        <TextField
          required
          validation={ConfirmPasswordValidation}
          type="password"
          name="repeatNewPassword"
          label="Repeat New Password"
        />
        <Text style={styles.text} center variant="SMALL" color={COLORS.RED}>
          {error}
        </Text>
      </View>
    </Screen>
  )
}

export default ResetPassword

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  text: {
    padding: SPACING * 4,
  },
})
