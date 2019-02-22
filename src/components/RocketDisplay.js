import React, { Component } from 'react';
import '../scss/components/Displays.scss';
import Pixel from './Pixel.js';


export default class RocketDisplay extends Component {

  render() {
    const {pixels} = this.props

    return (
      <div className="RocketDisplay">
        {pixels.map((status, i) => <Pixel key={i} active={status} color="orange"/>)}
      </div>
    );
  }

}
