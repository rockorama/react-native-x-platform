// @flow

import { StyleSheet, PixelRatio } from 'react-native'
export { default as COLORS } from './colors'
export { default as STATUS_BAR_HEIGHT } from './constants'

export type TextVariant =
  | 'BODY'
  | 'TITLE'
  | 'HEADER'
  | 'BUTTON'
  | 'SMALL'
  | 'MICRO_REGULAR'
  | 'MICRO_BOLD'
  | 'TEXTFIELD'

export const RATIO = PixelRatio.getFontScale()

export const SPACING = 4

export const TEXT_STYLES = StyleSheet.create({
  BODY: {
    fontFamily: 'Roboto-Regular',
    fontSize: 22 / RATIO,
  },
  TITLE: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22 / RATIO,
    marginBottom: SPACING * 2,
  },
  HEADER: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18 / RATIO,
    textTransform: 'uppercase',
  },
  BUTTON: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18 / RATIO,
  },
  SMALL: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14 / RATIO,
  },
  MICRO_REGULAR: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10 / RATIO,
  },
  MICRO_BOLD: {
    fontFamily: 'Roboto-Bold',
    fontSize: 10 / RATIO,
  },
  TEXTFIELD: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14 / RATIO,
  },
})
