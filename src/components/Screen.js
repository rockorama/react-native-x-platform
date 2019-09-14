// @flow

import React, { Fragment } from 'react'

import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'

import { Form, type FormSubmitPayload } from '@morpheus-ui/forms'

import { COLORS, SPACING } from '../styles/'
import Header, { type HeaderProps } from './Header'
import Icon from './Icon'
import Button, { type ButtonProps } from './Button'

type Props = {
  formProps?: {
    onSubmit: (payload: FormSubmitPayload) => any,
  },
  headerProps?: HeaderProps,
  buttonProps?: ButtonProps,
  secondaryButtonProps?: ButtonProps,
  noLogo?: boolean,
  noScroll?: boolean,
  children: any,
}

const Screen = (props: Props) => {
  const contentContainerStyle = [styles.contentContainer]

  if (Platform.OS === 'web') {
    contentContainerStyle.push(styles.shadowContainer)
  }

  const FormWrapper = props.formProps ? Form : Fragment
  const Scroll = props.noScroll ? View : ScrollView

  return (
    <FormWrapper {...(props.formProps || {})}>
      <KeyboardAvoidingView behavior="padding" style={styles.outerContainer}>
        <SafeAreaView style={contentContainerStyle}>
          {props.headerProps ? <Header {...props.headerProps} /> : null}
          <Scroll style={styles.flex1}>
            {!props.noLogo ? (
              <View style={styles.logo}>
                <Icon name="Logo" />
              </View>
            ) : null}
            {props.children}
          </Scroll>
          {props.buttonProps ? (
            <View style={styles.buttonContainer}>
              <Button {...props.buttonProps} />
            </View>
          ) : null}
          {props.secondaryButtonProps ? (
            <View style={styles.buttonContainer}>
              <Button {...props.secondaryButtonProps} />
            </View>
          ) : null}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </FormWrapper>
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
    backgroundColor: COLORS.WHITE,
    width: '100%',
    maxWidth: SPACING * 200,
    maxHeight: Platform.OS === 'web' ? SPACING * 200 : null,
    flex: 1,
    alignSelf: 'center',
    paddingBottom: SPACING * 10,
  },
  shadowContainer: {
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  logo: {
    paddingVertical: SPACING * 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: SPACING * 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
