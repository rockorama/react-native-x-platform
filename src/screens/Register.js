// @flow

import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import Navigate from '../navigation/Navigate'
import { COLORS, SPACING } from '../styles'

import Screen from '../components/Screen'
import Text from '../components/Text'
import TextField from '../components/TextField'

import Context from '../context'
import { auth } from '../data/firebase'

const Register = (props: NavigationScreenProps) => {
  const { user } = useContext(Context)
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
        await auth.createUserWithEmailAndPassword(
          payload.fields.email,
          payload.fields.password,
        )
      } catch (error) {
        setLoading(false)
        setError(error.message)
      }
    }
  }

  const goBack = () => props.navigation.navigate('/welcome')

  return (
    <Screen
      headerProps={{
        title: 'Register',
        onPressIcon: goBack,
      }}
      buttonProps={{
        title: 'Create Account',
        submit: true,
        loading,
      }}
      formProps={{
        onSubmit,
      }}>
      <View style={styles.container}>
        <TextField required name="name" label="Name" />
        <TextField required type="email" name="email" label="Email" />
        <TextField required type="password" name="password" label="Password" />

        <Text style={styles.text} center variant="SMALL" color={COLORS.RED}>
          {error}
        </Text>
      </View>
    </Screen>
  )
}

export default Register

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
