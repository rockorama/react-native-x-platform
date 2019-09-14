// @flow

import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import Navigate from '../navigation/Navigate'
import { COLORS, SPACING } from '../styles'

import Screen from '../components/Screen'
import Text from '../components/Text'
import Icon from '../components/Icon'

import Context from '../context'

const Welcome = (props: NavigationScreenProps) => {
  const { user } = useContext(Context)

  if (user) {
    return <Navigate to="/" />
  }

  const login = () => props.navigation.navigate('/login')
  const register = () => props.navigation.navigate('/register')

  return (
    <Screen
      noLogo
      noScroll
      buttonProps={{
        title: 'Register',
        submit: true,
        onPress: register,
        secondary: true,
      }}
      secondaryButtonProps={{
        title: 'Login',
        submit: true,
        onPress: login,
      }}>
      <View style={styles.container}>
        <Icon name="Logo" width={360} height={190} />
        <Text center color={COLORS.GREY4}>
          Messaging everywhere
        </Text>
      </View>
    </Screen>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: SPACING * 20,
  },
})
