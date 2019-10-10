// @flow

import React from 'react'
import { Text } from 'react-native'
import memoize from 'memoize-one'

import { TEXT_STYLES, type TextVariant } from '../styles'

type StyleProps = {
  bold?: boolean,
  italic?: boolean,
  size?: number,
  color?: string,
  animated?: boolean,
  center?: boolean,
  left?: boolean,
  right?: boolean,
  uppercase?: boolean,
  capitalize?: boolean,
  variant?: TextVariant,
  style?: Object | Array<Object>,
}

type Props = StyleProps & {
  variant?: TextVariant,
}

const getTextStyles = memoize(
  ({ size, uppercase, color, center, left, right, capitalize }: StyleProps) => {
    let propsStyles = {}

    if (color) {
      propsStyles = { ...propsStyles, color }
    }

    if (size) {
      propsStyles = { ...propsStyles, fontSize: size }
    }

    if (uppercase) {
      propsStyles = { ...propsStyles, textTransform: 'uppercase' }
    }

    if (center) {
      propsStyles = { ...propsStyles, textAlign: 'center' }
    }

    if (left) {
      propsStyles = { ...propsStyles, textAlign: 'left' }
    }

    if (right) {
      propsStyles = { ...propsStyles, textAlign: 'right' }
    }

    if (capitalize) {
      propsStyles = { ...propsStyles, textTransform: 'capitalize' }
    }

    return propsStyles
  },
)

const CustomText = (props: Props) => {
  const {
    uppercase,
    size,
    color,
    center,
    left,
    right,
    variant,
    capitalize,
    style,
    ...other
  } = props

  const textStyles = getTextStyles({
    size,
    uppercase,
    color,
    center,
    left,
    right,
    capitalize,
  })

  return (
    <Text
      style={[TEXT_STYLES[variant || 'BODY'], textStyles, style]}
      {...other}
    />
  )
}

export default CustomText
