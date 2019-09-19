// @flow

import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'
import { getNewCredential } from '../data/firebase'

import { COLORS, SPACING } from '../styles'

import Screen from '../components/Screen'
import Text from '../components/Text'
import TextField, { ConfirmPasswordValidation } from '../components/TextField'

import Context from '../context'

const ChangePassword = (props: NavigationScreenProps) => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = async payload => {
    if (payload.valid && user) {
      setLoading(true)
      setError(null)

      try {
        const credential = getNewCredential(payload.fields.oldPassword)
        await user.reauthenticateWithCredential(credential)
        await user.updatePassword(payload.fields.password)
        setDone(true)
      } catch (err) {
        setLoading(false)
        setError(err.message)
      }
    }
  }

  const goBack = () => {
    props.navigation.navigate('/settings')
  }

  if (done) {
    return (
      <Screen
        headerProps={{
          title: 'Change Password',
          onPressIcon: goBack,
        }}>
        <View style={styles.container}>
          <Text center style={styles.text}>
            Your password was successfuly changed.
          </Text>
        </View>
      </Screen>
    )
  }

  return (
    <Screen
      headerProps={{
        title: 'Change Password',
        onPressIcon: goBack,
      }}
      buttonProps={{
        title: 'Save',
        submit: true,
        loading: loading,
      }}
      formProps={{
        onSubmit,
      }}>
      <View style={styles.container}>
        <TextField
          required
          type="password"
          name="oldPassword"
          label="Current Password"
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

export default ChangePassword

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
