import { useEffect, useState, useMemo, useContext, useRef } from "react";
import UserContext from "../context/user";
import { CartsResponse, ICartInfo, Timed } from "../types";
import { Routes } from "../constants";
import { isStale } from "../utils";

interface IRequestPayload {
    userID: number;
    cartID: number;
    products: {
        id: number;
        qty?: number;
    }[]
}

interface ICartData {
    userID: number
    products: number[],
    cartID: number
}

interface ILocalStorageData {
    [userID: number]: Timed<{
        data: ICartData
    }>
}

const generatePutItemsRequest = (payload: IRequestPayload) => {
    return new Request(Routes.cart(payload.cartID), {
        method: 'PUT',
        body: JSON.stringify({ products: payload.products })
    })
}

const generateAddCartRequest = (payload: IRequestPayload) => {
    return new Request(Routes.cartAdd(), {
        method: 'POST',
        body: JSON.stringify({
            userId: payload.userID,
            products: payload.products
        })
    })
}

const saveDataToLocalStorage = (data: ICartData) => {
    const localDataString = localStorage.getItem('cart-data')
    let previousData: Record<string, unknown> = {};
    if (localDataString) {
        previousData = JSON.parse(localDataString);
    }

    localStorage.setItem('cart-data', JSON.stringify({
        ...previousData,
        [data.userID.toString()]: {
            data,
            timestamp: Date.now()
        }
    }))
};

const useCart = () => {
    const [cartProducts, setCartProducts] = useState<number[]>([]);
    const [cartID, setCartID] = useState<number>(0);
    const { userID } = useContext(UserContext);

    const cache = useRef<{
        [userID: number]: Timed<CartsResponse>
    }>({});

    const updateCartAndRequest = async (products: number[], cb: (data: ICartInfo) => void) => {
        const payload: IRequestPayload = {
            cartID,
            products: products.map(id => ({ id })),
            userID
        }
        const request = cartID === 0
            ? generateAddCartRequest(payload)
            : generatePutItemsRequest(payload)
        const response = await fetch(request);
        const cartData: ICartInfo = await response.json()
        cb(cartData);
    }

    useEffect(() => {
        const getInitialItems = async () => {
            const item = localStorage.getItem('cart-data')
            if (item) {
                const parsedDocument: ILocalStorageData = JSON.parse(item);
                const currentUserData = parsedDocument[userID];

                if (!isStale(currentUserData)) {
                    const { data } = currentUserData;
                    setCartProducts(data.products);
                    setCartID(data.cartID ?? 0);
                    return;
                }
            }

            const cartResponse = isStale(cache.current[userID])
                ? await (await fetch(Routes.userCarts(userID))).json() as CartsResponse
                : cache.current[userID];

            cache.current[userID] = {
                ...cartResponse,
                timestamp: Date.now()
            }

            const products = (cartResponse.carts?.[0]?.products ?? [])
                .map(product => product.id)

            setCartProducts(products);
            setCartID(cartResponse.carts?.[0]?.id ?? 0);
            saveDataToLocalStorage({
                products,
                cartID: cartResponse.carts?.[0]?.id ?? 0,
                userID
            });
            return;
        }

        getInitialItems().catch(e => console.error(e));
    }, [userID])


    return useMemo(() => ({
        getProductIDs: () => cartProducts,

        addProduct: async (itemID: number) => {
            const newCartList = cartProducts
                .concat(itemID)

            await updateCartAndRequest(newCartList, (cartData) => {
                setCartProducts(newCartList);
                if (cartID === 0) {
                    setCartID(cartData.id);
                }
                saveDataToLocalStorage({ products: newCartList, userID, cartID });
            });
        },

        removeProduct: async (itemID: number) => {
            const remainingProductList = cartProducts
                .filter(id => id !== itemID)

            await updateCartAndRequest(remainingProductList, () => {
                setCartProducts(remainingProductList);
                saveDataToLocalStorage({ products: remainingProductList, cartID, userID });
            });
        }
    }), [cartProducts])
}

export default useCart;
