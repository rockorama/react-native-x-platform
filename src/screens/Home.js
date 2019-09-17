// @flow

import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import Screen from '../components/Screen'
import Text from '../components/Text'
import { COLORS } from '../styles'
import Context from '../context/'
import { useDoc, useCollection } from '../data/useData'
import EmailNotVerified from './EmailNotVerified'

const Home = (props: NavigationScreenProps) => {
  const { user } = useContext(Context)

  const id = user ? user.uid : 0
  const userData = useDoc(`users/${id}`)
  const friends = useCollection(`users/${id}/friends`, {})

  if (user && !user.emailVerified) {
    return <EmailNotVerified />
  }

  return (
    <Screen
      headerProps={{
        title:
          userData.loading || friends.loading ? 'Loading' : userData.data.name,
        icon: 'Settings',
        onPressIcon: () => props.navigation.navigate('/settings'),
      }}
      noLogo={!friends.loading && friends.data && !!friends.data.length}>
      <View style={styles.container}>
        <Text variant="TITLE" center color={COLORS.RED}></Text>
      </View>
    </Screen>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
