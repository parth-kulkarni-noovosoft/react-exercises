import ms from "ms"
import { Timed } from "../types"

export const isStale = <T = unknown>(timedData: Timed<T>, maxAge = ms('1h')) => {
    if (!timedData) return true;
    return Date.now() - timedData.timestamp > maxAge;
}