// @flow

import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import Screen from '../components/Screen'
import Text from '../components/Text'

import Avatar from '../components/Avatar'

import { COLORS, SPACING } from '../styles'
import Context from '../context/'

const AvatarUpload = (props: NavigationScreenProps) => {
  const { userData } = useContext(Context)

  return (
    <Screen
      headerProps={{
        title: 'Avatar Upload',
        onPressIcon: () => props.navigation.navigate('/settings'),
      }}
      buttonProps={{
        title: 'Upload',
        secondary: true,
        onPress: () => {},
      }}
      noLogo
      noScroll>
      {userData && (
        <View style={styles.container}>
          <TouchableOpacity>
            <View style={styles.avatarArea}>
              <Avatar url={userData.avatar} size="large" />
            </View>
            <Text center>
              {Platform.OS === 'web' ? 'Click' : 'Tap'} to change
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  )
}

export default AvatarUpload

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
})
