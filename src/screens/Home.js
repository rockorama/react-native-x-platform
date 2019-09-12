// @flow

import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import Screen from '../components/Screen'
import Text from '../components/Text'
import { COLORS } from '../styles'
import { auth } from '../data/firebase'

const Home = (props: NavigationScreenProps) => {
  return (
    <Screen>
      <View style={styles.container}>
        <Text variant="TITLE" center color={COLORS.RED}>
          Welcome to React Native X-Platform app!
        </Text>
        <Text>Start editing `src/screens/Home.js`</Text>
        <Button
          title="About"
          onPress={() => props.navigation.navigate('/about')}
        />
        <Button title="Logout" onPress={() => auth.signOut()} />
      </View>
    </Screen>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
