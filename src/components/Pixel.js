import React, { Component } from 'react';
import '../scss/components/Pixel.scss'


export default class Pixel extends Component {

  render() {
    const {status, color} = this.props

    // className
    let cname = 'Pixel'
    switch (status) {
      case 0: // off
      break
      case 1: // on
      cname += ' active'
      break
      case 2: // flicker
      cname += ' flicker'
      break
      default:
    }
    if (['blue', 'orange'].includes(color)) cname += ' color-' + color

    return (
      <div className={cname}></div>
    );
  }

}
