import React from 'react';
import { Dimensions } from 'react-native';

import Screen from './components/Screen'

export default class App extends React.Component {
  state = {}

  componentDidMount () {
    this.setScreenSize()
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
      <Screen />
    );
  }
}
