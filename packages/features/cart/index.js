import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isError: false,
    cartContent: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.cartContent.push(action.payload);
        },
        clearCart(state) {
            state.cartContent= [];
        },
        removeItemFromCart: (state, action) => {
            const itemId = action.payload;
            const index = state.cartContent.findIndex(item => item.id === itemId);
            if (index !== -1) {
                state.cartContent.splice(index, 1);
            }
        }
    }

});


export const {addToCart, clearCart, removeItemFromCart} = cartSlice.actions;
export default cartSlice.reducer;