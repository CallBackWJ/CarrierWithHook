import {createAction, handleActions} from 'redux-actions';

// action types

const INIT = 'baggage/INIT';
const INCREASE = 'baggage/INCREASE';
const DECREASE = 'baggage/DECREASE';


// action creators

export const init = createAction(INIT);
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);




// initial state
const initialState = {
 num:0,
};

// reducer
export default handleActions({
    [init]: (state, action) => initialState,
    [INCREASE]: (state, action) => {
        return state.set("num", state.get('num')+1);
    },
    [DECREASE]: (state, action) => {
        return state.set("num", state.get('num')-1);
    },
}, initialState);
