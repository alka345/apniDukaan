import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import WishlistSlice from "./WishlistSlice";

export const Store = configureStore({
    reducer :{
        cart : CartSlice,
        wishlist:WishlistSlice
    },
    devTools : true
})