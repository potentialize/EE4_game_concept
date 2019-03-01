// import charTo4x5 from '../util/charTo4x5.js'
import createBlinkingText from '../util/createBlinkingText.js'
import createScrollingText from '../util/createScrollingText.js'

// const blinkHelloWorld = createBlinkingText('Hello World')
const scrollLetterTest = createScrollingText('The quick brown fox jumps over the lazy dog 1 2 3 4 5 6 7 8 9')
const blinkLetterTest = createBlinkingText('The quick brown fox jumps over the lazy dog 1 2 3 4 5 6 7 8 9')

// DO NOT MUTATE STATE!!!
export default (state) => {
  return {
    bullets: {
      ...state.bullets,
      left: scrollLetterTest(),
      right: blinkLetterTest(),
      // left: [
      //   0, 0, 0, 0,
      //   0, 0, 0, 0,
      //   0, 0, 0, 0,
      //   0, 0, 0, 0,
      //   0, 0, 0, 0,
      // ],
      // right: [
      //   0, 0, 0, 0,
      //   0, 0, 0, 0,
      //   0, 0, 0, 0,
      //   0, 0, 0, 0,
      //   0, 0, 0, 0,
      // ],
    }
  }
}
