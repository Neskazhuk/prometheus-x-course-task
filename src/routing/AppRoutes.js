import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import Signin from 'pages/signin/Signin';
import SpecificBook from 'pages/specific-book/Specific-book';
import Booklist from 'pages/book-list/Booklist';
import Cart from 'pages/cart/Cart';
import NotFound from 'pages/notfound/NotFound';
import Purchased from 'pages/purchased/Purchased';

export const routes = {
  home: '/',
  signin: '/signin',
  booklist: '/booklist',
  specificBook: '/booklist/specificbook/:id',
  cart: '/cart',
  purchased: '/purchased',
};

export default function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path={routes.signin} element={<Signin />} />
        <Route path={routes.home} element={<Signin />} />
        <Route path={routes.booklist} element={<Booklist />} />
        <Route path={routes.specificBook} element={<SpecificBook />}/>
        <Route path={routes.cart} element={<Cart />} />
        <Route path={routes.purchased} element={<Purchased />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}


