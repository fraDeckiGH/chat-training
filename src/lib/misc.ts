
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
  zIndexes throughout the app
  higher number prevails
  
  <cmpName>: value
*/
const stackingContext: Readonly<{
  [key: string]: number
}> = {
  modal: 1,
  popover: 1,
  toastHandler: 2,
}




