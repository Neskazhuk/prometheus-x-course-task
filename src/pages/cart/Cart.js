import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'components/button/Button';
import { routes } from 'routing/AppRoutes';
import cart from 'assets/images/cart.png';
import err from 'assets/images/error.jpg';
import { useCartContext } from 'CartContext';
import './Cart.css'

function Cart() {
  const { cartItems, setCartItems, removeFromCart } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);
  
  const handleBuyButton = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
    navigate(routes.purchased);
  }

  return cartItems.length > 0 ? (
    <section className="fullcart-container">
      <div className="order-container">
        <table className="table">
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td><img src={item.image || err} alt={item.title} style={{width: '60px', height:'80px'}} /></td>
                <td>{item.title}</td>
                <td>Count: {item.quantity}</td>
                <td>Total: ${(item.quantity * item.price).toFixed(2)}</td>
                <td>
                  <Button name="remove" onClick={() => removeFromCart(item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          <strong>
            For all: $
            {cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}
          </strong>
        </p>
        <Button className="buy" name="Buy" onClick={handleBuyButton} />
      </div>
    </section>
  ) : (
    <section className="page-container">
      <figure>
        <img src={cart} alt="Empty cart" />
        <figcaption>Nothing to read yet</figcaption>
      </figure>
      <Link className="find btn" to={routes.booklist}>
        Find a book
      </Link>
    </section>
  );
}

export default Cart
