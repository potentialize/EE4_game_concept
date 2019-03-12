// import charTo4x5 from '../util/charTo4x5.js'
// import createBlinkingText from '../util/createBlinkingText.js'
// import createScrollingText from '../util/createScrollingText.js'
import keyPressesToRocket from '../util/keyPressesToRocket.js'

// const blinkHelloWorld = createBlinkingText('Hello World')
// const scrollLetterTest = createScrollingText('The quick brown fox jumps over the lazy dog 1 2 3 4 5 6 7 8 9   ')
// const blinkLetterTest = createBlinkingText('The quick brown fox jumps over the lazy dog 1 2 3 4 5 6 7 8 9')

// DO NOT MUTATE STATE!!!
export default (state) => {
  // shortcuts
  const {tickCount, lastKeyPresses, rockets, lastGameModeSwitch} = state

  // true when game mode has recently changed, ie. first tick that this game mode gains control
  const firstTick = lastGameModeSwitch === tickCount

  return {
    bullets: {
      ...state.bullets,
      // p1: scrollLetterTest(firstTick), // reset on first tick
      // p2: blinkLetterTest(firstTick), // reset on first tick
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
    rockets: {
      p1: keyPressesToRocket(tickCount, lastKeyPresses.p1, rockets.p1, firstTick),
      p2: keyPressesToRocket(tickCount, lastKeyPresses.p2, rockets.p2, firstTick),
    },
  }
}
