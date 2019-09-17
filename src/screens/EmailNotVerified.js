// @flow

import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { COLORS, SPACING } from '../styles'

import Screen from '../components/Screen'
import Text from '../components/Text'

import Context from '../context'

const EmailNotVerified = () => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  if (!user) {
    return null
  }

  const sendVerificationEmail = async () => {
    try {
      setLoading(true)

      await user.sendEmailVerification()
      setLoading(false)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <Screen
      headerProps={{
        title: 'Email verification',
      }}
      buttonProps={{
        title: 'Send again',
        onPress: sendVerificationEmail,
        loading,
      }}>
      <View style={styles.container}>
        {error ? (
          <Text center color={COLORS.RED} style={styles.text}>
            {error}
          </Text>
        ) : (
          <Text center style={styles.text}>
            We sent you an email with a link to verify your account.
          </Text>
        )}
      </View>
    </Screen>
  )
}

export default EmailNotVerified

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
