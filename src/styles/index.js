// @flow

import { StyleSheet, PixelRatio } from 'react-native'
export { default as COLORS } from './colors'

export type TextVariant = 'BODY' | 'TITLE' | 'HEADER'

export const RATIO = PixelRatio.getFontScale()

export const SPACING = 4

export const TEXT_STYLES = StyleSheet.create({
  BODY: {
    fontFamily: 'Roboto-Regular',
    fontSize: 22 * RATIO,
  },
  TITLE: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22 * RATIO,
    marginBottom: SPACING * 2,
  },
  HEADER: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18 * RATIO,
    textTransform: 'uppercase',
  },
})
