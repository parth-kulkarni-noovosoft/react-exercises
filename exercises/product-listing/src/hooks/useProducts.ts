import { useEffect, useRef, useState } from "react";
import { Routes } from "../constants";
import { IProductInfo } from "../types";

const useProducts = (productIDs: number[]) => {
    const cache = useRef<{
        [id: number]: IProductInfo
    }>({});

    const [products, setProducts] = useState<IProductInfo[]>([]);

    useEffect(() => {
        const getProductDetails = async () => {
            const responses: IProductInfo[] = await Promise.all(
                productIDs.map(productID => {
                    if (cache.current[productID]) {
                        return cache.current[productID];
                    }

                    return fetch(Routes.product(productID)).then(e => e.json())
                })
            )

            responses.forEach(response => {
                cache.current[response.id] = response;
            })

            setProducts(responses);
        };


        getProductDetails();
    }, [productIDs]);
    return products;
}

export default useProducts;