// @flow

import { createContext } from 'react'

export type ScreenSize = {
  width: number,
  height: number,
}

export type ContextType = {
  screenSize: ScreenSize,
  user?: ?Object,
  refreshUser: () => any,
}

const Context = createContext<ContextType>({
  screenSize: {
    width: 0,
    height: 0,
  },
  user: {},
  refreshUser: () => {},
})

export default Context
