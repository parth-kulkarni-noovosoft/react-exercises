const BASE_URL = 'https://dummyjson.com';

export enum RequestMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'PATCH',
    DELETE = 'delete'
}

class Networking {
    static cache: Record<string, unknown> = {};

    static async fetchData<T extends unknown>(
        method: RequestMethod,
        url: string,
        options: RequestInit
    ) {
        const res = await fetch(`${BASE_URL}/${url}`, { method, ...options });
        const data = await res.json();
        if (!res.ok) throw data;
        return data as T;
    }

    static async getData<T extends unknown>(query: string, headers?: HeadersInit) {
        if (query in this.cache) {
            return this.cache[query] as T;
        }
        const data = await Networking.fetchData<T>(RequestMethod.GET, query, { headers });
        this.cache[query] = data;
        return data;
    }
}

export default Networking;