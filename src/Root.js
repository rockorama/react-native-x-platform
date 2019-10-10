// @flow

import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import Navigation from './navigation'
import loadFonts from './fonts'
import Context, { type ScreenSize } from './context'

const Root = () => {
  const [screenSize, setScreenSize] = useState<?ScreenSize>(null)
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

  if (!fontsLoaded || !screenSize) return null

  return (
    <Context.Provider value={{ screenSize }}>
      <Navigation />
    </Context.Provider>
  )
}

export default Root
