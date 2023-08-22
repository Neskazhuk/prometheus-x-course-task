import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'components/button/Button';
import { useBookContext } from 'BookContext';
import { useCartContext } from 'CartContext';
import errorImg from 'assets/images/error.jpg';
import './Specific-book.css'

function SpecificBook() {
  const { cartItems, setCartItems } = useCartContext();
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const { books } = useBookContext();
  const book = books.find(book => book.id === parseInt(id));
  
  const saveCartToLocalStorage = cartItems => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };
  
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, [setCartItems]);
  
  const cartItem = cartItems.find(item => item.id === book.id);

  useEffect(() => {
    if (cartItem) {
      setCount(1);
      calculateTotal(1);
    } else if (book) {
      setCount(1);
      calculateTotal(1);
    }
  }, [cartItem, book]);

  const handleCountChange = event => {
    let countValue = parseInt(event.target.value);

    if (countValue < 1 || countValue > 42) {
      countValue = 1;
    }

    calculateTotal(countValue);
    setCount(countValue);
  };

  const calculateTotal = countValue => {
    if (book) {
      const bookPrice = parseFloat(book.price);
      const newTotal = countValue ? bookPrice * countValue : 0;
      setTotal(newTotal);
    }
  };

  const handleAddToCart = () => {
    const existingCartItem = cartItems.find(item => item.id === book.id);

    if (existingCartItem) {
      const updatedCart = cartItems.map(item =>
        item.id === book.id ? { ...item, quantity: item.quantity + count } : item
      );

      setCartItems(updatedCart);
      saveCartToLocalStorage(updatedCart);
    } else {
      const item = {
        id: book.id,
        title: book.title,
        quantity: count,
        price: book.price,
        image: book.image,
      };

      const updatedCart = [...cartItems, item];
      setCartItems(updatedCart);
      saveCartToLocalStorage(updatedCart);
      }
  };

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <>
      <section>
        <div className="specificbook-container">
          <div className="img-box box">
            <img
              className="img"
              src={book.image || errorImg}
              style={book.image ? {} : { objectFit: 'cover', width: '100%' }}
              alt={book.title}
            />
          </div>
          <div className="desc-box box">
            <div>
              <h2>{book.title}</h2>
              <p>by {book.author}</p>
              <p>Level: {book.level}</p>
              <p>Tags: {book.tags.join(', ')}</p>
            </div>
            <div>
              <p className="desc-row">
                <mark>Description: </mark>
              </p>
              <p>{book.description}</p>
            </div>
          </div>
          <div className="order-box box">
            <div className="form-wrapper">
              <form>
                <div>
                  <p>Price</p>
                  <label htmlFor="count">Count</label>
                  <p>Total price</p>
                  <p>Added to cart</p>
                </div>
                <div>
                  <p>${book.price}</p>
                  <input
                    type="number"
                    name="book_quantity"
                    data-testid="count-input"
                    id="count"
                    value={count}
                    min="1"
                    max="42"
                    onChange={handleCountChange}
                    required
                  />
                  <p data-testid="total-price">${total.toFixed(2)}</p>
                  <p>{cartItem ? cartItem.quantity : 0}</p>
                  <Button
                    className="add"
                    name="Add to cart"
                    onClick={handleAddToCart}
                    type="button"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default SpecificBook;


