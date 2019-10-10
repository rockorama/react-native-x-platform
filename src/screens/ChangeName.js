// @flow

import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import { COLORS, SPACING } from '../styles'

import Screen from '../components/Screen'
import Text from '../components/Text'
import TextField from '../components/TextField'
import { updateUser } from '../data/useData'
import Context from '../context'

const ChangeName = (props: NavigationScreenProps) => {
  const { user, userData, friends } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = async payload => {
    if (payload.valid && user && friends) {
      setLoading(true)
      setError(null)

      try {
        await updateUser(user.uid, { ...userData, ...payload.fields }, friends)
        setDone(true)
      } catch (error) {
        setLoading(false)
        setError(error.message)
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
          title: 'Change Name',
          onPressIcon: goBack,
        }}>
        <View style={styles.container}>
          <Text center style={styles.text}>
            Your name was successfuly changed.
          </Text>
        </View>
      </Screen>
    )
  }

  return (
    <Screen
      headerProps={{
        title: 'Change Name',
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
          defaultValue={userData ? userData.name : null}
          required
          name="name"
          label="Name"
        />
        <Text style={styles.text} center variant="SMALL" color={COLORS.RED}>
          {error}
        </Text>
      </View>
    </Screen>
  )
}

export default ChangeName

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
