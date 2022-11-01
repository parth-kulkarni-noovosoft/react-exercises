import React, { ChangeEventHandler, useContext, useState } from "react";
import { Currency, LocaleContext, Locale } from "./localeContext";

const formatterFactory = (currency: Currency, locale: Locale) => {
    const { format } = new Intl.NumberFormat(locale, { style: 'currency', currency });
    return format;
}

interface ILocaleCurrencyProps {
    amount: number;
}

const ContextViaUseContext: React.FC<ILocaleCurrencyProps> = ({ amount }) => {
    const { currency, locale } = useContext(LocaleContext);
    const format = formatterFactory(currency, locale);
    return <div className="box">Context Via Use Context: <strong>{format(amount)}</strong></div>
}

class ContextViaClass extends React.Component<ILocaleCurrencyProps> {
    declare context: React.ContextType<typeof LocaleContext>
    static contextType = LocaleContext;

    render() {
        const { currency, locale } = this.context;
        const format = formatterFactory(currency, locale);
        return <div className="box">Context Via Class: <strong>{format(this.props.amount)}</strong></div>
    }
}

const ContextViaConsumer: React.FC<ILocaleCurrencyProps> = ({ amount }) => {
    return (
        <LocaleContext.Consumer>
            {({ currency, locale }) => {
                const format = formatterFactory(currency, locale);
                return (
                    <div className="box">
                        Context via consumer: <strong>{format(amount)}</strong>
                    </div>
                )
            }}
        </LocaleContext.Consumer>
    )
}

const ContextAccessorElements: React.FC = () => {
    const [localeState, setLocaleState] = useState<{
        locale: Locale,
        currency: Currency
    }>({
        currency: Currency.USD,
        locale: Locale["en-US"]
    });

    const amount = 1234242.2342;

    const handleLocaleChange: ChangeEventHandler<HTMLSelectElement> = e => {
        setLocaleState({
            ...localeState,
            locale: e.target.value as Locale
        })
    }

    const handleCurrencyChange: ChangeEventHandler<HTMLSelectElement> = e => {
        setLocaleState({
            ...localeState,
            currency: e.target.value as Currency
        })
    }

    return <div className="container main">
        <div className="box">
            <label htmlFor="locale">Choose Locale</label>
            <br />
            <select name="locale" id="locale" onChange={handleLocaleChange} value={localeState.locale}>
                <option value="en-US">en-US</option>
                <option value="de-DE">de-DE</option>
            </select>
            <br />
            <label htmlFor="currency">Choose Currency</label>
            <br />
            <select name="currency" id="currency" onChange={handleCurrencyChange} value={localeState.currency}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="JPY">JPY</option>
            </select>
        </div>
        <LocaleContext.Provider value={localeState} >
            <div className="box">
                <div>
                    <div>
                        <div>
                            {/* Assuming this is a deeply nested object*/}
                            <ContextViaUseContext amount={amount} />
                            <ContextViaClass amount={amount} />
                            <ContextViaConsumer amount={amount} />
                        </div>
                    </div>
                </div>
            </div>
        </LocaleContext.Provider>
    </div>
}

export default ContextAccessorElements;
