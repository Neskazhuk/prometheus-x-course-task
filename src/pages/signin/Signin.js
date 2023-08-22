import React, { useState } from 'react';
import { useUserContext } from 'UserContext';
import { useAuthContext } from 'AuthContext';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { routes } from 'routing/AppRoutes';
import Button from 'components/button/Button';
import avatar from 'assets/images/avatar.png';
import './Signin.css';

function Signin() {
  const navigate = useNavigate();
  const { username, setUsername } = useUserContext();
  const { isAuth, setIsAuth } = useAuthContext();
  const [showUsernameMessage, setShowUsernameMessage] = useState(false);

  const handleChange = e => {
    setUsername(e.target.value);

    if (username.length >= 4 || username.length <= 16) {
      setShowUsernameMessage(false);
    }
  };

  const handleSignIn = e => {
    e.preventDefault();

    if (username.length >= 4 && username.length <= 16) {
      localStorage.setItem('username', username);
      localStorage.setItem('isAuth', 'true');
      setIsAuth(true);
      navigate(routes.booklist);
    } else {
      setShowUsernameMessage(true);
    }
  };

  if (isAuth) {
    return <Navigate to={routes.booklist} />;
  }

  return (
    <section>
      <div className="page-container">
        <Link to={routes.signin}>
          <img className="avatar" src={avatar} alt="User avatar" />
        </Link>
        <form onSubmit={handleSignIn}>
          <div className="input-container">
            <label htmlFor="username-label" className="username-label">
              {username}
            </label>
            <input
              className="username-input"
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              value={username}
              placeholder="Please type your name"
              maxLength={20}
            />
            <Button name="Sign-in" onClick={handleSignIn} className={'big'} />
            {showUsernameMessage && (
              <p class="username-message">Please use from 4 to 16 characters</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default Signin;
