
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
  dynamic import map
  <CmpName>: path
*/
const importPath = {
  // List: "$lib/list/list.svelte",
  // ListItem: "$lib/list-item/list-item.svelte",
}

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




