import { useState } from "react"
import HooksDemo from "../components/hooksDemo"
import { ThemeContext, themes } from "../themeContext"

const MainDemo: React.FC = () => {
  const [theme, setTheme] = useState(themes.LIGHT);
  return (
    <div className={`main bg-${theme}`}>
      <ThemeContext.Provider value={{
        theme,
        toggle: () => setTheme(theme === themes.LIGHT ? themes.DARK : themes.LIGHT)
      }}>
        <HooksDemo />
      </ThemeContext.Provider>
    </div>
  )
}

export default MainDemo
