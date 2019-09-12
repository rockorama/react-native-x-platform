// @flow

import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import Navigation from './navigation'
import loadFonts from './fonts'
import Context, { type ScreenSize } from './context'
import { auth } from './data/firebase'

const Root = () => {
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

  useEffect(() => {
    return auth.onAuthStateChanged(u => {
      setUser(u)
      if (!ready) {
        setReady(true)
      }
    })
  })

  if (!ready || !fontsLoaded || !screenSize.width) return null

  return (
    <Context.Provider value={{ screenSize, user }}>
      <Navigation />
    </Context.Provider>
  )
}

export default Root
