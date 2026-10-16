import { useState, createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();


export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("app-theme") || 'light'
    })
    useEffect(() => {
        localStorage.setItem("app-theme", mode);
        document.documentElement.setAttribute('data-theme', mode);
    }, [mode])

    const toggleTheme = () => {
        setMode((prev) => prev == 'light' ? 'dark' : 'light')
    }
    return (<ThemeProvider  value={{ mode, toggleTheme, isDark: mode === 'dark' }}>
        {children}
    </ThemeProvider>)
}
