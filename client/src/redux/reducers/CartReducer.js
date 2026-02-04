const { createSlice, original } = require("@reduxjs/toolkit");

const CartSlice = createSlice({
    name: 'Cart',
    initialState: {
        data: [],
        final_total: 0,
        original_total: 0
    }, //initialstate at the start is current_state
    reducers: {
        addToCart(current_state, { payload }) {
            const { pId } = payload;
        }, //is function ko call karwate time jo data diya jayega woh hai payload, jo currently is state mein data pada hai woh hogya current_state.
        removeFromCart() { },
        changeQuantity() { },
        emptyCart() { },
    }
})

export const { addToCart, removeFromCart, changeQuantity, emptyCart } = CartSlice.actions; //actions = functions
export default CartSlice.reducer;