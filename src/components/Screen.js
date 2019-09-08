import React from 'react'
import { View, Platform, StyleSheet, Text } from 'react-native'

export default (props) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to React Native X-Platform app!</Text>
      <Text>Start editing `Root.js`</Text>
      <Text> Platform: {Platform.OS}</Text>
      {/* <Text>Screen Size: {this.state.width} x {this.state.height}</Text> */}
    </View>
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
