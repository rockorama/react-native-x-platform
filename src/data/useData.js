// @flow

import { useEffect, useState } from 'react'

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

const subscribeCollection = (
  path: string,
  setData: any => void,
  setLoading: any => void,
  options: Options,
) => {
  let listener = db.collection(path)

  if (options.where && options.where.length) {
    options.where.forEach(w => {
      listener = listener.where(w.field, w.operator, w.value)
    })
  }

  if (options.orderBy && options.orderBy.length) {
    options.orderBy.forEach(o => {
      listener = listener.orderBy(o.field, o.direction || 'asc')
    })
  }

  listener.onSnapshot(
    collection => {
      if (collection.size) {
        setData(
          collection.docs.map(item => ({
            id: item.id,
            ...item.data(),
          })),
        )
        setLoading(false)
      } else {
        setData([])
        setLoading(false)
      }
    },
    () => {
      // ignore errors for now
    },
  )

  return listener
}

const subscribeDoc = (
  path: string,
  setData: any => void,
  setLoading: any => void,
) => {
  return db.doc(path).onSnapshot(
    doc => {
      if (doc.exists) {
        setData({
          id: doc.id,
          ...doc.data(),
        })
        setLoading(false)
      } else {
        setData(null)
        setLoading(false)
      }
    },
    () => {
      // ignore errors for now
    },
  )
}

export const useCollection = (path: string, options: Options) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unsubscribe = subscribeCollection(path, setData, setLoading, options)
    return () => {
      try {
        unsubscribe && unsubscribe()
      } catch (err) {
        //on web the unsubscribe function is becoming undefined
      }
    }
  }, [path])

  return { loading, data }
}

export const useDoc = (path: string) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeDoc(path, setData, setLoading)
    return () => {
      try {
        unsubscribe && unsubscribe()
      } catch (err) {
        //on web the unsubscribe function is becoming undefined
      }
    }
  }, [path])

  return { loading, data }
}

export default (path: string, options?: Options) => {
  if (options && options.type === 'collection') {
    return useCollection(path, options)
  }
  return useDoc(path)
}

export const useFriends = (id: string) => {
  return useCollection(`friendship`, {
    where: [{ field: `${id}.id`, operator: '==', value: id }],
  })
}

export const useUser = (id: string) => {
  return useDoc(`users/${id}`)
}

export const getDoc = async (path: string) => {
  const doc = await db.doc(path).get()
  if (doc.exists) {
    return {
      id: doc.id,
      ...doc.data(),
    }
  }

  return null
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
