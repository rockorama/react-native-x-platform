// @flow

import { useEffect, useState } from 'react'

import { db } from './firebase'

type WhereClause = {
  field: string,
  operator: string,
  value: string,
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

const getCollection = (
  path: string,
  setData: any => void,
  setLoading: any => void,
  options: Options,
) => {
  const listener = db.collection(path)

  if (options.where && options.where.length) {
    options.where.forEach(w => {
      listener.where(w.field, w.operator, w.value)
    })
  }

  if (options.orderBy && options.orderBy.length) {
    options.orderBy.forEach(o => {
      listener.orderBy(o.field, o.direction || 'asc')
    })
  }

  listener.onSnapshot(
    collection => {
      if (collection.size) {
        setData(
          collection.docs.map(item => ({
            id: item.id,
            ...item,
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

const getDoc = (
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
    const unsubscribe = getCollection(path, setData, setLoading, options)
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
    const unsubscribe = getDoc(path, setData, setLoading)
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
