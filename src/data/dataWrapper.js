// @flow

import React, { createContext, useContext, useState, useEffect } from 'react'

import db from './firebase'

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
  options: Options,
  setData: any => void,
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

  listener.onSnapshot(collection => {
    if (collection.size) {
      setData(
        collection.docs.map(item => ({
          id: item.id,
          ...item,
        })),
      )
    } else {
      setData([])
    }
  })

  return listener
}

const getDoc = (path: string, setData: any => void) => {
  return db.doc(path).onSnapshot(doc => {
    if (doc.exists) {
      setData({
        id: doc.id,
        ...doc.data(),
      })
    } else {
      setData(null)
    }
  })
}

export default (Compoenent: any, path: string, options?: Options) => {
  const Context = createContext<Object>(null)

  const NewComponent = (props: Object) => {
    const data = useContext(Context)
    return <Compoenent {...props} data={data} />
  }

  const WrappedComponent = (props: Object) => {
    const [data, setData] = useState(null)

    useEffect(() => {
      const listener =
        options && options.type === 'collection'
          ? getCollection(path, options, setData)
          : getDoc(path, setData)
      return listener
    })

    return (
      <Context.Provider value={data}>
        <NewComponent {...props} />
      </Context.Provider>
    )
  }

  return WrappedComponent
}
