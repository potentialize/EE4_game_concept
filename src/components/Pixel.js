import React, { Component } from 'react';
import '../scss/components/Pixel.scss'


export default class Pixel extends Component {

  render() {
    const {active, color} = this.props

    // className
    let cname = 'Pixel'
    if (active) cname += ' active'
    if (['blue', 'orange'].includes(color)) cname += ' color-' + color

    return (
      <div className={cname}></div>
    );
  }

}
