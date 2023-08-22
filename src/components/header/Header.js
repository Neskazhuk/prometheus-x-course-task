import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from 'UserContext';
import { useAuthContext } from 'AuthContext';
import { routes } from 'routing/AppRoutes';
import cart from 'assets/images/cart.png';
import ava from 'assets/images/ava.jpg'
import Button from 'components/button/Button';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const { username, setUsername } = useUserContext();
  const { isAuth, setIsAuth } = useAuthContext();

  function handleSignOut() {
    setUsername('');
    setIsAuth(false);
    localStorage.removeItem('username');
    localStorage.removeItem('isAuth');
    navigate(routes.signin);
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedIsAuth = localStorage.getItem('isAuth');

    if (storedUsername && storedIsAuth === 'true') {
      setUsername(storedUsername);
      setIsAuth(true);
    }
  }, [setUsername, setIsAuth]);

  return (
    <header>
      <div className="header-container">
        <span className="logo">
          <Link to={routes.home}>WHAT-A-BOOK STORE / Serhii Didukh</Link>
        </span>
        <div className="menu">
          {isAuth && (
            <>
              <Link to={routes.cart}>
                <img src={cart} alt="Cart" width="40" />
              </Link>
              <Button name="Sign-out" onClick={handleSignOut} />
              <Link to={routes.home}>
                <img src={ava} alt="User avatar" width="40" />
              </Link>
              <p className="username">{username}</p>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
