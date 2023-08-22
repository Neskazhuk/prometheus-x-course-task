import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'routing/AppRoutes';
import { useBookContext } from 'BookContext';
import errorImg from 'assets/images/error.jpg';
import './Booklist.css';

const Booklist = () => {
  const {books} = useBookContext();
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('all');

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleSortOptionChange = e => {
    setSortOption(e.target.value);
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedBooks = filteredBooks
    .filter(book => {
    if (sortOption === 'cheap') {
      return book.price <= 15;
    } else if (sortOption === 'medium') {
      return book.price > 15 && book.price <= 30;
    } else if (sortOption === 'expensive') {
      return book.price > 30;
    }
    return true;
  })
  .sort((a, b) => {
      if (sortOption === 'cheap' || sortOption === 'medium') {
        return a.price - b.price;
      } else if (sortOption === 'expensive') {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <section className="main-container">
      <div className='filters'>
        <input
          className="search-input"
          type="text"
          onChange={handleSearchInputChange}
          placeholder="Search by book its name"
        />
        <select name="price" id="price" value={sortOption} required onChange={handleSortOptionChange}>
          <option value="all">All</option>
          <option value="cheap">from 0 to $15</option>
          <option value="medium">$15-$30</option>
          <option value="expensive">$30 and more</option>
        </select>
      </div>
      <section className="book-container">
        {sortedBooks.length === 0 ? (
          <div className="not-found">Couldn't find that one 😬</div>
        ) : (
          sortedBooks.map(book => (
            <article className="book-info" key={book.id}>
              <div className="cover-container">
                <Link to={routes.specificBook.replace(':id', book.id)}>
                  <img
                    className="book-cover"
                    src={book.image || errorImg}
                    alt={book.title}
                    style={book.image ? {} : { objectFit: 'cover' }}
                  />
                </Link>
              </div>
              <div className="desc-container">
                <div className="desc-content">
                  <h2 className="book-title">{book.title}</h2>
                  <p>by {book.author}</p>
                </div>
                <div className="price-row">
                  <p>
                    <b>Price ${book.price}</b>
                  </p>
                  <Link className="btn" to={routes.specificBook.replace(':id', book.id)}>
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </section>
  );
};

export default Booklist;
