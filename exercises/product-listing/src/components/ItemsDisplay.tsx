import { memo } from "react";
import useItems from "../hooks/useItems";
import ItemInfo from "./ItemInfo";

interface IItemsDisplayProps {
    category: string;
    query: string;
}

const ItemsDisplay: React.FC<IItemsDisplayProps> = ({ category, query }) => {
    const items = useItems(query, category);

    return <div className="items-display-container">
        {items.map(item => <ItemInfo key={item.id} item={item} />)}
    </div>
}

export default memo(ItemsDisplay);