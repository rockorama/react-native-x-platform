// @flow

import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import Screen from '../components/Screen'
import Text from '../components/Text'
import { COLORS } from '../styles'
import { auth } from '../data/firebase'
import Context from '../context/'
import useData from '../data/useData'

const Settings = (props: NavigationScreenProps) => {
  const { user } = useContext(Context)
  const id = user ? user.uid : 0
  const userData = useData(`users/${id}`)

  return (
    <Screen
      headerProps={{
        title: 'Settings',
        onPressIcon: () => props.navigation.navigate('/'),
      }}
      buttonProps={{
        title: 'Logout',
        secondary: true,
        onPress: () => auth.signOut(),
      }}
      noLogo>
      <View style={styles.container}>
        <Text variant="TITLE" center color={COLORS.RED}>
          {userData && userData.data && userData.data.name}
        </Text>
      </View>
    </Screen>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
