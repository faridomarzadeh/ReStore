export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CounterState
{
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC (Yet Another Redux Counter)'
}

export function increment(amount = 1)
{
    return {
        type: INCREMENT_COUNTER,
        payload: amount
    }
}
export function decrement(amount = 1)
{
    return {
        type: DECREMENT_COUNTER,
        payload: amount
    }
}

interface CounterAction
{
    type: string;
    payload: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function counterReducer(state=initialState, action: CounterAction)
{
    switch(action.type)
    {
        case INCREMENT_COUNTER:
            return {
                ...state,
                data : state.data + action.payload
            }
        case DECREMENT_COUNTER:
            return {
                ...state,
                data: state.data - action.payload
            }
        default:
            return state
    }
}