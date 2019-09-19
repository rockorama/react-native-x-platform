// @flow

import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { COLORS, SPACING } from '../styles'

type Props = {
  url?: string,
  size: 'x-small' | 'small' | 'large',
}

const AVATAR_PLACEHOLDER =
  'https://facebook.github.io/react-native/img/tiny_logo.png'

const Avatar = (props: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={
          props.size === 'small'
            ? styles.small
            : props.size === 'x-small'
            ? styles.xSmall
            : styles.large
        }
        source={{
          uri: props.url || AVATAR_PLACEHOLDER,
        }}
      />
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.GREEN,
    padding: SPACING / 2,
  },
  xSmall: {
    width: 25,
    height: 25,
  },
  small: {
    width: 40,
    height: 40,
  },
  large: {
    width: 150,
    height: 150,
  },
})
