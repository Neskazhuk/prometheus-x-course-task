import React, { useState, useEffect } from "react";
import './PriceCalculator.css';

export const PriceCalculator = () => {
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        fetch('data.json')
            .then((response) => response.json())
            .then((data) => setPrice(data.books.price))
            .catch((error) => console.log('Error fetching data:', error));
    }, []);

    const handleCountChange = (event) => {
      let countValue = parseInt(event.target.value);

      if (countValue < 1 || countValue > 42) {
          countValue = 0;
      }
      
      setCount(countValue);
    };

    const total = price * 100 * count / 100;

    return (
      <>
        <p>{price}</p>
        <input
          type="number"
          name="book_quantity"
          id="count"
          value={count}
          min="0"
          max="42"
          onChange={handleCountChange}
          required
        />
        <p>${total.toFixed(2)}</p>
      </>
    );
};
