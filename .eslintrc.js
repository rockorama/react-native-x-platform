module.exports = {
  extends: ['mainframe', 'mainframe/jest', 'mainframe/react-native-web'],
  rules: {
    'react-native/no-raw-text': 'off',
    'react/no-unescaped-entities': 'off',
    'import/default': 'off',
    'import/no-named-as-default': 'off',
  },
  settings: {
    react: {
      version: '16.4',
      flowVersion: '0.80',
    },
  },
}
