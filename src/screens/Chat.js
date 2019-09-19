// @flow

import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import Screen from '../components/Screen'
import Text from '../components/Text'
import Avatar from '../components/Avatar'
import ChatView from '../components/ChatView'

import { COLORS, SPACING } from '../styles'
import Context from '../context/'
import { useDoc, acceptFriend, deleteFriend } from '../data/useData'

type Props = NavigationScreenProps & {
  onPressBack?: () => any,
  chatId?: string,
}

const Chat = (props: Props) => {
  const chatId = props.chatId || props.navigation.state.params.id
  const { user } = useContext(Context)
  const id = user ? user.uid : '0'
  const chat: Object = useDoc(`friendship/${chatId}`)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  let friend

  if (chat && chat.data) {
    const {
      id: friendshipId,
      accepted,
      [id]: me,
      startedBy,
      ...friendId
    } = chat.data
    friend = {}

    Object.keys(friendId).forEach(fid => {
      friend = friendId[fid]
    })

    if (friend) {
      const headerProps = {
        title: friend.name,
        onPressIcon: props.onPressBack
          ? props.onPressBack
          : () => props.navigation.navigate('/'),
        showAvatar: true,
        avatar: friend.avatar,
      }

      if (!accepted) {
        const onAccept = async () => {
          try {
            setLoading(true)
            await acceptFriend(chatId)
            setLoading(false)
          } catch (err) {
            setLoading(false)
            setError(err.message)
          }
        }

        const onDelete = async () => {
          try {
            await deleteFriend(chatId)
            props.onPressBack
              ? props.onPressBack()
              : props.navigation.navigate('/')
          } catch (err) {
            setLoading(false)
            setError(err.message)
          }
        }

        const buttons =
          startedBy === id
            ? {}
            : {
                buttonProps: {
                  title: 'Accept',
                  loading,
                  onPress: onAccept,
                },
                secondaryButtonProps: {
                  title: 'Delete',
                  secondary: true,
                  loading,
                  onPress: onDelete,
                },
              }

        return (
          <Screen full headerProps={headerProps} noLogo noScroll {...buttons}>
            <View style={styles.container}>
              <View style={styles.avatarArea}>
                <Avatar url={friend.avatar} size="large" />
              </View>
              <Text center>
                {startedBy === id ? (
                  <>
                    <Text center>
                      Your request is still pending.{'\n'}
                      Wait for your friend's confirmation to start chatting.
                    </Text>
                  </>
                ) : (
                  <Text center>
                    This person is trying to add you as a friend.
                  </Text>
                )}
                <Text center color={COLORS.RED}>
                  {error}
                </Text>
              </Text>
            </View>
          </Screen>
        )
      }

      return (
        <Screen full headerProps={headerProps} noLogo noScroll>
          <ChatView chatId={chatId} />
        </Screen>
      )
    }
  }

  return (
    <Screen
      full
      headerProps={{
        title: 'Loading',
        onPressIcon: props.onPressBack
          ? props.onPressBack
          : () => props.navigation.navigate('/'),
      }}
      noLogo
      noScroll
    />
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarArea: {
    marginTop: SPACING * 10,
    marginBottom: SPACING * 4,
  },
})
