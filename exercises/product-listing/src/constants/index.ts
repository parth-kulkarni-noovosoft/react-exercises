export const API_URL = 'https://dummyjson.com'

export const Routes = {
    user: (userID: number) => `${API_URL}/users/${userID}?select=id,firstName,lastName`,
    users: () => `${API_URL}/users?limit=100&select=firstName`,

    categories: () => `${API_URL}/products/categories`,

    cart: (cartID: number) => `${API_URL}/carts/${cartID}`,
    cartAdd: () => `${API_URL}/carts/add`,
    userCarts: (userID: number) => `${API_URL}/carts/user/${userID}`,

    product: (productID: number) => `${API_URL}/products/${productID}`,
    productSearch: (query: string) => `${API_URL}/products/search?q=${query}&limit=100`
}