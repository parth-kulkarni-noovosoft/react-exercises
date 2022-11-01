import { useMemo, useState } from "react"
import HooksDemo from "../components/hooksDemo"
import { ThemeContext, themes } from "../themeContext"

const MainDemo: React.FC = () => {
  const [theme, setTheme] = useState(themes.LIGHT);
  const toggleTheme = () => setTheme(theme === themes.LIGHT ? themes.DARK : themes.LIGHT)
  // useMemo here as the value of contextValue
  // would only be changed if the values in array
  // are changed.
  // https://dev.to/ramonak/react-context-api-updating-context-from-a-nested-component-in-functional-components-with-hooks-and-class-components-a7a#comment-1lngk
  const contextValue = useMemo(() => ({ theme, toggle: toggleTheme }), [theme, toggleTheme])

  return (
    <div className={`main bg-${theme}`}>
      <ThemeContext.Provider value={contextValue}>
        <HooksDemo />
      </ThemeContext.Provider>
    </div>
  )
}

export default MainDemo
