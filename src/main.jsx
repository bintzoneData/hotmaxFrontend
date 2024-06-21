import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './screens/home/Home.jsx';
import { MainProvider } from './context/MainContext.jsx';
import SelectedHome from './screens/SelectedHome/SelectedHome.jsx';

import ProductView from './screens/productView/ProductView.jsx';

import ShopingCart from './screens/ShopingCart/ShopingCart.jsx';
import Profile from './screens/profile/Profile.jsx';
import Login from './screens/profile/Login.jsx';
import Register from './screens/profile/Register.jsx';
import { AuthGuard, OrderGuard, LoginGuard } from './guards/Guards.jsx';
import ComfrimEmail from './screens/profile/ComfrimEmail.jsx';
import Orders from './screens/profile/profile/Orders.jsx';
import OrdersView from './screens/profile/profile/OrdersView.jsx';
import { FsmProvider } from './context/Fsm.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={<LoginGuard />}>
        <Route path='/login' element={<Login />} />
      </Route>
      <Route path='/singup' element={<Register />} />
      <Route path='/confirmEmail/:token' element={<ComfrimEmail />} />
      <Route path='/' element={<App />}>
        <Route path='/' element={<Home />} />
        <Route path='/products/:type' element={<SelectedHome />} />
        <Route path='/products/:type/:name' element={<ProductView />} />
        <Route path='/cart' element={<ShopingCart />} />
        <Route path='/' element={<AuthGuard />}>
          <Route path='/me' element={<Profile />} />
          <Route path='/orders' element={<OrderGuard />}>
            <Route path='/orders' element={<Orders />} />
            <Route path='/orders/:id' element={<OrdersView />} />
          </Route>
        </Route>
      </Route>
    </>
  )
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <FsmProvider>
      <MainProvider>
        <RouterProvider router={router} />
      </MainProvider>
    </FsmProvider>

    <ToastContainer />
  </HelmetProvider>
);
