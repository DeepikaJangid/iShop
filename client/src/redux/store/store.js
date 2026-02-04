import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "@/redux/reducers/CartReducer";
import CategoryReducer from "@/redux/reducers/CategoryReducer";
import UserReducer from "@/redux/reducers/UserReducer";

const store = configureStore(
    {
        reducer: {
            "cart": CartReducer,
            "category": CategoryReducer,
            "user": UserReducer,
        }
    }
)

export default store;