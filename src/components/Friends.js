// @flow

import React from 'react'
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native'

import Avatar from '../components/Avatar'
import Text from '../components/Text'
import Icon from '../components/Icon'

import { COLORS, SPACING } from '../styles'

type Props = {
  selected?: string,
  userId: string,
  friends: Array<Object>,
  onPressFriend: (id: string) => any,
}

const Friends = (props: Props) => {
  const keyExtractor = (item: Object) => item.id

  const renderItem = ({ item }: { item: Object }) => {
    const onPress = () => props.onPressFriend(item.id)
    const {
      id: friendshipId,
      accepted,
      [props.userId]: me,
      startedBy,
      ...friendId
    } = item
    let friend = {}

    Object.keys(friendId).forEach(fid => {
      friend = friendId[fid]
    })

    const style = [styles.friendRow]

    if (friendshipId === props.selected) {
      style.push(styles.selected)
    }

    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <Avatar url={friend.avatar} size="small" />
        <Text style={styles.name} size={22}>
          {friend.name}
        </Text>
        {!accepted ? <Icon name="Bell" /> : null}
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      key={`friends-${props.friends.length}`}
      keyboardShouldPersistTaps="handled"
      keyExtractor={keyExtractor}
      data={props.friends}
      renderItem={renderItem}
      initialNumToRender={30}
      onScrollToIndexFailed={() => {}}
      getItemLayout={(data, index) => ({
        length: SPACING * 12,
        offset: SPACING * 12 * index,
        index,
      })}
    />
  )
}

export default Friends

const styles = StyleSheet.create({
  friendRow: {
    height: SPACING * 15,
    backgroundColor: COLORS.GREY7,
    paddingHorizontal: SPACING * 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.WHITE,
  },
  selected: {
    backgroundColor: COLORS.GREY6,
  },
  name: {
    flex: 1,
    paddingHorizontal: SPACING * 4,
  },
})
