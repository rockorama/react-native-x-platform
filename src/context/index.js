// @flow

import { createContext } from 'react'

export type ScreenSize = {
  width: number,
  height: number,
}

export type ContextType = {
  screenSize: ScreenSize,
}

const Context = createContext<ContextType>({
  screenSize: {
    width: 0,
    height: 0,
  },
})

export default Context
