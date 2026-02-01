import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "@/redux/reducers/ProductReducer";
import CategoryReducer from "@/redux/reducers/CategoryReducer";
import UserReducer from "@/redux/reducers/UserReducer";

const store = configureStore(
    {
        reducer: {
            "product": ProductReducer,
            "category": CategoryReducer,
            "user": UserReducer,
        }
    }
)

export default store;