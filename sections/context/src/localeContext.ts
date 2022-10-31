import { createContext } from "react";

export enum Locale {
    'de-DE' = 'de-DE',
    'en-US' = 'en-US'
}

export enum Currency {
    EUR = 'EUR',
    JPY = 'JPY',
    USD = 'USD'
}

export const LocaleContext = createContext({
    locale: Locale["en-US"],
    currency: Currency.USD
})