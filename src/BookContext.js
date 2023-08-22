import React, { createContext, useContext, useEffect, useState } from 'react';
import data from './data.json';

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(data.books);
  }, []);

  return <BookContext.Provider value={{ books, setBooks }}>{children}</BookContext.Provider>;
}
