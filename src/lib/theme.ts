
// * color scheme/theme
// import this module only if the app is running in the browser

export {
  create,
}
export type {
  Theme,
}

type Preference = "dark" | "light" | "system"

function create() {
  const instance = new Theme()
  return instance
}

class Theme {
  
  currentPreference: Preference
  
  constructor() {
    this.currentPreference = 
      <Preference>localStorage.getItem("theme") ?? "system"
  }
  
  switchTheme() {
    // get current theme
    // if (
    //   window.matchMedia(`
    //     (prefers-color-scheme: dark), 
    //     (prefers-color-scheme: no-preference)
    //   `).matches
    // ) {
    //   // dark theme
    //   console.log(`dark`, )
    //   document.documentElement.classList
    //     .replace("theme-light", "theme-dark")
    // } else {
    //   // light theme
    //   console.log(`light`, )
    //   document.documentElement.classList
    //     .replace("theme-dark", "theme-light")
    // }
    
    
    switch (this.currentPreference) {
      case "dark":
        nextTheme = "light"
        
        document.documentElement.classList
          .replace("theme-light", "theme-dark")
        localStorage.setItem("theme", "dark")
        break
      case "light":
        nextTheme = "system"
        
        document.documentElement.classList
          .replace("theme-dark", "theme-light")
        localStorage.setItem("theme", "light")
        break
      case "system":
        nextTheme = "dark"
        
        // current is now system
        document.documentElement.classList.remove(
          "theme-dark", "theme-light",
        )
        localStorage.removeItem("theme")
        break
    
      default:
        console.log(`switch default`, )
    }
    
  }
  
  
}


