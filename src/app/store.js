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
import updateCartSlice from './Cart/updateCartSlice';
import removeCartSlice from './Cart/removeCartSlice';
import addWishlistSlice from './Wishlist/addListActionSlice';
import wishListSlice from './Wishlist/wishListSlice';
import removeWishListSlice from './Wishlist/removeWishlistSlice';
import reviewSlice from './review/reviewSlice';
import addReviewSlice from './review/addReviewSlice';
import removeReviewSlice from './review/deleteReviewSlice';
import singleReviewSlice from './review/singleReviewSlice';
import updateReviewSlice from './review/updateReviewSlice';
import featuredProductsHomeSlice from './featuredProducts/featuredProductSlice';
import recommentProductsHomeSlice from './recommentProducts/recommentProductsSlice';










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
    addCart: addCartSlice,
    updateCart: updateCartSlice,
    removeCart: removeCartSlice,
    addWishList: addWishlistSlice,
    wishList: wishListSlice,
    removeWishList: removeWishListSlice,
    review: reviewSlice,
    addReview: addReviewSlice,
    removeReview: removeReviewSlice,
    singleReview: singleReviewSlice,
    updateReview: updateReviewSlice,
    featuredProducts: featuredProductsHomeSlice,
    recommentProduct: recommentProductsHomeSlice
  },
  devTools: true
});

export default store;