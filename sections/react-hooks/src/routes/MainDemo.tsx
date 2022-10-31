import { useState } from "react"
import HooksDemo from "../components/hooksDemo"
import { ThemeContext, themes } from "../themeContext"

const MainDemo: React.FC = () => {
  const [theme, setTheme] = useState(themes.LIGHT);
  return (
    <div className={`main bg-${theme}`}>
      <ThemeContext.Provider value={theme}>
        <HooksDemo switchTheme={() => setTheme(theme === themes.LIGHT ? themes.DARK : themes.LIGHT)}/>
      </ThemeContext.Provider>
    </div>
  )
}

export default MainDemo
