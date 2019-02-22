import React, { Component } from 'react'
import '../scss/components/App.scss'
import BulletDisplay from './BulletDisplay.js';
import RocketDisplay from './RocketDisplay.js';

class App extends Component {
  constructor(props) {
    super(props)

    // initial state
    this.state = {
      bullets: {
        left: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        right: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      rockets: {
        left: [1, 0, 0, 0],
        right: [1, 0, 0, 0],
      }
    }

    // bind methods
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }
  render() {
    const {bullets, rockets} = this.state

    return (
      <div className="App" tabIndex="0" onKeyUp={this.handleKeyUp}>
        <div>
          <BulletDisplay pixels={bullets.left}/>
          <RocketDisplay pixels={rockets.left}/>
        </div>
        <div>
          <BulletDisplay pixels={bullets.right}/>
          <RocketDisplay pixels={rockets.right}/>
        </div>
      </div>
    );
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
}

export default App;
