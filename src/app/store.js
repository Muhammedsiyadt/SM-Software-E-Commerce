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
import addressSlice from './Address/addressSlice';
import addAddressSlice from './Address/addAddressSlice';
import updateProfileSlice  from './Profile/profileUpdateSlice';
import removeAddressSlice  from './Address/removeSlice';
import singleAddressSlice from './Address/singleAddressSlice';
import updateAddressSlice from './Address/updateAddressSlice';
import ordersSlice  from './Orders/OrdersSlice';
import addOrderSlice  from './Orders/AddOrderSlice';
import cancelOrderSlice  from './Orders/CancelSlice';
import socialAuthSlice from './auth/socialAuthSlice';
import forgotPassSlice  from './Password/forgotSlice';
import tokenSlice  from './Password/verifyTokenSlice';
import resetSlice from './Password/resetSlice';
import contactSlice from './Contact/contactSlice';




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
    recommentProduct: recommentProductsHomeSlice,
    address: addressSlice,
    addAddress: addAddressSlice,
    updateProfile: updateProfileSlice,
    removeAddress: removeAddressSlice,
    singleAddress : singleAddressSlice,
    updateAddress: updateAddressSlice,
    orders: ordersSlice,
    addOrder: addOrderSlice,
    cancelOrder: cancelOrderSlice,
    socialAuth: socialAuthSlice,
    forgotPassword: forgotPassSlice,
    token: tokenSlice,
    reset: resetSlice,
    contact: contactSlice
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;