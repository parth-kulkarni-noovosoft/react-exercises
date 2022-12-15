import { action, makeObservable, observable } from "mobx";
import { IFilter } from "../interfaces";

class FilterPickerStore {
    @observable value = '';
    @observable filterOptions: { name: string, value: string }[] = [];
    @observable filters: Record<string, IFilter> = {}

    constructor() {
        makeObservable(this);
    }

    @action setValue = (value: string) => this.value = value;

    @action addFilter = (filter: IFilter) => {
        this.filters[filter.name] = filter;
        this.removeFilterOption(filter.name);
        this.setValue('');
    };

    @action updateFilterValue = (filterName: string, value: string | number | boolean) =>
        this.filters[filterName].value = value;

    @action updateFilterOptions = (filterOptions: { name: string, value: string }[]) => this.filterOptions = filterOptions;

    @action removeFilterOption = (name: string) => this.filterOptions.splice(
        this.filterOptions.findIndex(filter => filter.value === name),
        1
    )

    getFormattedFilters = () => Object.values(this.filters).reduce((acc, cur) => ({ ...acc, ...{ [cur.name]: cur.value } }), {})
}

export default FilterPickerStore;