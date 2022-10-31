import React from "react"

export enum themes {
    LIGHT = 'light',
    DARK = 'dark'
}

export const ThemeContext = React.createContext({
    theme: themes.LIGHT,
    toggle: () => {} 
});