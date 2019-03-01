import charTo4x5 from '../util/charTo4x5.js'

/*
Every time the returned function is called, counts as a tick
Characters can be set to display multiple ticks via ticksPerChar
In between characters, the display can be cleared for an amount of ticks,
configured in ticksPerBlink
*/
// TODO: remove spacer stuff; can achieve the same effect by changing the input text
export default (text, ticksPerChar = 30, ticksPerBlink = 10) => {
  // tick index
  let ti = 0

  // char index
  let ci = 0

  // total amount of characters
  const charCount = text.length

  // total ticks per character
  const totalTicksPerChar = ticksPerChar + ticksPerBlink

  // reset tick index after ... iterations
  const maxTi = charCount * totalTicksPerChar - 1

  return (reset) => {
    if (reset) {
      // reset
      ti = 0
      ci = 0
    }

    const currentChar = ti % totalTicksPerChar < ticksPerChar ? text[ci] : ' '

    if (ti < maxTi) {
      // update tick index
      ti++

      // update char index on every multiple of ticksPerChar
      // NOTE: update after ti so that ci does not increase after first tick (0 % anything = 0)
      if (ti % totalTicksPerChar === 0) ci++
    } else {
      // reset all indices
      ti = 0
      ci = 0
    }

    return charTo4x5(currentChar)
  }
}
