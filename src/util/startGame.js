import blinkingRockets from '../util/blinkingRockets.js'
import keyPressesToRocket from '../util/keyPressesToRocket.js'

export default (state, animatedText) => {
  // shortcuts
  const {tickCount, lastGameModeSwitch, lastKeyPresses} = state

  // true when game mode has recently changed, ie. first tick that this game mode gains control
  const firstTick = lastGameModeSwitch === tickCount

  // draw blank frame and start game (gameActive = true) on any button press
  if (lastKeyPresses.p1.includes(tickCount) || lastKeyPresses.p2.includes(tickCount)) {
    return {
      gameActive: true,
      bullets: {
        ...state.bullets,
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
      rockets: { // set rocket to position of initializing button
        p1: keyPressesToRocket(tickCount, lastKeyPresses.p1, [1, 0, 0, 0]),
        p2: keyPressesToRocket(tickCount, lastKeyPresses.p2, [1, 0, 0, 0]),
      },
    }
  }

  // draw animated text
  return {
    bullets: {
      ...state.bullets,
      p1: animatedText(firstTick), // reset on first tick
      p2: animatedText(firstTick), // reset on first tick
    },
    // rockets: {
    //   ...state.rockets,
    //   p1: blinkingRockets(tickCount),
    //   p2: blinkingRockets(tickCount),
    // }
  }
}
