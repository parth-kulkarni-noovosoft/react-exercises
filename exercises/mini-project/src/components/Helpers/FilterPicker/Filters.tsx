import {observer} from "mobx-react";
import React from "react";
import {Input} from "reactstrap";
import {FilterOptions, FilterTypes, IFilter, IFilterSelectOptions} from "../../../interfaces";
import FilterPickerStore from "../../../stores/FilterPickerStore";
import Select from "../Inputs/Select";

interface IFilterProps {
    filter: IFilter
    filterPickerStore: FilterPickerStore
    filterConfig: FilterOptions
    onChange: (data: string | number | boolean) => void
}

@observer
class Filter extends React.Component<IFilterProps> {
    render(): React.ReactNode {
        const {
            filter,
            filterPickerStore,
            filterConfig,
            onChange
        } = this.props;
        const TextInput = (
            <Input
                type="text"
                value={filterPickerStore.filters[filter.name].value as string}
                onChange={(e) => {
                    filterPickerStore.updateFilterValue(filter.name, e.target.value);
                    onChange(e.target.value);
                }}
            />
        );

        const SelectInput = (
            <Select
                isDisabled={false}
                onChange={(value) => {
                    filterPickerStore.updateFilterValue(filter.name, value)
                    onChange(value);
                }}
                value={filterPickerStore.filters[filter.name].value as string}
                options={(filterConfig as IFilterSelectOptions).options}
            />
        );

        const NumberInput = (
            <Input
                type="number"
                value={filterPickerStore.filters[filter.name].value as string}
                onChange={(e) => {
                    filterPickerStore.updateFilterValue(filter.name, e.target.value);
                    onChange(e.target.value);
                }}
            />
        )

        const BooleanInput = (
            <Input
                type="checkbox"
                checked={filterPickerStore.filters[filter.name].value as boolean}
                onChange={(e) => {
                    filterPickerStore.updateFilterValue(filter.name, e.target.checked);
                    onChange(e.target.checked);
                }}
            />
        )

        const inputTypeMap = {
            [FilterTypes.BOOLEAN]: BooleanInput,
            [FilterTypes.TEXT]: TextInput,
            [FilterTypes.NUMBER]: NumberInput,
            [FilterTypes.SELECT]: SelectInput,
        }

        const inputElement = inputTypeMap[filter.type];

        if (!inputElement) {
          throw new Error('New FilterType, not found in InputTypeMap');
        }

        return (<>
            <div>{filterConfig.displayName}</div>
            {inputElement}
        </>)
    }
}

export default Filter;