import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartReducer";

export default store = configureStore({
    reducer: {
        cart: cartReducer,
    }
})