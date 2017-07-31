import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { InputGroup, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  static styles = {
    display: ''
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  }



  render() {
    const { books, onGetBookById } = this.props
    const { query } = this.state
    console.log(books);

    let showingBooks
    if(query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title))
    } else {
      showingBooks = books
    }

    showingBooks.sort(sortBy('name'))

    return (
      <div className='list-group'>
        <h1>My Bookshelf</h1>
        <div className="input-group">
          <InputGroup>
            <input
              className='search-input'
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
              name='queryInput'
              placeholder='Search Books' />
              <Button>
                <i className='glyphicon glyphicon-search'></i>
              </Button>
          </InputGroup>
        </div>
        <ul className='books-list'>
          <h4>{showingBooks.length === 0 && (
            <h5>Get More Results</h5>
          )}</h4>
          {showingBooks.map((book) => (
            <li key={book.id} className='list-group-item'>
                <h2 className='list-group-item-heading'>{book.title}</h2>
                <p className='list-group-item-text'>{book.subtitle}</p>
                <Link to='/book'>
                  <img
                    className='img-thumbnail'
                    src={book.imageLinks.thumbnail}
                    alt='bookThumb'
                    onClick={() => onGetBookById(book.id)}
                    />
                  </Link>
                  <h2>{book.shelf.replace(/([A-Z])/g, ' $1')}</h2>
              {book.authors.map((author) => (
                <p key={author} className='list-group-item-text'>{author}</p>
              ))}
              <br />
              <Button>Buy</Button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

}

export default BookList
