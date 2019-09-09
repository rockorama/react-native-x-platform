// @flow

import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import Routes from './navigation'
import Context, { type ScreenSize } from './context'

const Root = () => {
  const dimensions = Dimensions.get('window')
  const [screenSize, setScreenSize] = useState<ScreenSize>(dimensions)

  const defineDimensions = () => {
    const dimensions = Dimensions.get('window')
    setScreenSize(dimensions)
  }

  useEffect(() => {
    Dimensions.addEventListener('change', defineDimensions)
    return () => {
      Dimensions.removeEventListener('change', defineDimensions)
    }
  })

  return (
    <Context.Provider value={{ screenSize }}>
      <Routes />
    </Context.Provider>
  )
}

export default Root
