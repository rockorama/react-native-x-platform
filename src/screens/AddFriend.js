// @flow

import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { type NavigationScreenProps } from 'react-navigation'

import Screen from '../components/Screen'
import Text from '../components/Text'
import TextField from '../components/TextField'
import Avatar from '../components/Avatar'

import { COLORS, SPACING } from '../styles'
import Context from '../context/'
import { getDoc, getCollection, useFriends, addFriend } from '../data/useData'

const AddFriend = (props: NavigationScreenProps) => {
  const { user } = useContext(Context)
  const id = user ? user.uid : '0'

  const friends: Object = useFriends(id)

  const [friend, setFriend] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const headerProps = {
    title: 'Add Friend',
    onPressIcon: () => props.navigation.navigate('/'),
  }

  if (friend) {
    const isFriend =
      friends &&
      !friends.loading &&
      !!friends.data.filter(f => f[friend.id]).length

    const isMe = friend.id === id

    const cannotAdd = isMe || isFriend

    const onAdd = async () => {
      try {
        setLoading(true)
        const me = await getDoc(`users/${id}`)
        await addFriend(me, friend)
        props.navigation.navigate('/')
      } catch (err) {
        setLoading(false)
        setError(err.message)
      }
    }

    return (
      <Screen
        headerProps={headerProps}
        buttonProps={{
          title: 'Add',
          disabled: cannotAdd,
          loading,
          onPress: onAdd,
        }}
        secondaryButtonProps={{
          title: 'Cancel',
          secondary: true,
          onPress: () => {
            setFriend()
            setLoading(false)
            setError()
          },
        }}
        noLogo
        noScroll>
        <View style={styles.container}>
          <View style={styles.avatarArea}>
            <Avatar url={friend.avatar} size="large" />
          </View>
          <Text center>{friend.name}</Text>
        </View>
        <Text center variant="SMALL" color={COLORS.RED}>
          {isFriend
            ? 'You are already friends'
            : isMe
            ? 'You cannot add yourself as a friend'
            : null}
          {error}
        </Text>
      </Screen>
    )
  }

  const onSubmit = async payload => {
    if (payload.valid && user) {
      setLoading(true)
      setError(null)

      try {
        const collection = await getCollection('users', {
          where: [
            {
              field: 'email',
              operator: '==',
              value: payload.fields.email,
            },
          ],
        })

        if (collection.length) {
          setFriend(collection[0])
        } else {
          setError('Friend not found')
        }
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(err.message)
      }
    }
  }

  return (
    <Screen
      headerProps={headerProps}
      buttonProps={{
        title: 'Search',
        submit: true,
        loading,
      }}
      noLogo
      noScroll
      formProps={{
        onSubmit,
      }}>
      <View style={styles.container}>
        <TextField
          autoFocus
          required
          name="email"
          type="email"
          label="Friend's Email"
        />
      </View>
      <Text center variant="SMALL" color={COLORS.RED}>
        {error}
      </Text>
    </Screen>
  )
}

export default AddFriend

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
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
