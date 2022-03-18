
// * interaction & state related to it

/* reminders about interaction (tests done on <button> htmlEl)
  --
  legend

  "is present"
  means if there is the css rule w/ 
  at least 1(any) style rule written inside
  --

  chrome (many tests were made)
  --
  click applies 
  :focus
  :hover

  -> after having clicked

  :focus vs :hover (while hovering)
  none is given priority

  :focus vs :hover (while not hovering)
  :focus prevails
  if :focus rule isn't present :hover is shown instead
  --

  --
  keyboard "focus" applies
  :focus
  :focus-visible
  :hover

  -> after having focused by means of keyboard
  (in this case hovering/not hovering - doesn't change things)

  :focus vs :hover
  :focus prevails

  :focus vs :focus-visible
  none is given priority

  :focus-visible vs :hover
  if :focus rule is present :focus-visible prevails; 
  otherwise none is given priority
  --
*/

/* inspiration
  the :pseudo
  ? https://www.w3schools.com/cssref/css_selectors.asp
*/

import type { Maybe } from "./type/util";


export {
  calcResultingInteraction,
  
}
export type {
  ResultingInteraction,
  
}


type ResultingInteraction = 
    | "resultingInteractionError" // {pinned}
    | "focus"
    | "hover"
    | "no-interaction"
;

type State = Partial<{
  disabled: Maybe<boolean>
  
  /**
    no distinction between :focus, :focus-visible
  */
  focus: Maybe<boolean>
  loading: Maybe<boolean>
  hover: Maybe<boolean>
  
  /**
    :checked
  */
  selected: Maybe<boolean>
}>


// name proposal: getResultingState
/** 
  future: configParams to change behavior; 
  eg. depending on the cmp/htmlElem in need
 */
function calcResultingInteraction(state: State) {
  const {
    disabled,
    focus,
    loading,
    hover,
    selected,
  } = state
  
  let res: ResultingInteraction = "resultingInteractionError"
  
  
  // * utils
  /* ? in case I need to do a check like 
    
    // every val of the obj is...
    (Object.values(objToCheck)).every(val => !val))
  */
  
  const interaction = {
    focus,
    hover,
  }
  
  /** can conflict
    depending on how these are handled they may conflict w/ each other
    (at least at the CSS level)
  */
  const sideEffect = {
    disabled,
    loading,
    selected,
  }
  
  
  // * calc
  
  // ? old: used for <Btn>
  /* if (
    // a :disabled <button> automatically loses :focus
    disabled || 
    
    (loading && !focus) || 
    
    // every val of the obj is...
    (Object.values(interaction)).every(val => !val)
  ) {
    res = "no-interaction"
  }
  if (focus) {
    res = "focus"
  }
  if (hover 
    && !disabled
    && !loading
  ) {
    res = "hover"
  } */
  
  if (
    // every val of the obj is...
    (Object.values(interaction)).every(val => !val)
  ) {
    /* 
      here I decide if 'sideEffect'.props are decorations to 
      the "result" - in CSS they would need to overwrite to 
      prevail in case of conflict; 
      or have their own "result" - in CSS they don't need to 
      overwrite, cuz there would be no conflict
    */
    
    // if (condition) {}
    res = "no-interaction"
    
  } else {
    // between focus
    
    if (focus 
      // a :disabled <button> automatically loses :focus
      && !disabled // tbs
    ) {
      res = "focus"
    }
    if (hover 
      // every val of the obj is...
      && (Object.values(sideEffect)).every(val => !val)
    ) {
      res = "hover"
    }
    
  }
  
  
  return res
}






















