import { useEffect, useState, useMemo, useContext } from "react";
import UserContext from "../context/user";
import { CartsResponse, ICartInfo, Timed } from "../typings";
import ms from "ms"

interface IRequestPayload {
    userID: number;
    cartID: number;
    products: {
        id: number;
        qty?: number;
    }[]
}

interface ILocaleStorageData {
    products: number[],
    cartID: number
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

const generateGetCartRequest = (userID: number) => {
    return new Request(`https://dummyjson.com/carts/user/${userID}`);
}
const saveDataToLocalStorageFactory = (localStorageKey: string) =>
    (data: Partial<ILocaleStorageData>) => {
        const localDataString = localStorage.getItem(localStorageKey)
        let previousData: Record<string, unknown> = {};
        if (localDataString) {
            previousData = JSON.parse(localDataString);
        }

        localStorage.setItem(localStorageKey, JSON.stringify({
            ...previousData,
            ...data,
            timestamp: Date.now()
        }))

    };

const updateCartAndRequestFactory = (cartID: number, userID: number) =>
    async (products: number[], cb: (data: ICartInfo) => void) => {
        const apiURL = generateAddCartOrUpdateCartRequest({
            cartID,
            products: products.map(id => ({ id })),
            userID
        })
        let cartData: ICartInfo;
        try {
            cartData = (await (await fetch(apiURL)).json())
        } catch (err) {
            console.error(err);
            return;
        }
        cb(cartData);
    }

const useUserCart = () => {
    const [cartProducts, setCartProducts] = useState<number[]>([]);
    const [cartID, setCartID] = useState<number>(0);
    const { userID } = useContext(UserContext);
    const localStorageKey = `cart-data-${userID}`;

    const saveDataToLocaleStorage = useMemo(
        () => saveDataToLocalStorageFactory(localStorageKey),
        [userID]
    );

    const updateCartAndRequest = useMemo(
        () => updateCartAndRequestFactory(cartID, userID),
        [cartID, userID]
    )

    useEffect(() => {
        const getInitialItems = async () => {

            const item = localStorage.getItem(localStorageKey)
            if (item) {
                let parsedDocument: Timed<ILocaleStorageData>;
                parsedDocument = JSON.parse(item);

                if (Date.now() - parsedDocument.timestamp < ms('1h')) {
                    const { timestamp, ...rest } = parsedDocument;
                    setCartProducts(rest.products);
                    setCartID(rest.cartID ?? 0);
                    return;
                }
            }

            const cartResponse: CartsResponse = await (await fetch(generateGetCartRequest(userID))).json();
            const products = (cartResponse.carts?.[0]?.products ?? []).map(product => product.id)
            setCartProducts(products);

            setCartID(cartResponse.carts?.[0]?.id ?? 0);
            saveDataToLocaleStorage({ products, cartID: cartResponse.carts?.[0]?.id ?? 0 });
            return;
        }

        getInitialItems();
    }, [userID])


    return useMemo(() => ({
        getItemsID: () => cartProducts,

        addItem: async (itemID: number) => {
            const newCartList = cartProducts
                .concat(itemID)

            updateCartAndRequest(newCartList, (cartData) => {
                setCartProducts(newCartList);
                if (cartID === 0) {
                    setCartID(cartData.id);
                }
                saveDataToLocaleStorage({ products: newCartList });

            });
        },

        removeItem: async (itemID: number) => {
            const remainingProductList = cartProducts.filter(id => id !== itemID)

            updateCartAndRequest(remainingProductList, () => {
                setCartProducts(remainingProductList);
                saveDataToLocaleStorage({ products: remainingProductList });
            });
        }
    }), [cartProducts])
}

export default useUserCart;