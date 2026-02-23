import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice(
    {
        name: "product",
        initialState: {
            data: null,
        },
        reducers: {
            setData(current_state, { payload }) {
                // current_state.data = payload.user;
                // localStorage.setItem("user", JSON.stringify(payload.user));
                current_state.data = payload.user ?? null; // if payload.user is either null or undefined, then assign null instead.
                if (payload.user) {
                    localStorage.setItem("user", JSON.stringify(payload.user));
                } else {
                    localStorage.removeItem("user"); // or localStorage.setItem("user", null);
                }
            },
            lstoUser(current_state) { //data fir se get karna
                const lsUserData = localStorage.getItem("user");
                if (lsUserData && lsUserData !== "undefined") {
                    current_state.data = JSON.parse(lsUserData);
                }
            },
            logout(current_state) {
                current_state.data = null;
                localStorage.removeItem('user');
            }
        }
    }
)

export const { setData, lstoUser, logout } = UserSlice.actions; //actions = functions

export default UserSlice.reducer;