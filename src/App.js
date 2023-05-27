// 29-04-2023 Athul Vinod


import { Route, Switch } from 'wouter'

// Pages
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';



// CSS

import './assets/css/App.css'
import './assets/css/global.css'
import ProductsPage from './pages/Products/ProductsPage';
import Slug from './pages/Product/Slug';
import CartPage from './pages/Cart/CartPage';
import WishListPage from './pages/WishList/WishListPage';
import CheckOutPage from './pages/Checkout/CheckOutPage';
import TermsPage from './pages/Terms/TermsPage';
import PrivacyPage from './pages/Privacy/PrivacyPage';
import RefundPage from './pages/Refund/RefundPage';
import AboutPage from './pages/About/AboutPage';
import NotFound from './pages/NotFound';
import ContactPage from './pages/Contact/ContactPage';
import RegisterPage from './pages/Register/RegisterPage';
import UserDashboardPage from './pages/UserDashboard/UserDashboardPage';
import UserOrdersPage from './pages/UserOrders/UserOrdersPage';
import UserProfilePage from './pages/UserProfile/UserProfilePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserAddressPage from './pages/UserProfile/UserAddressPage';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';

function App() {
  return (
    <>
     <ToastContainer />
      <Switch>

        {/* Default Pages */}

        <Route path={`/`} component={HomePage} />
        <Route path='/products' component={ProductsPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/product/:id'>
          {(params) => <Slug id={params.id} />}
        </Route>
        <Route component={TermsPage} path='/terms-of-use' />
        <Route component={PrivacyPage} path='/privacy-policy' />
        <Route component={RefundPage} path='/refund-policy' />
        <Route component={AboutPage} path='/about' />
        <Route component={ContactPage} path='/contact' />

        {/* Protected Pages */}

        <Route path='/cart' component={CartPage} />
        <Route path='/wishlist' component={WishListPage} />
        <Route path='/checkout' component={CheckOutPage} />
        <Route path='/user/dashboard' component={UserDashboardPage} />
        <Route path='/user/orders' component={UserOrdersPage} />
        <Route path='/user/profile' component={UserProfilePage} />
        <Route path='/user/address' component={UserAddressPage} />
        <Route path='/success/:id' >
           {(params) => <OrderSuccess id={params.id} />}
          </Route>
        <Route path="/:rest*">
          <NotFound />
        </Route>
      </Switch>
      
    </>
  )
}

export default App
