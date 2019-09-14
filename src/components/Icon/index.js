// @flow
import React, { Component } from 'react'
import SvgUri from 'react-native-svg-uri'

import ICONS from './paths'

type Props = {
  name: string,
  color?: string,
  width?: string | number,
  height?: string | number,
}

export default class Icon extends Component<Props> {
  render() {
    return (
      <SvgUri
        width={this.props.width}
        height={this.props.height}
        fill={this.props.color}
        fillAll
        source={ICONS[this.props.name]}
      />
    )
  }
}
