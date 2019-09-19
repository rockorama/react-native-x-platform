// @flow

import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import Screen from '../components/Screen'
import Text from '../components/Text'
import Friends from '../components/Friends'
import { COLORS } from '../styles'
import Context from '../context/'
import { useUser, useFriends } from '../data/useData'
import Chat from './Chat'
import EmailNotVerified from './EmailNotVerified'

const Home = (props: NavigationScreenProps) => {
  const { user, screenSize } = useContext(Context)

  const id: string = user ? user.uid : '0'
  const userData: Object = useUser(id)
  const friends: Object = useFriends(id)

  const [openChat, setOpenChat] = useState()

  if (user && !user.emailVerified) {
    return <EmailNotVerified />
  }

  const loading: boolean = userData.loading || friends.loading
  const haveFriends: boolean = !loading && friends.data && !!friends.data.length

  const onSelect = (chatId: string) => {
    if (screenSize.width < 800) {
      setOpenChat()
      props.navigation.navigate(`/chat`, { id: chatId })
    } else {
      setOpenChat(chatId)
    }
  }

  const friendsArea = (
    <Screen
      full={haveFriends}
      headerProps={{
        title: loading ? 'Loading' : 'Friends',
        icon: 'Settings',
        onPressIcon: () => props.navigation.navigate('/settings'),
      }}
      buttonProps={{
        title: 'Add friend',
        onPress: () => props.navigation.navigate('/add-friend'),
      }}
      noLogo={haveFriends}
      noScroll>
      {!loading &&
        (!haveFriends ? (
          <Text style={styles.welcomeMessage} center color={COLORS.BLACK}>
            Welcome! Invite your friends to start chatting.
          </Text>
        ) : (
          <Friends
            selected={openChat}
            userId={id}
            friends={friends.data}
            onPressFriend={onSelect}
          />
        ))}
    </Screen>
  )
  if (screenSize.width < 800 || !haveFriends) {
    return friendsArea
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.friendsArea}>{friendsArea}</View>
        <View style={styles.chatArea}>
          {openChat ? (
            <Chat chatId={openChat} onPressBack={() => setOpenChat()} />
          ) : null}
        </View>
      </View>
    )
  }
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
  },
  friendsArea: {
    maxWidth: 400,
    flex: 1,
  },
  chatArea: {
    flex: 1,
  },
  welcomeMessage: {
    maxWidth: 300,
    alignSelf: 'center',
  },
})
