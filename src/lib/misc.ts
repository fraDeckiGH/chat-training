
// * avoid putting things here

export {
  htmlElems,
  stackingContext,
}


const htmlElems: {
  appScroller?: HTMLElement
  appScrollable?: HTMLElement
} = {}

/**
 * zIndexes throughout the app
 */
const stackingContext: Readonly<{
  [key: string]: number
}> = {
  modal: 1,
  popover: 1,
  toastHandler: 2,
}




