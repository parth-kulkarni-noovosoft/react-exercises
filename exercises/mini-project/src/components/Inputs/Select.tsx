import React from "react";
import { Input } from "reactstrap";

type TSelectOptions = string[] | { name: string, value: string }[]

interface ISelectProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    isDisabled: boolean
    options: TSelectOptions
    invalid?: boolean
}

const Select: React.FC<ISelectProps> = ({ isDisabled, onChange, value, options, invalid }) => {
    const convertToOptionsArray = (options: TSelectOptions): React.ReactNode[] => {
        if (options.length === 0) {
            return [];
        }

        if (typeof options[0] === 'string') {
            return (options as string[]).map(o => (
                <option key={o} value={o}>{o}</option>
            ))
        }

        return (options as { name: string, value: string }[]).map(o => (
            <option key={o.value} value={o.value}>{o.name}</option>
        ))
    }

    return (
        <Input
            type="select"
            value={value}
            onChange={onChange}
            disabled={isDisabled}
            invalid={invalid}
        >
            {convertToOptionsArray(options)}
        </Input>
    )
}

export default Select;