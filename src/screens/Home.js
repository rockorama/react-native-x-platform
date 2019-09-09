// @flow

import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

const Home = (props: NavigationScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to React Native X-Platform app!</Text>
      <Text>Start editing `src/screens/Home.js`</Text>
      <Button
        title="About"
        onPress={() => props.navigation.navigate('/about')}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto-Bold',
  },
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
