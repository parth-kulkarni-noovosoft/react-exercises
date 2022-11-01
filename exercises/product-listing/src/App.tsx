import { ChangeEventHandler, useState } from "react";
import ItemsDisplay from "./components/ItemsDisplay";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  
  const onQueryChange: ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value);
  }

  const onCategoryChange: ChangeEventHandler<HTMLSelectElement> = e => {
    setCategory(e.target.value);
  }

  return (
    <div className="container">
      <Navbar 
        category={category}
        query={query}
        onCategoryChange={onCategoryChange}
        onQueryChange={onQueryChange}
      />
      <ItemsDisplay
        category={category}
        query={query}
      />
    </div>
  )
}
export default App
