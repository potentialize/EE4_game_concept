import React, { Component } from 'react';
import '../scss/components/Displays.scss';
import Pixel from './Pixel.js';


export default class BulletDisplay extends Component {

  render() {
    const {pixels} = this.props

    return (
      <div className="BulletDisplay">
        {pixels.map((status, i) => <Pixel key={i} status={status}/>)}
      </div>
    );
  }

}
