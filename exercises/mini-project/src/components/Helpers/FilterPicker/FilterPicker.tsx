import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Button } from "reactstrap";
import { IFilterPickerProps } from "../../../interfaces";
import FilterPickerStore from "../../../stores/FilterPickerStore";
import Select from "../Inputs/Select";
import Filter from "./Filters";

@observer
class FilterPicker extends React.Component<IFilterPickerProps> {
    public fps: FilterPickerStore;

    constructor(props: IFilterPickerProps) {
        super(props);
        this.fps = new FilterPickerStore();

        this.fps.updateFilterOptions([
            { name: 'Pick a Filter', value: '' },
            ...Object.entries(this.props.configuration)
                .map(([filterName, filter]) => ({
                    name: filter.displayName,
                    value: filterName
                }))
        ]);
    }

    render(): React.ReactNode {
        return (<>
            <div>Filter</div>
            <div className="d-flex">
                <Select
                    isDisabled={false}
                    onChange={(value) => this.fps.setValue(value)}
                    value={this.fps.value}
                    options={this.fps.filterOptions}
                />
                <Button
                    onClick={() => this.fps.addFilter({
                        name: this.fps.value,
                        type: this.props.configuration[this.fps.value].type,
                        value: ''
                    })}
                    disabled={this.fps.value === ''}
                >
                    Add
                </Button>
            </div>
            {Object.values(this.fps.filters).map((filter) => (
                <Filter
                    key={filter.name}
                    filter={filter}
                    filterConfig={this.props.configuration[filter.name]}
                    filterPickerStore={this.fps}
                    onChange={() => this.props.onChange?.(this.fps.getFormattedFilters())}
                />
            ))}
        </>)
    }
}

export default FilterPicker;