import {createAction, handleActions} from 'redux-actions';
// action types

const INIT = 'baggage/INIT';
const SET_LINE_LENGTH='baggage/SET_LINE_LENGTH';
const SET_MAX_WEIGHT='baggage/SET_MAX_WEIGHT';
const SET_BAGGAGE_LIST='baggage/SET_BAGGAGE_LIST';
// action creators

export const init = createAction(INIT);
export const setLineLength=createAction(SET_LINE_LENGTH);
export const setMaxWeight=createAction(SET_MAX_WEIGHT);
export const setBaggageList=createAction(SET_BAGGAGE_LIST);

// initial state
const initialState = {
    lineLength: 0,
    maxWeight: 0,
    baggageList: ""
};

// reducer
export default handleActions({
    [init]: (state, action) => initialState,
    [SET_LINE_LENGTH]: (state, action) => {
        return { ...state,lineLength: action.payload };
    },
    [SET_MAX_WEIGHT]: (state, action) => {
        return {  ...state,maxWeight: action.payload };
    },
    [SET_BAGGAGE_LIST]: (state, action) => {
        return {  ...state,baggageList: action.payload };
    },
}, initialState);
