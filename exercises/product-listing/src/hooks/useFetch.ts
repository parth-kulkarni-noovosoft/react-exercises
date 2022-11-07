import { useEffect, useRef, useState } from "react";
import { isStale } from "../utils";

interface Cache<T> {
  [url: string]: {
    data: T
    timestamp: number
  }
}

interface IUseFetchOptions {
  cacheValidFor: number
}

const useFetch = <T = unknown>(url: string, opts?: RequestInit & IUseFetchOptions) => {
  const cache = useRef<Cache<T>>({});

  const [toReturnState, setToReturnState] = useState<T | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (!url) return;

      if (cache.current[url]) {
        if (!isStale(cache.current[url], opts?.cacheValidFor)) {
          return setToReturnState(cache.current[url].data);
        }
      }

      const response = await (await fetch(url, opts)).json() as T;
      cache.current[url] = {
        data: response,
        timestamp: Date.now()
      };
      setToReturnState(response);
    }

    getData().catch(e => console.error(e));
  }, [url])

  return toReturnState;
}

export default useFetch;