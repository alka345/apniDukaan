import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('wishlist')) ?? [];

const WishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers : {
        addToWishlist(state, action){
            state.push(action.payload)            
        },
        deleteFromWishlist(state,action){
            return state.filter(item => item.id != action.payload.id);
        },
       
    }
})

export const {addToWishlist, deleteFromWishlist} = WishlistSlice.actions;

export default WishlistSlice.reducer;



