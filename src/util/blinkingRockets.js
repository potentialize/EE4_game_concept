export default (tickCount, ticksPerBlink = 10) => {
  // stateless blinking :^)
  if (tickCount % (ticksPerBlink * 2) < ticksPerBlink) {
    return [1, 0, 1, 0]
  } else {
    return [0, 1, 0, 1]
  }
}
