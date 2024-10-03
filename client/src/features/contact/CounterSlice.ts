import { createSlice } from "@reduxjs/toolkit";
export interface CounterState
{
    data: number;
    title: string
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC (Yet Another Redux Counter from Redux Toolkit)'
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incrementCounter: (state, action) => {
            state.data += action.payload
        },
        decrementCounter: (state, action) => {
            state.data -= action.payload
        }
    }
})

export const { incrementCounter, decrementCounter} = counterSlice.actions