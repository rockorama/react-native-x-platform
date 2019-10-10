// @flow

import { db } from './firebase'

type WhereClause = {
  field: string,
  operator: string,
  value: any,
}

type OrderByClause = {
  field: string,
  direction?: 'asc' | 'desc',
}

type Options = {
  type?: 'collection' | 'doc',
  where?: Array<WhereClause>,
  orderBy?: Array<OrderByClause>,
}

export const getCollection = async (path: string, options: Options) => {
  let ref = db.collection(path)

  if (options.where && options.where.length) {
    options.where.forEach(w => {
      ref = ref.where(w.field, w.operator, w.value)
    })
  }

  if (options.orderBy && options.orderBy.length) {
    options.orderBy.forEach(o => {
      ref = ref.orderBy(o.field, o.direction || 'asc')
    })
  }
  const collection = await ref.get()

  if (collection.size) {
    return collection.docs.map(item => ({
      id: item.id,
      ...item.data(),
    }))
  } else {
    return []
  }
}

export const addFriend = async (user: Object, friend: Object) => {
  const friendship = {}

  friendship[user.id] = user
  friendship[friend.id] = friend
  friendship.accepted = false
  friendship.startedBy = user.id

  return db.collection('friendship').add(friendship)
}

export const acceptFriend = async (friendshipId: string) => {
  return db.doc(`friendship/${friendshipId}`).set(
    {
      accepted: true,
    },
    { merge: true },
  )
}

export const deleteFriend = async (friendshipId: string) => {
  return db.doc(`friendship/${friendshipId}`).delete()
}

export const newMessage = async (
  friendshipId: string,
  message: string,
  user: string,
) => {
  const obj = {
    from: user,
    message,
    dateTime: new Date(),
  }

  return db.collection(`friendship/${friendshipId}/messages`).add(obj)
}

export const updateUser = async (
  userId: string,
  newData: Object,
  friends: Array<Object>,
) => {
  const batch = db.batch()

  friends.forEach(chat => {
    const ref = db.collection(`friendship`).doc(chat.id)
    batch.set(ref, {
      ...chat,
      [userId]: newData,
    })
  })

  const userRef = db.collection('users').doc(userId)
  batch.set(userRef, newData)

  return batch.commit()
}
