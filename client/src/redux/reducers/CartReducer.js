const { createSlice } = require("@reduxjs/toolkit");

const CartSlice = createSlice({
    name: 'Cart',
    initialState: {
        data: [],
        final_total: 0,
        original_total: 0
    }, //initialstate at the start is current_state
    reducers: {
        lsToCart(current_state, { payload }) {
            const lsCart = localStorage.getItem('cart');
            if (lsCart) {
                const cart = JSON.parse(lsCart);
                current_state.data = cart.data;
                current_state.final_total = cart.final_total;
                current_state.original_total = cart.original_total;
            }
        }, // yeh function user refresh maarega to data ko delete nahi karega
        addToCart(current_state, { payload }) {
            const { id, imageURL, name, final_price, original_price } = payload;

            current_state.data.push({ id, imageURL, name, final_price, original_price, qty: 1 }) //push this data into current_state along with the existing data in the state.
            current_state.final_total += final_price; //if user adds new items total of those items should be added to the total along with the existing data available in the card. This will be managed on total shown on website header.
            current_state.original_total += original_price; //same as final_total
            localStorage.setItem('cart', JSON.stringify(current_state)); //after above operations are performed, save everything to localstorage.
            //why save in localstorage? => so that even if user refreshes the page the data won't get deleted.
            // Redux manages the website's shared data while the website is running. Redux manages data that is used by many parts of the website while the website is running.
            // localStorage saves data in the browser so it stays even after the website is closed.

            // DIF BETWEEN LOCAL_STORAGE, CACHE, COOKIES, AND SESSION.
            // localStorage saves browser data permanently, 
            // sessionStorage saves data only while a tab is open, 
            // cookies store small pieces of data shared with the server(often for login), 
            // and cache stores website files to make pages load faster. 
        }, //is function ko call karwate time jo data diya jayega woh hai payload, jo currently is state mein data pada hai woh hogya current_state.
        removeFromCart(current_state, { payload }) {
            const { id, final_price, original_price, qty } = payload;
            const afterRemoval = current_state.data.filter((item) => item.id !== id); //jiski id item.id se match nahi ho rahi woh data new array ke andar nahi rahega. mtlab ki jis product ko user remove karna chahta hai uski item.id == id hai to data new array mein nahi jayega. nahi jayega to cartListing se remove ho jayega.
            current_state.data = afterRemoval;
            current_state.final_total -= final_price * qty;
            current_state.original_total -= original_price * qty;
            localStorage.setItem('cart', JSON.stringify(current_state));
        },
        changeQuantity(current_state, { payload }) {
            const { id, flag, original_price, final_price } = payload;
            const itemFound = current_state.data.find((pid) => pid.id == id);

            if (!itemFound) return;

            if (flag == 1) { // increase
                itemFound.qty++;
                current_state.final_total += final_price;
                current_state.original_total += original_price;
            } else { // decrease
                if (itemFound.qty === 1) {
                    // remove item completely
                    current_state.data = current_state.data.filter(item => item.id !== id); // jiski item.id == id se match nahi kr rahi woh  item cart mein nahi hoga, to descrease function run nahi hoga.
                    current_state.final_total -= final_price;
                    current_state.original_total -= original_price;
                } else {
                    itemFound.qty--;
                    current_state.final_total -= final_price;
                    current_state.original_total -= original_price;
                }
            }
            localStorage.setItem('cart', JSON.stringify(current_state));
        },
        emptyCart(current_state) {
            current_state.data = [];
            current_state.final_total = 0;
            current_state.original_total = 0;
            localStorage.removeItem('cart');
        },
    },
})

export const { lsToCart, addToCart, removeFromCart, changeQuantity, emptyCart } = CartSlice.actions; //actions = functions
export default CartSlice.reducer;