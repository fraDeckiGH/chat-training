
// * color scheme/theme
// import this module only if the app is running in the browser

import { browser } from '$app/env';
import { writable$ } from '$lib/store';


export {
  // create,
  singleton as theme,
}
export type {
  Theme,
}


type TTheme = "dark" | "light"
type Switcher = TTheme | "system"



function create() {
  if (!browser) {
    console.log(`return: !browser`, )
    return
  }
  // if (!document) {
  //   console.log(`return: !document`, document)
  //   return
  // }
  
  const instance = new Theme()
  return instance
}



class Theme {
  
  private _current!: TTheme
  current$ = writable$(this.current)
  
  private _switcher!: Switcher
  switcher_nextValue!: Switcher
  
  // dom elements
  colorScheme_metaEl = document.head.querySelector('meta[name="color-scheme"]')
  htmlEl = document.documentElement
  // htmlEl = document.body
  
  // ============
  // * accessor
  
  public get current(): TTheme {
    return this._current
  }
  public set current(value: TTheme) {
    this._current = value
    
    // html
    switch (value) {
      case "dark":
        this.htmlEl.classList.add("theme-" + value)
        this.htmlEl.classList.remove("theme-light")
        break
      case "light":
        this.htmlEl.classList.add("theme-" + value)
        this.htmlEl.classList.remove("theme-dark")
        break
      default:
        console.log(`default case`, value)
        return
    }
    this.colorScheme_metaEl?.setAttribute("content", value)
    
    // store
    this.current$.set(value)
  }
  
  public get switcher(): Switcher {
    return this._switcher
  }
  public set switcher(value: Switcher) {
    this._switcher = value
    
    if (value !== "system") {
      localStorage.setItem("theme", value)
    } else {
      localStorage.removeItem("theme")
    }
  }
  
  // * constructor
  
  constructor() {
    this.init()
  }
  
  // * method
  
  init() {
    const fromStorage = <TTheme>localStorage.getItem("theme")
    
    if (fromStorage) {
      this.switch(fromStorage)
      return
    }
    
    this.switch("system")
  }
  
  switch(value?: Switcher) {
    if (value) {
      this.switcher = value
    } else {
      this.switcher = this.switcher_nextValue
    }
    
    // at OS level user prefers...
    if (
      window.matchMedia(`
        (prefers-color-scheme: dark), 
        (prefers-color-scheme: no-preference)
      `).matches
    ) {
      // dark theme
      switch (this.switcher) {
        case "dark":
          this.current = this.switcher
          this.switcher_nextValue = "system"
          break
        case "light":
          this.current = this.switcher
          this.switcher_nextValue = "dark"
          break
        case "system":
          this.current = "dark"
          this.switcher_nextValue = "light"
          break
        default:
          console.log(`default case`, )
      }
    } else {
      // light theme
      switch (this.switcher) {
        case "dark":
          this.current = this.switcher
          this.switcher_nextValue = "light"
          break
        case "light":
          this.current = this.switcher
          this.switcher_nextValue = "system"
          break
        case "system":
          this.current = "light"
          this.switcher_nextValue = "dark"
          break
        default:
          console.log(`default case`, )
      }
    }
    
  }
  
  
}



const singleton = create()


