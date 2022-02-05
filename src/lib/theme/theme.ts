
// * color scheme/theme
// import this module only if the app is running in the browser

export {
  create,
}
export type {
  Theme,
}

type TTheme = "dark" | "light"

function create() {
  if (!document) {
    console.log(`return: !document`, document)
    return
  }
  
  const instance = new Theme()
  return instance
}

class Theme {
  
  private _currentTheme!: TTheme
  
  // dom elements
  colorScheme_metaEl = document.head.querySelector('meta[name="color-scheme"]')
  htmlEl = document.documentElement
  // htmlEl = document.body
  
  // ============
  // * accessor
  
  public get currentTheme(): TTheme {
    return this._currentTheme
  }
  public set currentTheme(value: TTheme) {
    switch (value) {
      case "dark":
        this.htmlEl.classList.add("theme-dark")
        this.htmlEl.classList.remove("theme-light")
        this.colorScheme_metaEl?.setAttribute("content", "dark")
        break
      case "light":
        this.htmlEl.classList.add("theme-light")
        this.htmlEl.classList.remove("theme-dark")
        this.colorScheme_metaEl?.setAttribute("content", "light")
        break
      default:
        console.log(`default case`, value)
        return
    }
    this._currentTheme = value
    localStorage.setItem("theme", value)
  }
  
  // * constructor
  
  constructor() {
    this.currentTheme = this.initCurrentTheme()
  }
  
  // * method
  
  initCurrentTheme() {
    const fromStorage = localStorage.getItem("theme")
    
    if (fromStorage) {
      return <TTheme>fromStorage
    }
    
    // at OS level user prefers...
    if (
      window.matchMedia(`
        (prefers-color-scheme: dark), 
        (prefers-color-scheme: no-preference)
      `).matches
    ) {
      // dark theme
      // console.log(`prefers dark`, )
      return "dark"
    } else {
      // light theme
      // console.log(`prefers light`, )
      return "light"
    }
  }
  
  switchCurrentTheme() {
    if (!this.currentTheme) {
      console.log(`return: !this.currentTheme`, )
      return
    }
    
    switch (this.currentTheme) {
      case "dark":
        this.currentTheme = "light"
        break
      case "light":
        this.currentTheme = "dark"
        break
      default:
        console.log(`default case`, this.currentTheme)
    }
    
  }
  
  
}


