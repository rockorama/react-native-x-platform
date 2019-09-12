// @flow

import { useEffect } from 'react'
import { type NavigationScreenProps, withNavigation } from 'react-navigation'

type Props = NavigationScreenProps & {
  to: string,
}

const Navigate = (props: Props) => {
  useEffect(() => {
    props.navigation.navigate(props.to)
  })

  return null
}

export default withNavigation(Navigate)
