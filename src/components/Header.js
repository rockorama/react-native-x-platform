// @flow

import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { SPACING } from '../styles/'
import Text from './Text'
import Icon from './Icon'

export type HeaderProps = {
  title: string,
  icon?: string,
  onPressIcon?: () => any,
}

const Header = (props: HeaderProps) => {
  return (
    <View style={styles.container}>
      {!props.onPressIcon ? null : (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={props.onPressIcon}>
          <Icon name={props.icon || 'ArrowBack'} />
        </TouchableOpacity>
      )}
      <View style={styles.textContainer}>
        <Text variant="HEADER">{props.title}</Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    height: SPACING * 13,
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    padding: SPACING * 4,
  },
  textContainer: {
    height: SPACING * 13,
    paddingHorizontal: SPACING * 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
