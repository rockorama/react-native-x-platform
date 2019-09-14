// @flow

import React, { Component } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import {
  turnIntoField,
  removeFieldProps,
  type FieldProps,
  type FieldValidateFunctionParams,
} from '@morpheus-ui/forms'

import { COLORS, SPACING, TEXT_STYLES } from '../styles'

import Text from './Text'

export type TextFieldProps = FieldProps & {
  label: string,
  placeholder?: string,
  value?: ?string,
  defaultValue?: string,
  multiline: boolean,
  disabled: boolean,
  returnKeyType?: string,
  keyboardType?: string,
  fieldStyle?: Object | Array<Object>,
  containerStyle?: Object | Array<Object>,
  noBorder?: boolean,
  submitButtonLabel?: string,
  submitButtonI18nKey?: string,
  loading?: boolean,
  submitMaxLength?: boolean,
  error?: ?string,
  maxLength?: number,
  onFocus?: (name?: string) => any,
  onBlur?: (name?: string) => any,
  onSubmitEditing?: (name?: string) => any,
}

type State = {
  focus: boolean,
  innerValue: any,
}

export const NumberValidation = (payload: FieldValidateFunctionParams) => {
  if (isNaN(payload.value)) {
    return `${payload.name ? payload.name : ''} amount must be a valid number`
  }
}

export const ConfirmPasswordValidation = (
  payload: FieldValidateFunctionParams,
) => {
  if (payload.values && payload.value !== payload.values.password) {
    return `Passwords must match`
  }
}

export class MyTextField extends Component<TextFieldProps, State> {
  constructor(props: TextFieldProps) {
    super(props)
    const innerValue = this.getValue(props)
    this.state = {
      focus: false,
      innerValue,
    }
  }

  getValue = (props: TextFieldProps = this.props) => {
    const { inForm, defaultValue, value, fieldValue } = props

    if (inForm) {
      return value || fieldValue != null ? fieldValue : defaultValue || ''
    }

    if (value != null) {
      return value || defaultValue || ''
    }

    return this.state ? this.state.innerValue : ''
  }

  getType() {
    const { type } = this.props
    if (type === 'text') return null

    if (type === 'email') return 'emailAddress'

    return type
  }

  onChange = (text: string) => {
    this.setState(
      {
        innerValue: text,
      },
      () => {
        if (
          this.props.submitMaxLength &&
          text.length === this.props.maxLength
        ) {
          this.onSubmit()
        }
      },
    )
    this.props.onChange && this.props.onChange(text)
  }

  onFocus = () => {
    if (!this.props.disabled) {
      this.setState({ focus: true })
      this.props.onFocus && this.props.onFocus(this.props.name)
    }
  }

  onBlur = () => {
    this.props.setDirty()
    this.setState({ focus: false })
    this.props.onBlur && this.props.onBlur(this.props.name)
  }

  onSubmit = () => {
    this.props.inForm && this.props.submitForm()
    this.props.onSubmitEditing && this.props.onSubmitEditing(this.props.name)
  }

  render() {
    const { label, errorMessage, isSubmitted, dirty } = this.props
    const { disabled, inForm, error, ...other } = removeFieldProps(this.props)

    const showError = (isSubmitted() || dirty) && (!!errorMessage || !!error)
    const value = this.getValue()
    const type = this.getType()

    const fieldStyles = [styles.field]

    const containerStyles = [styles.container]

    return (
      <View style={containerStyles}>
        <Text
          variant={showError ? 'MICRO_BOLD' : 'MICRO_REGULAR'}
          style={[
            styles.label,
            disabled ? styles.disabled : null,
            showError ? styles.error : null,
          ]}>
          {label}
          {showError ? (
            <Text variant="MICRO_REGULAR" style={styles.error}>
              {' ・ '}
              {errorMessage} {error}
            </Text>
          ) : null}
        </Text>
        <View
          style={[
            styles.leftBorder,
            {
              backgroundColor: showError
                ? COLORS.RED
                : this.state.focus
                ? COLORS.GREEN
                : COLORS.TRANSPARENT,
            },
          ]}
        />
        <View style={styles.fieldContent}>
          <TextInput
            editable={!disabled}
            style={fieldStyles}
            textContentType={type}
            secureTextEntry={type === 'password'}
            autoCapitalize={
              type === 'emailAddress' || type === 'password' ? 'none' : null
            }
            {...other}
            onSubmitEditing={this.onSubmit}
            value={value}
            onChangeText={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </View>
      </View>
    )
  }
}

export default turnIntoField(MyTextField)

const LABEL_UP = SPACING * 4

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.GREY7,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.WHITE,
    height: SPACING * 16,
  },
  label: {
    color: COLORS.GREY3,
    position: 'absolute',
    paddingLeft: SPACING * 10,
    paddingTop: LABEL_UP,
  },
  leftBorder: {
    position: 'absolute',
    width: SPACING * 2,
    height: SPACING * 16,
  },
  fieldContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  field: {
    ...TEXT_STYLES.TEXTFIELD,
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT,
    height: SPACING * 16 - 1,
    paddingLeft: SPACING * 10,
    paddingTop: LABEL_UP,
  },
  error: {
    color: COLORS.RED,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.3,
  },
})
