// @flow

import React, { useContext } from 'react'
import { StyleSheet, View, Button } from 'react-native'

import Navigate from '../navigation/Navigate'
import { COLORS } from '../styles'
import Screen from '../components/Screen'
import Context from '../context'
import { auth } from '../data/firebase'

const Login = () => {
  const { user } = useContext(Context)

  const onPress = () => {
    auth.signInWithEmailAndPassword('diogo.perillo@gmail.com', 'password')
  }

  if (user) {
    return <Navigate to="/" />
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
