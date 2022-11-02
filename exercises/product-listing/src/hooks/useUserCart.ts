import { useEffect, useState, useMemo, useCallback } from "react";
import { CartsResponse, ICartInfo, IProductInfo } from "../typings";

interface IRequestPayload {
    userID: number;
    cartID: number;
    products: {
        id: number;
        qty?: number;
    }[]
}

const generatePutItemsRequest = (cartID: number, products: IRequestPayload['products']): Request => {
    return new Request(`https://dummyjson.com/carts/${cartID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products })
    })
}

const generateAddCartOrUpdateCartRequest = (payload: IRequestPayload): Request => {
    if (payload.cartID === 0) {
        return new Request('https://dummyjson.com/carts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: payload.userID,
                products: payload.products
            })
        })
    }

    return generatePutItemsRequest(payload.cartID, payload.products)
}

const convertProductArrayToSet = (products: Pick<IProductInfo, 'id'>[]) => {
    return new Set<number>(products.map(product => product.id));
}

const generateGetCartRequest = (userID: number) => {
    return new Request(`https://dummyjson.com/carts/user/${userID}`);
}

const useUserCart = (userID: number) => {
    const [cartProducts, setCartProducts] = useState<Set<number>>(new Set());
    const [cartID, setCartID] = useState<number>(0);

    useEffect(() => {
        const getInitialItems = async () => {
            const cartsInfo: CartsResponse = await (await fetch(generateGetCartRequest(userID))).json();
            setCartProducts(convertProductArrayToSet(cartsInfo.carts?.[0]?.products ?? []));
            if (cartsInfo.carts[0]) {
                setCartID(cartsInfo.carts[0].id);
            }
        }

        getInitialItems();
    }, [userID])

    const updateCartAndRequest = useCallback(async (products: IRequestPayload['products'], save = true) => {
        const apiURL = generateAddCartOrUpdateCartRequest({
            cartID,
            products,
            userID
        })
        let cartData: ICartInfo;
        try {
            cartData = (await (await fetch(apiURL)).json())
        } catch (err) {
            console.error(err);
            return;
        }
        if (save) {
            setCartProducts(convertProductArrayToSet(cartData.products));
            if (cartID === 0) {
                setCartID(cartData.id);
            }    
        }
    }, [cartID, userID])

    return useMemo(() => ({
        getItemsID: () => cartProducts,

        addItem: async (itemID: number) => {
            const existingProducts = [];
            for (const key of cartProducts.keys()) {
                existingProducts.push({ id: key });
            }
            
            const newCartList = [
                ...existingProducts,
                { id: itemID }
            ];

            updateCartAndRequest(newCartList, false);
            setCartProducts(convertProductArrayToSet(newCartList));

        },

        removeItem: async (itemID: number) => {
            const existingProducts = [];
            for (const key of cartProducts.keys()) {
                if (key === itemID) continue;
                existingProducts.push({ id: key });
            }

            updateCartAndRequest(existingProducts, false);
            setCartProducts(convertProductArrayToSet(existingProducts));
        }
    }), [cartProducts])
}

export default useUserCart;