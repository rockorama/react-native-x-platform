// @flow

import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import { COLORS, SPACING } from '../styles'

import Screen from '../components/Screen'
import Text from '../components/Text'

import Context from '../context'
import { auth } from '../data/firebase'

const VerifyEmail = (props: NavigationScreenProps) => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    if (loading) {
      if (user && user.emailVerified) {
        setLoading(false)
      } else {
        const verifyEmail = async () => {
          try {
            await auth.applyActionCode(props.navigation.state.params.oobCode)
            setLoading(false)
          } catch (error) {
            setError(error.message)
          }
        }
        verifyEmail()
      }
    }
  }, [loading, user, props.navigation.state.params.oobCode])

  if (error) {
    return (
      <Screen
        headerProps={{
          title: 'Verifying email',
        }}>
        <View style={styles.container}>
          <Text center color={COLORS.RED} style={styles.text}>
            {error}
          </Text>
        </View>
      </Screen>
    )
  }

  const button = user
    ? {
        title: 'Set Avatar',
        onPress: () => props.navigation.navigate('/'),
        loading,
      }
    : {
        title: 'Login',
        onPress: () => props.navigation.navigate('/login'),
        loading,
      }

  return (
    <Screen
      headerProps={{
        title: loading ? 'Verifying email' : 'Email Verified',
      }}
      buttonProps={button}>
      <View style={styles.container}>
        <Text center style={styles.text}>
          {loading
            ? `Give me a minute, I'm verifying your email!`
            : 'Yay! All good now.'}
        </Text>
      </View>
    </Screen>
  )
}

export default VerifyEmail

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
