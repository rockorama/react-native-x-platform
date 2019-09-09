// @flow

import React, { useContext } from 'react'
import { StyleSheet, Text, View, Platform, Button } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'
import Context from '../context'

const Home = (props: NavigationScreenProps) => {
  const { screenSize } = useContext(Context)
  return (
    <View style={styles.container}>
      <Text>Welcome to React Native X-Platform app!</Text>
      <Text>Start editing `Root.js`</Text>
      <Text> Platform: {Platform.OS}</Text>
      <Text>
        Screen Size: {screenSize.width} x {screenSize.height}
      </Text>
      <Button
        title="About"
        onPress={() => props.navigation.navigate('/about')}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
