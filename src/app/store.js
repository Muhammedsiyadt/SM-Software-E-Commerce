// 29-04-2023 Athul Vinod
import productSlice from './Product/productSlice';
import productsReducer from './Products/productsSlice'
import { configureStore } from '@reduxjs/toolkit';
import similarProductsSlice from './SimilarProducts/similarProductsSlice';
import brandsSlice from './Brands/brandsSlice';
import catSlice from './category/catSlice';
import loginSlice from './auth/loginSlice';
import registerSlice from './auth/registerSlice';
import userSlice from './auth/userSlice';
import cartSlice from './Cart/cartSlice';
import addCartSlice from './Cart/addCartSlice';





const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productSlice,
    similarProducts: similarProductsSlice,
    brands: brandsSlice,
    cat: catSlice,
    login: loginSlice,
    register: registerSlice,
    user: userSlice,
    cart: cartSlice,
    addCart: addCartSlice
  }
});

export default store;