// @flow

import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import Navigate from '../navigation/Navigate'
import { COLORS, SPACING } from '../styles'

import Screen from '../components/Screen'
import Text from '../components/Text'
import TextField from '../components/TextField'

import Context from '../context'
import { auth } from '../data/firebase'

const Login = (props: NavigationScreenProps) => {
  const { user, refreshUser } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (user) {
    return <Navigate to="/" />
  }

  const onSubmit = async payload => {
    if (payload.valid) {
      setLoading(true)
      setError(null)
      try {
        await auth.signInWithEmailAndPassword(
          payload.fields.email,
          payload.fields.password,
        )
        refreshUser()
      } catch (error) {
        setLoading(false)
        setError('Invalid username or password.')
      }
    }
  }

  const forgotPassword = () => props.navigation.navigate('/forgot-password')
  const goBack = () => props.navigation.navigate('/welcome')

  return (
    <Screen
      headerProps={{
        title: 'Login',
        onPressIcon: goBack,
      }}
      buttonProps={{
        title: 'Login',
        submit: true,
        loading,
      }}
      formProps={{
        onSubmit,
      }}>
      <View style={styles.container}>
        <TextField required type="email" name="email" label="Email" />
        <TextField required type="password" name="password" label="Password" />
        <TouchableOpacity style={styles.text} onPress={forgotPassword}>
          <Text center variant="SMALL">
            forgot password?
          </Text>
        </TouchableOpacity>
        <Text style={styles.text} center variant="SMALL" color={COLORS.RED}>
          {error}
        </Text>
      </View>
    </Screen>
  )
}

export default Login

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
