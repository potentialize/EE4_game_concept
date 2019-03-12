import createScrollingText from '../util/createScrollingText.js'
import startGame from '../util/startGame.js'

const scrollPvpText = createScrollingText('  pvp  ')

// DO NOT MUTATE STATE!!!
export default (state) => {
  // true when game mode has recently changed, ie. first tick that this game mode gains control
  // const firstTick = state.lastGameModeSwitch === state.tickCount

  // display game mode name and handle keypress on start
  if (!state.gameActive) return startGame(state, scrollPvpText)

  return {
    bullets: {
      ...state.bullets,
      // p1: scrollPvpText(firstTick), // reset on first tick
      // p2: scrollPvpText(firstTick), // reset on first tick
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
    }
  }
}
