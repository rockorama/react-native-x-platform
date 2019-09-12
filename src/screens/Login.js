// @flow

import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import { COLORS } from '../styles'
import Screen from '../components/Screen'
import Context from '../context'
import { auth } from '../data/firebase'

const Login = (props: NavigationScreenProps) => {
  const { user } = useContext(Context)

  useEffect(() => {
    user && props.navigation.navigate('/')
  }, [user])

  if (user) {
    return null
  }

  const onPress = () => {
    auth.signInWithEmailAndPassword('diogo.perillo@gmail.com', 'password')
    props.navigation.navigate('/')
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Button title="Login" onPress={onPress} />
      </View>
    </Screen>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
