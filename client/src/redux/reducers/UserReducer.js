import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice(
    {
        name: "product",
        initialState: {
            data: null,
        },
        reducers: {
            setData(current_state, { payload }) {
                current_state.data = payload.user;
                localStorage.setItem("user", JSON.stringify(payload.user)); //data local storage mein save karna
            },
            lstoUser(current_state) { //data fir se get karna
                const lsUserData = JSON.parse(localStorage.getItem("user"));
                if (lsUserData) {
                    current_state.data = lsUserData
                }
            }
        }
    }
)

export const { setData, lstoUser } = UserSlice.actions; //actions = functions

export default UserSlice.reducer;