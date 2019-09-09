// @flow

import React, { useContext } from 'react'
import { StyleSheet, View, Platform, Button } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import Text from '../components/Text'
import Context from '../context'
import { COLORS } from '../styles'

const About = (props: NavigationScreenProps) => {
  const { screenSize } = useContext(Context)
  return (
    <View style={styles.container}>
      <Text variant="TITLE">About!</Text>
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
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
