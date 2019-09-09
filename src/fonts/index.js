import { loadAsync } from 'expo-font'

export default async () =>
  await loadAsync({
    'Roboto-Thin': require('./roboto/Roboto-Thin.ttf'),
    'Roboto-ThinItalic': require('./roboto/Roboto-ThinItalic.ttf'),
    'Roboto-Light': require('./roboto/Roboto-Light.ttf'),
    'Roboto-LightItalic': require('./roboto/Roboto-LightItalic.ttf'),
    'Roboto-Regular': require('./roboto/Roboto-Regular.ttf'),
    'Roboto-RegularItalic': require('./roboto/Roboto-RegularItalic.ttf'),
    'Roboto-Medium': require('./roboto/Roboto-Medium.ttf'),
    'Roboto-MediumItalic': require('./roboto/Roboto-MediumItalic.ttf'),
    'Roboto-Bold': require('./roboto/Roboto-Bold.ttf'),
    'Roboto-BoldItalic': require('./roboto/Roboto-BoldItalic.ttf'),
    'Roboto-Black': require('./roboto/Roboto-Black.ttf'),
    'Roboto-BlackItalic': require('./roboto/Roboto-BlackItalic.ttf'),
  })
