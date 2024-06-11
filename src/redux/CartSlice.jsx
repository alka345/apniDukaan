import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('Cart')) ?? [];

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {
        addToCart(state, action){
            state.push(action.payload)            
        },
        deleteFromCart(state,action){
            return state.filter(item => item.id != action.payload.id);
        }
    }
})

export const {addToCart, deleteFromCart} = CartSlice.actions;

export default CartSlice.reducer;

// wishlist
// const initial = JSON.parse(localStorage.getItem('Wishlist')) ?? [];

// const wishlistSlice = createSlice({
//     name: 'wish',
//     initial,
//     reducers : {
//         addToWish(state, action){
//             state.push(action.payload)            
//         },
//         deleteFromWish(state,action){
//             return state.filter(item => item.id != action.payload.id);
//         }
//     }
// })

// export const {addToWish, deleteFromWish} = CartSlice.actions;

// export { wishlistSlice}
