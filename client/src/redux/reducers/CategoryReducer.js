import { createSlice } from "@reduxjs/toolkit";

const CategoryReducer = createSlice(
    {
        name: "category",
        initialState: {
            data: [],
            imageURL: ""
        },
        reducers: {
            //current_state it this {data: [], imageURL: ""}
            setData(current_state, { payload }) {
                current_state.data = payload.data;
                current_state.imageURL = payload.imageURL;
                //data and imageURL both the keys are coming from header.jsx in website
            }
        }
    }
)

export const { setData } = CategoryReducer.actions; //actions = functions

export default CategoryReducer.reducer;