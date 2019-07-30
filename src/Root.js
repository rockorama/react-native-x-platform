import React from 'react';
import { StyleSheet, Text, View, Platform,  Dimensions } from 'react-native';
import handleRotate from './handleRotate'

export default class App extends React.Component {
  state = {}

  componentDidMount () {
    this.setScreenSize()
    handleRotate()
    Dimensions.addEventListener('change', this.setScreenSize)
  }

  componentWillUnmount () {
    Dimensions.removeEventListener('change', this.setScreenSize)
  }

  setScreenSize = () => {
    const { height, width } = Dimensions.get('window');
    this.setState({width, height})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to React Native X-Platform app!</Text>
        <Text>Start editing `Root.js`</Text>
        <Text> Platform: {Platform.OS}</Text>
        <Text>Screen Size: {this.state.width} x {this.state.height}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
