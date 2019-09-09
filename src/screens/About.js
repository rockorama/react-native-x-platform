// @flow

import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

const About = (props: NavigationScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>About</Text>
      <Button title="Back Home" onPress={() => props.navigation.goBack()} />
    </View>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
