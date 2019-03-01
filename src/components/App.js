import React, { Component } from 'react'
import '../scss/components/App.scss'
import Header from './Header.js'
import BulletDisplay from './BulletDisplay.js'
import RocketDisplay from './RocketDisplay.js'
// import displayShift from '../util/displayShift.js'

import menuGameTick from '../gameModes/menu.js'
import coopGameTick from '../gameModes/coop.js'
import pvpGameTick from '../gameModes/pvp.js'

class App extends Component {
  constructor(props) {
    super(props)

    // initial state
    this.state = {
      bullets: { // more lines => more LEDs
        left: [
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
        ],
        right: [
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      rockets: {
        left: [2, 0, 0, 0],
        right: [0, 0, 0, 0],
      },
      tickCount: 0,
      interval: null,
      currentGameModeIndex: 0, // index of gameMode in gameModes array
      canSwitchGameMode: true,
      gameModes: [
        {
          name: 'menu',
          gameTick: menuGameTick,
        },
        {
          name: 'coop',
          gameTick: coopGameTick,
        },
        {
          name: 'pvp',
          gameTick: pvpGameTick,
        },
      ],
    }

    // bind methods
    this.gameTick = this.gameTick.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.changeGameMode = this.changeGameMode.bind(this)
  }

  render() {
    const {bullets, rockets, tickCount, gameModes, currentGameModeIndex} = this.state
    const gameMode = gameModes[currentGameModeIndex]

    // gamemode button
    const gameModeBtn = <button className="gameModeBtn" onClick={this.changeGameMode}>
      Change game mode
    </button>

    return (
      <div className="App" tabIndex="0" onKeyUp={this.handleKeyUp}>
        <Header tickCount={tickCount} gameMode={gameMode} gameModeBtn={gameModeBtn}/>
        <div className="App-divider">
          <div>
            <BulletDisplay pixels={bullets.left}/>
            <RocketDisplay pixels={rockets.left}/>
          </div>
          <div>
            <BulletDisplay pixels={bullets.right}/>
            <RocketDisplay pixels={rockets.right}/>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    // init game ticks
    const interval = setInterval(this.gameTick, 1000/60) // 1000ms/60 = 60Hz

    // retain interval ref for cleanup in componentWillUnmount
    this.setState({
      interval,
    })
  }

  componentWillUnmount() {
    // stop interval (prevent memory leaks)
    clearInterval(this.state.interval)
  }

  gameTick() {
    // shortcuts
    const {tickCount, gameModes, currentGameModeIndex} = this.state

    // process game tick
    const newState = gameModes[currentGameModeIndex].gameTick(this.state)

    // update tick counter
    newState.tickCount = tickCount + 1

    // update state
    this.setState(newState)
  }

  handleKeyUp(e) {
    let leftR = this.state.rockets.left
    let rightR = this.state.rockets.right

    switch (e.key) {
      // left player
      case 'a':
        leftR = [1, 0, 0, 0]
        break
      case 'z':
        leftR = [0, 1, 0, 0]
        break
      case 'e':
        leftR = [0, 0, 1, 0]
        break
      case 'r':
        leftR = [0, 0, 0, 1]
        break
      // right player
      case 'u':
        rightR = [1, 0, 0, 0]
        break
      case 'i':
        rightR = [0, 1, 0, 0]
        break
      case 'o':
        rightR = [0, 0, 1, 0]
        break
      case 'p':
        rightR = [0, 0, 0, 1]
        break
      // general
      default:
    }

    this.setState({
      rockets: {
        left: leftR,
        right: rightR,
      }
    })
  }

  changeGameMode() {
    const {gameModes, currentGameModeIndex, canSwitchGameMode} = this.state

    if (canSwitchGameMode) {
      // change game mode
      const i = currentGameModeIndex + 1 < gameModes.length ? currentGameModeIndex + 1 : 0

      // update state
      this.setState({
        currentGameModeIndex: i,
      })
    } else {
      // let user know that game mode can't be switched right now
      console.log('cant switch game modes right now!')
    }
  }
}

export default App;
