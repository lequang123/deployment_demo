import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    gridData: 'abc'
};
const tableSlice = createSlice({
    name: 'table',
    initialState: initialState,
    reducers: {
        setData: (state, action) => {
            state.gridData = action.payload;
        }
    }
});

const { actions, reducer } = tableSlice;

export const {
    setData
} = actions;

export default reducer;