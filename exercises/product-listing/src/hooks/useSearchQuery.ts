import { useState, useMemo, useEffect } from "react";
import { IProductInfo, ProductsResponse } from "../typings";

const filterFunctionGenerator = (category: string) => {
    if (category === 'All') return () => true;
    return (item: IProductInfo) => item.category === category;
}

export default (query: string, category: string) => {
    const [items, setItems] = useState<IProductInfo[]>([]);
    const filterFunction = useMemo(() => filterFunctionGenerator(category), [category])    
    useEffect(() => {
        const getItems = async () => {
            const itemData: ProductsResponse = (await (await fetch(`https://dummyjson.com/products/search?q=${query}&limit=100`)).json());
            setItems(itemData.products.filter(filterFunction));
        }

        getItems();
    }, [category, query])
    return items;
}
