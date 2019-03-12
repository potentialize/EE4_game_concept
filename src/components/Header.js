import React, { Component } from 'react'
import '../scss/components/Header.scss'


export default class Header extends Component {

  render() {
    return (
      <div className="Header">
        <div className="Header-title">The Big Invasion v 0.0.1</div>
        {/* <div className="Header-tick-count"> ticks: {this.props.tickCount}</div> */}
        &nbsp;
        <div className="Header-game-mode">{this.props.gameModeBtn} ({this.props.gameModeName})</div>
      </div>
    )
  }

}
