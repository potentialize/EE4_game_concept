import charTo4x5 from '../util/charTo4x5.js'

// NOTE: Using ticksPerScroll is not the most resource-efficient way to slow down the text movement
//        Prefer setting ticksPerScroll to 0 and only calling when needed
export default (text, ticksPerScroll = 6) => {
  // tick index
  let ti = 0

  // scroll index
  let si = 0

  // init aggregate rows
  let r1 = []
  let r2 = []
  let r3 = []
  let r4 = []
  let r5 = []

  for (let char of text) {
    if (char === ' ') {
      // smaller spaces (2 blank lanes, see (1))
      r1.push(0)
      r2.push(0)
      r3.push(0)
      r4.push(0)
      r5.push(0)
    } else {
      // get pixel encoding of character
      const pixelMatrix = charTo4x5(char)

      // split pixel matrix into rows
      // (1) add blank lane after each character
      r1.push(...pixelMatrix.slice(0, 4), 0)
      r2.push(...pixelMatrix.slice(4, 8), 0)
      r3.push(...pixelMatrix.slice(8, 12), 0)
      r4.push(...pixelMatrix.slice(12, 16), 0)
      r5.push(...pixelMatrix.slice(16, 20), 0)
    }
  }

  // row length
  const rowLength = r1.length

  // maximum counter value before restart from 0
  const maxTi = rowLength * ticksPerScroll - 1

  return (reset) => {
    if (reset) {
      // reset
      ti = 0
      si = 0
    }

    // select part to display
    const segment = []
      .concat(getRowSegment(r1, si))
      .concat(getRowSegment(r2, si))
      .concat(getRowSegment(r3, si))
      .concat(getRowSegment(r4, si))
      .concat(getRowSegment(r5, si))

    // console.log('ti:\t', ti, '\tsi:\t', si)
    console.log('segment.length', segment.length);

    if (ti < maxTi) {
      // update tick index
      ti++

      // update scroll index on every multiple of ticksPerScroll
      // NOTE: update after ti so that si does not increase after first tick (0 % anything = 0)
      if (ti % ticksPerScroll === 0) si++
    } else {
      // reset all indices
      ti = 0
      si = 0
    }

    return segment
  }
}

const getRowSegment = (row, start) => {
  const stop = start + 4

  // get segment
  let segment = row.slice(start, stop)

  if (stop > row.length) {
    // complete segment with pixels from start of array
    const extra = stop - row.length
    segment.push(...row.slice(0, extra))
  }

  return segment
}
