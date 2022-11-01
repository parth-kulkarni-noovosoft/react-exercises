import { useState, useEffect } from "react";

export default () => {
    const [categories, setCategories] = useState<string[]>(['All']);

    useEffect(() => {
        const getCategories = async () => {
            const rawData = await fetch('https://dummyjson.com/products/categories');
            const jsonData: string[] = await rawData.json();
            setCategories(['All', ...jsonData]);
        };
        getCategories();
    }, [])

    return categories;
}