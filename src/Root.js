// @flow

import React, { useState, useEffect } from 'react'
import { Dimensions, StatusBar } from 'react-native'
import Navigation from './navigation'
import loadFonts from './fonts'
import Context, { type ScreenSize } from './context'
import { auth, db } from './data/firebase'

const Root = () => {
  let userSubscription: () => any

  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: 0,
    height: 0,
  })
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false)

  const [user, setUser] = useState<Object>(null)
  const [userData, setUserData] = useState<Object>(null)
  const [friends, setFriends] = useState<Object>(null)

  const [ready, setReady] = useState<boolean>(false)

  //Check screenSizes
  useEffect(() => {
    const defineDimensions = () => {
      const dimensions = Dimensions.get('window')
      setScreenSize(dimensions)
    }

    Dimensions.addEventListener('change', defineDimensions)
    defineDimensions()
    return () => {
      Dimensions.removeEventListener('change', defineDimensions)
    }
  })

  //load fonts
  useEffect(() => {
    const loadingFonts = async () => {
      await loadFonts()
      setFontsLoaded(true)
    }

    loadingFonts()
  })

  // Check if the user is logger In and listen for auth state changing
  const refreshUser = () => {
    userSubscription = auth.onAuthStateChanged(u => {
      if (!u) {
        unsubscribe()
      }
      setUser(u)

      if (!ready) {
        setReady(true)
      }
    })
  }

  const unsubscribe = () => userSubscription && userSubscription()

  useEffect(() => {
    refreshUser()
    return unsubscribe
  })

  // If the user's email is not verified, we will keep checking every second for the verification
  useEffect(() => {
    const checkVerification = () => {
      setTimeout(async () => {
        await user.reload()
        if (user.emailVerified) {
          setUser({ ...user, emailVerified: true })
        } else {
          checkVerification()
        }
      }, 1000)
    }

    if (user && !user.emailVerified) {
      checkVerification()
    }
  })

  // get the user personal data
  useEffect(() => {
    if (user) {
      return db.doc(`users/${user.uid}`).onSnapshot(doc => {
        if (doc.exists) {
          setUserData({
            id: doc.id,
            ...doc.data(),
          })
        } else {
          setUserData(null)
        }
      })
    } else {
      setUserData(null)
    }
  }, [user])

  // get the user chat/friends list
  useEffect(() => {
    if (user) {
      return db
        .collection(`friendship`)
        .where(`${user.uid}.id`, '==', user.uid)
        .onSnapshot(collection => {
          if (collection.size) {
            setFriends(
              collection.docs.map(item => ({
                id: item.id,
                ...item.data(),
              })),
            )
          } else {
            setFriends([])
          }
        })
    } else {
      setFriends(null)
    }
  }, [user])

  if (
    !ready ||
    !fontsLoaded ||
    !screenSize.width ||
    (user && !userData) ||
    (user && !friends)
  )
    return null

  const contextValue = { screenSize, user, refreshUser, userData, friends }

  return (
    <Context.Provider value={contextValue}>
      <StatusBar mode="light" />
      <Navigation />
    </Context.Provider>
  )
}

export default Root
