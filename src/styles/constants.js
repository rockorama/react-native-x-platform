import { Platform } from 'react-native'
import Constants from 'expo-constants'

export default Platform.select({
  ios: Constants.statusBarHeight,
  android: Constants.statusBarHeight + 20,
})
