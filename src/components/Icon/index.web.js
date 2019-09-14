// @flow
import React, { Component } from 'react'

import ICONS from './paths'

type Props = {
  name: string,
  width?: number,
  height?: number,
}

export default class Icon extends Component<Props> {
  render() {
    return (
      <img
        alt={this.props.name}
        width={this.props.width}
        height={this.props.height}
        src={ICONS[this.props.name]}
      />
    )
  }
}
