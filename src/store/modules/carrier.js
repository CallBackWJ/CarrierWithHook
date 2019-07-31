import {createAction, handleActions} from 'redux-actions';

// action types

const INIT = 'carrier/INIT';
const INCREASE = 'carrier/INCREASE';
const DECREASE = 'carrier/DECREASE';


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
        return { num: state.num + 1 };
      
    },
    [DECREASE]: (state, action) => {
        return { num: state.num - 1 };
    },
}, initialState);
