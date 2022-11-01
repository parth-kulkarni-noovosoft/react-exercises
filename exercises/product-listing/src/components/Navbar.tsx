import { ChangeEventHandler } from "react"
import useCategories from "../hooks/useCategories";
import './Navbar.css';

interface INavbarProps {
    onQueryChange: ChangeEventHandler<HTMLInputElement>;
    onCategoryChange: ChangeEventHandler<HTMLSelectElement>;
    query: string;
    category: string;
}

const Navbar: React.FC<INavbarProps> = ({ 
    onCategoryChange,
    onQueryChange,
    category,
    query
}) => {
    const categories = useCategories();

    return (
        <div className="input-container">
            <input
                className="query"
                type="text"
                name="query"
                id="query"
                onChange={onQueryChange}
                value={query}
                placeholder='Search Query'
            />
            <select
                className="category"
                name="category"
                id="category"
                onChange={onCategoryChange}
                value={category}
            >
                {categories.map((category, idx) => {
                    return <option value={category} key={`${category}${idx}`}>{category}</option>
                })}
            </select>
        </div>
    )
}

export default Navbar