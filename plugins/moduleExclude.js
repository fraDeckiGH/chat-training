// src https://gun.eco/docs/Vite

export const moduleExclude = match => {
  const m = id => id.indexOf(match) > -1
  return {
    name: `exclude-${match}`,
    resolveId(id) {
      if (m(id)) return id
    },
    load(id) {
      if (m(id)) return `export default {}`
    },
  }
}
