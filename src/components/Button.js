// @flow

import React from 'react'
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { turnIntoField } from '@morpheus-ui/forms'
import { COLORS, SPACING } from '../styles'

import Text from './Text'

export type ButtonProps = {
  title: string,
  disabled?: boolean,
  submit?: boolean,
  invalidFormDisabled?: boolean,
  formValid?: boolean,
  inForm?: boolean,
  loading?: boolean,
  secondary?: boolean,
  onPress?: () => any,
  submitForm?: () => void,
}

const Button = (props: ButtonProps) => {
  const {
    submit,
    onPress,
    disabled,
    invalidFormDisabled,
    formValid,
    submitForm,
    inForm,
    loading,
    title,
    secondary,
  } = props

  const isDisabled = disabled || (invalidFormDisabled && !formValid) || loading
  const onSubmit = () => {
    if (!isDisabled) {
      if (inForm && submit) {
        submitForm && submitForm()
      }
      onPress && onPress()
    }
  }

  const btnStyles = [styles.container]
  secondary && btnStyles.push(styles.secondary)
  isDisabled && !secondary && btnStyles.push(styles.disabled)
  isDisabled && secondary && btnStyles.push(styles.disabledSecondary)

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onSubmit}
      style={btnStyles}>
      {loading ? (
        <ActivityIndicator color={COLORS.WHITE} />
      ) : (
        <Text variant="BUTTON" color={COLORS.WHITE}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default turnIntoField(Button)

const styles = StyleSheet.create({
  container: {
    minWidth: SPACING * 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PURPLE,
    borderRadius: 3,
    padding: SPACING * 2,
    height: SPACING * 10,
  },
  secondary: {
    backgroundColor: COLORS.GREEN,
  },
  disabled: {
    backgroundColor: COLORS.PURPLE_LIGHT,
  },
  disabledSecondary: {
    backgroundColor: COLORS.GREEN_LIGHT,
  },
})
