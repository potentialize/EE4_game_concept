import React, { Component } from 'react'
import '../scss/components/App.scss'
import Header from './Header.js'
import Decoration from './Decoration.js'
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
        p1: [
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
        ],
        p2: [
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      lastKeyPresses: {
        p1: [-1, -1, -1, -1], // -1 => never pressed
        p2: [-1, -1, -1, -1], // -1 => never pressed
      },
      rockets: {
        p1: [0, 0, 0, 0],
        p2: [0, 0, 0, 0],
      },
      tickCount: 0,
      ticksPerEvent: 20, // NOTE: do not change during game play!
      interval: null, // reference to game loop setInterval
      fps: 60, // Hz // NOTE: do not change during game play!
      gameActive: false, // also prevents switching game mode
      currentGameMode: 'menu', // index of gameMode in gameModes array
      gameModeCycleOrder: ['menu', 'coop', 'pvp'],
      lastGameModeSwitch: 0,
      gameModes: {
        menu: {
          gameTick: menuGameTick,
        },
        coop: {
          gameTick: coopGameTick,
          misses: 0,
        },
        pvp: {
          gameTick: pvpGameTick,
        }
      },
    }

    // bind methods
    this.gameTick = this.gameTick.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.changeGameMode = this.changeGameMode.bind(this)
  }

  render() {
    const {bullets, rockets, tickCount, currentGameMode} = this.state

    // gamemode button
    const gameModeBtn = <button className="gameModeBtn" onClick={this.changeGameMode}>
      Change game mode
    </button>

    // render App
    return (
      <div className="App" tabIndex="0" onKeyUp={this.handleKeyUp}>
        <Header tickCount={tickCount} gameModeName={currentGameMode} gameModeBtn={gameModeBtn}/>
        <Decoration/>
        <div className="App-divider">
          <div>
            <BulletDisplay pixels={bullets.p1}/>
            <RocketDisplay pixels={rockets.p1}/>
          </div>
          <div>
            <BulletDisplay pixels={bullets.p2}/>
            <RocketDisplay pixels={rockets.p2}/>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    // init game ticks
    const interval = setInterval(this.gameTick, 1000/this.state.fps) // 1000ms/60 = 60Hz

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
    const {tickCount, gameModes, currentGameMode} = this.state

    // process game tick
    const newState = gameModes[currentGameMode].gameTick(this.state)

    // update tick counter
    newState.tickCount = tickCount + 1

    // update state
    this.setState(newState)
  }

  handleKeyUp(e) {
    const {tickCount, lastKeyPresses} = this.state
    let p1 = lastKeyPresses.p1
    let p2 = lastKeyPresses.p2

    switch (e.key) {
      // left player
      case 'a':
        p1[0] = tickCount
        break
      case 'z':
        p1[1] = tickCount
        break
      case 'e':
        p1[2] = tickCount
        break
      case 'r':
        p1[3] = tickCount
        break
      // right player
      case 'u':
        p2[0] = tickCount
        break
      case 'i':
        p2[1] = tickCount
        break
      case 'o':
        p2[2] = tickCount
        break
      case 'p':
        p2[3] = tickCount
        break
      // general
      default:
    }

    this.setState({
      lastKeyPresses: {
        p1,
        p2,
      }
    })

    // NOTE: old switch, change rocket display directly
    // let leftR = this.state.rockets.left
    // let rightR = this.state.rockets.right
    //
    // switch (e.key) {
    //   // left player
    //   case 'a':
    //     leftR = [1, 0, 0, 0]
    //     break
    //   case 'z':
    //     leftR = [0, 1, 0, 0]
    //     break
    //   case 'e':
    //     leftR = [0, 0, 1, 0]
    //     break
    //   case 'r':
    //     leftR = [0, 0, 0, 1]
    //     break
    //   // right player
    //   case 'u':
    //     rightR = [1, 0, 0, 0]
    //     break
    //   case 'i':
    //     rightR = [0, 1, 0, 0]
    //     break
    //   case 'o':
    //     rightR = [0, 0, 1, 0]
    //     break
    //   case 'p':
    //     rightR = [0, 0, 0, 1]
    //     break
    //   // general
    //   default:
    // }
    //
    // this.setState({
    //   rockets: {
    //     left: leftR,
    //     right: rightR,
    //   }
    // })
  }

  changeGameMode() {
    const {tickCount, currentGameMode, gameModeCycleOrder, gameActive} = this.state

    if (!gameActive) {
      // change game mode
      const currentGameModeIndex = gameModeCycleOrder.indexOf(currentGameMode)
      const nextGameModeIndex = currentGameModeIndex + 1 < gameModeCycleOrder.length ? currentGameModeIndex + 1 : 0

      // update state
      this.setState({
        currentGameMode: gameModeCycleOrder[nextGameModeIndex],
        lastGameModeSwitch: tickCount,
      })
    } else {
      // let user know that game mode can't be switched right now
      console.log('cant switch game modes right now!')
    }
  }
}

export default App;
