import React from 'react'
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';

const Layout = (props) => {
  return (
    <>
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </>
  );
}

export default Layout
