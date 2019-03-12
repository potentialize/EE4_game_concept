export default (tickCount, keyPresses, oldRockets, forceEmptyOldRockets = false) => {
  const newKeyPressIndex = keyPresses.indexOf(tickCount)

  if (forceEmptyOldRockets) oldRockets = [0, 0, 0, 0]

  if (newKeyPressIndex === -1) {
    // no new key press, return old rocket array
    return oldRockets
  } else {
    // create new rocket array
    let newRockets = [0, 0, 0, 0]
    newRockets[newKeyPressIndex] = 1

    // return new rocket array
    return newRockets
  }
}
