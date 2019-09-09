// @flow

import React, { useContext } from 'react'
import { StyleSheet, Text, View, Platform, Button } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'
import Context from '../context'

const About = (props: NavigationScreenProps) => {
  const { screenSize } = useContext(Context)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About!</Text>
      <Text> Platform: {Platform.OS}</Text>
      <Text>
        Screen Size: {screenSize.width} x {screenSize.height}
      </Text>
      <Button title="Back" onPress={() => props.navigation.navigate('/')} />
    </View>
  )
}

export default About

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
