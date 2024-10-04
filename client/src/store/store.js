import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice';
import AdminProductsSlice from './admin/products-slice';
import shopProductsSlice from './shop/products-slice';
import shopCartSlice from './shop/cart-slice';
import addressSlice from "./shop/address-slice";
import shopSearchSlice from "./shop/search-slice";
import reviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./common-slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: AdminProductsSlice,
        shopProducts: shopProductsSlice,
        shopCart: shopCartSlice,
        shopAddress: addressSlice,
        shopSearch: shopSearchSlice,
        shopReview: reviewSlice,
        commonFeature: commonFeatureSlice,
    }
});

export default store;