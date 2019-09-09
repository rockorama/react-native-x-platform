// @flow

import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import Text from '../components/Text'
import { COLORS } from '../styles'

const Home = (props: NavigationScreenProps) => {
  return (
    <View style={styles.container}>
      <Text variant="TITLE" center color={COLORS.RED}>
        Welcome to React Native X-Platform app!
      </Text>
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
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
