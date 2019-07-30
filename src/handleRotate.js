import { ScreenOrientation } from 'expo';
import {Dimensions } from 'react-native'

const changeScreenOrientation = () => {
  const {width, height} = Dimensions.get('window')
  if(width >= 600 && height >= 1000) {
     ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
  }
}

export default changeScreenOrientation