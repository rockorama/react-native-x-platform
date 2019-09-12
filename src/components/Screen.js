// @flow

import React from 'react'

import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import { COLORS } from '../styles/'

const Screen = (props: Object) => {
  const contentContainerStyle = [styles.contentContainer]

  if (Platform.OS === 'web') {
    contentContainerStyle.push(styles.shadowContainer)
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.outerContainer}>
      <SafeAreaView style={contentContainerStyle}>
        <View style={styles.flex1}>{props.children}</View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default Screen

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Platform.OS === 'web' ? COLORS.GREY_LIGHT : COLORS.WHITE,
  },
  contentContainer: {
    width: '100%',
    maxWidth: 800,
    maxHeight: Platform.OS === 'web' ? 800 : null,
    flex: 1,
    alignSelf: 'center',
  },
  shadowContainer: {
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
})
