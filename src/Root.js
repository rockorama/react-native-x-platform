// @flow

import React, { useState, useEffect } from 'react'
import { Dimensions, StatusBar } from 'react-native'
import Navigation from './navigation'
import loadFonts from './fonts'
import Context, { type ScreenSize } from './context'
import { auth } from './data/firebase'

const Root = () => {
  let userSubscription: () => any

  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: 0,
    height: 0,
  })

  const [ready, setReady] = useState<boolean>(false)
  const [user, setUser] = useState<Object>(null)
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false)

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

  useEffect(() => {
    const loadingFonts = async () => {
      await loadFonts()
      setFontsLoaded(true)
    }

    loadingFonts()
  })

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

  if (!ready || !fontsLoaded || !screenSize.width) return null

  const contextValue = { screenSize, user, refreshUser }

  return (
    <Context.Provider value={contextValue}>
      <StatusBar mode="light" />
      <Navigation />
    </Context.Provider>
  )
}

export default Root
