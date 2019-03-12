import createScrollingText from '../util/createScrollingText.js'
import startGame from '../util/startGame.js'
import keyPressesToRocket from '../util/keyPressesToRocket.js'
import displayShift from '../util/displayShift.js'

const scrollCoopText = createScrollingText('  coop  ')

// DO NOT MUTATE STATE!!!
export default (state) => {
  // shortcuts
  const {
    tickCount,
    ticksPerEvent,
    bullets,
    lastKeyPresses,
    rockets,
    gameActive,
    gameModes,
    // currentGameModeIndex,
    // lastGameModeSwitch
  } = state

  // true when game mode has recently changed, ie. first tick that this game mode gains control
  // const firstTick = lastGameModeSwitch === tickCount

  // display game mode name and handle keypress on start
  if (!gameActive) return startGame(state, scrollCoopText)

  // new rockets state
  const newRockets = {
    p1: keyPressesToRocket(tickCount, lastKeyPresses.p1, rockets.p1),
    p2: keyPressesToRocket(tickCount, lastKeyPresses.p2, rockets.p2),
  }

  if (tickCount % ticksPerEvent === 0) {
    // event game tick, advance game

    // check defensive position
    // const p1Defence = checkDefence(bullets.p1, rockets.p1)
    // const p2Defence = checkDefence(bullets.p2, rockets.p2)

    // add new projectile
    const newBulletsP1 = generateNextFrame(bullets.p1)
    // const newBulletsP2 = generateNextFrame(bullets.p2)

    return {
      bullets: {
        ...state.bullets,
        p1: newBulletsP1,
        // p2: newBulletsP2,
        // p1: [
        //   0, 0, 0, 0,
        //   0, 0, 0, 0,
        //   0, 0, 0, 0,
        //   0, 0, 0, 0,
        //   0, 0, 0, 0,
        // ],
        p2: [
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      gameModes: [
        ...gameModes,
      ],
      rockets: newRockets,
    }
  } else {
    // no event game tick, only listen for button presses
    return {
      rockets: newRockets,
    }
  }
}

const checkDefence = (bullets, rockets) => {
  // get bottom row (4px) from bullets array
  const lastBullets = bullets.slice(-4)

  // verify that bullet is dodged
  lastBullets.forEach((bullet, i) => {
    if (bullet === 1) {
      // impeding bullet; check defence
      if (rockets[i] === 1) {
        // good defence
        return 1
      } else {
        // failed to defend
        return 0
      }
    }
  })

  // no defence was needed
  return -1
}

const generateNextFrame = (oldBullets) => {
  const newBulletRow = [0, 0, 0, 0]

  // do not spawn consecutive bullets
  if (!oldBullets.slice(0, 4).includes(1)) {
    // 0-7 => 12.5% chance that bullet spawns at either location, 50.0% chance that no bullet spawns at all
    // 0-5 => 16.7% chance that bullet spawns at either location, 33.3% chance that no bullet spawns at all
    const randInt = Math.round( Math.random() * 7 )

    // draw spawned bullet
    if (randInt < 4) newBulletRow[randInt] = 1
  }

  return displayShift(newBulletRow, oldBullets)
}
