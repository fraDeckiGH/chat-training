
// * 
// client side module

// ? merge w/ ./toast-handler.ts ?
/* 
TODO
disconnect intersection observer 
disconnect mutation observer

can be disconnected altogether or on the individual DOM elems observed
*/

export {
  createIntersectionObserver,
}


/**
 * ? https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */
function createIntersectionObserver(
// options: IntersectionObserverInit

/* {
  handleIntersect,
  options,
}: {
  handleIntersect: IntersectionObserverCallback
  options: IntersectionObserverInit
} */

/** @type IntersectionObserverInit */
options: {
  root: Element
  threshold: number
}
) {
  if (!document) {
    console.log(`!document`, document)
    return
  }
  
  const handleIntersect: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[], 
    observer: IntersectionObserver
  ) => {
    console.log(`entries`, entries)
    // console.log(`observer`, observer)
    
    entries.forEach((entry) => {
      // console.log(`entry`, entry)
      
      if (entry.intersectionRatio < options.threshold) {
        console.log(`entry.target`, entry.target)
        // observer.unobserve(entry.target)
      }
    })
  }

  const intersectionObserver = new IntersectionObserver(handleIntersect, options)
  
  // intersectionObserver.disconnect()
  
  
  createMutationObserver({
    intersectionObserver,
    // target: <Element>options.root!,
    target: options.root,
  })
}


/**
 * ? https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 */
function createMutationObserver({
  intersectionObserver,
  target,
}: {
  intersectionObserver: IntersectionObserver
  target: Element
  // target: HTMLElement
}) {
  
  /**
   * ? https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#example
   */
  const handleMutation: MutationCallback = (records: MutationRecord[], observer) => {
    console.log(`records`, records)
    // console.log(`observer`, observer)
    
    for(const record of records) {
      if (record.type === 'childList') {
        // console.log('A child node has been added or removed')
        
        record.addedNodes.forEach((node) => {
          // there are different types of Node
          // is 'node' an Element?
          if (!node.ELEMENT_NODE) {
            console.log(`return: !node.ELEMENT_NODE`, node.ELEMENT_NODE)
            return
          }
          
          
          // https://developer.mozilla.org/en-US/docs/Web/API/Element/localName
          // https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName
          // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName
          
          const classes = `.${
            ((<Element>node).className).replaceAll(" ", ".")
          }`
          // console.log(`classes`, classes)
          
          
          // node.parentElement
          // node.parentNode
          const el = target.querySelector(classes)
          // console.log(`el`, el)
          if (!el) {
            console.log(`return: !el`, el)
            return
          }
          
          intersectionObserver.observe(el)
          
        })
        
      }
    }
    
  }
  
  const mutationObserver = new MutationObserver(handleMutation)
  
  const config: MutationObserverInit = { 
    // attributes: true,
    // characterData: true,
    childList: true,
    // subtree: true
  }
  mutationObserver.observe(target, config)
  
  // ? where should I call this
  // mutationObserver.disconnect()
}











