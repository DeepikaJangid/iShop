import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice(
    {
        name: "product",
        initialState: {
            data: [],
            imageURL: ""
        },
        reducers: {
            getAllData() { },
            getActiveData() { },
            getHomeData() { },
        }
    }
)

export const { getAllData, getActiveData, getHomeData } = ProductSlice.actions; //actions = functions

export default ProductSlice.reducer;