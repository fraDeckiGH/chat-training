
// * utility module

import { Gun } from "./chainExtension"

export {
  gun_state
}

/**
 * wrapper func around Gun.state()
 * precision: nanosecond
 */
function gun_state() {
  // @ts-ignore
  return Gun.state()
}


















