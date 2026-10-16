// themes.js
export const lightTheme = {
  background: '#ffffff',
  color: '#333333',
  primary: '#321fdb',
  border: '#d8dbe0'
}

export const darkTheme = {
  background: '#181924',
  color: '#ffffff',
  primary: '#4638c2',
  border: '#2c2c34'
}

export const getThemeConfig = (mode) => {
  return mode === 'dark' ? darkTheme : lightTheme
}