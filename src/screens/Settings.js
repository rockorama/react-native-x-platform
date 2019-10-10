// @flow

import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import Screen from '../components/Screen'
import Text from '../components/Text'
import Button from '../components/Button'
import Avatar from '../components/Avatar'

import { COLORS, SPACING } from '../styles'
import { auth } from '../data/firebase'
import Context from '../context/'

const Settings = (props: NavigationScreenProps) => {
  const { userData } = useContext(Context)

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
      noLogo
      noScroll>
      {!!userData && (
        <View style={styles.container}>
          <View style={styles.avatarArea}>
            <Avatar url={userData.avatar} size="large" />
          </View>
          <Text center>{userData.name}</Text>

          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button
                title="Change Avatar"
                onPress={() => props.navigation.navigate('/avatar')}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Change Name"
                onPress={() => props.navigation.navigate('/change-name')}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Change Password"
                onPress={() => props.navigation.navigate('/change-password')}
              />
            </View>
          </View>
        </View>
      )}
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
  avatarArea: {
    marginTop: SPACING * 10,
    marginBottom: SPACING * 4,
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: SPACING * 2,
  },
})
