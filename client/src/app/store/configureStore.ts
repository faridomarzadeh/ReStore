import { createStore } from "redux"
import counterReducer from "../../features/contact/CounterReducer"

export default function configureStore(){
    return createStore(counterReducer);
}