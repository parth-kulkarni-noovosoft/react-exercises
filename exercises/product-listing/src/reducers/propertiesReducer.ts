import { Reducer } from "react";
import { IPropertiesState } from "../typings";

export enum PropertyChangeEvents {
    QUERY = 'query',
    CATEGORY = 'category',
}

export type PropertiesReducerAction = {
    type: PropertyChangeEvents;
    payload: string
}

const propertiesReducer: Reducer<IPropertiesState, PropertiesReducerAction> = (state, action) => {
    return {
        ...state,
        [action.type]: action.payload
    }
}

export default propertiesReducer;