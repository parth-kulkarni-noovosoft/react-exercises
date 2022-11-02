import { Reducer } from "react";
import { IPropertiesState } from "../typings";

export enum PropertyChangeEvents {
    QUERY = 'query',
    CATEGORY = 'category',
    USERID = 'userID'
}

export type PropertiesReducerAction = {
    type: PropertyChangeEvents.CATEGORY | PropertyChangeEvents.QUERY;
    payload: string
} | {
    type: PropertyChangeEvents.USERID;
    payload: number
}

const propertiesReducer: Reducer<IPropertiesState, PropertiesReducerAction> = (state, action) => {
    return {
        ...state,
        [action.type]: action.payload
    }
}

export default propertiesReducer;