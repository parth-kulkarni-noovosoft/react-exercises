import { useEffect, useState } from "react";
import { IProductInfo } from "../typings";

const useItems = (itemIDs: number[]) => {
    const [items, setItems] = useState<IProductInfo[]>([]);

    useEffect(() => {
        const getItems = async () => {
            const itemInformation = await Promise.all(itemIDs.map(async itemID => {
                return await (await fetch(`https://dummyjson.com/products/${itemID}`, { cache: 'force-cache' })).json();
            }))
            setItems(itemInformation);
        }
        getItems().catch(e => console.error(e))
    }, [itemIDs]);
    return items;
}

export default useItems;