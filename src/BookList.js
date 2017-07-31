import React, { Component } from 'react'
import { Button, InputGroup } from 'react-bootstrap'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
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
    const { books } = this.props
    const { query, filter } = this.state


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
            <button
              className='btn btn-success'>
              <i className='glyphicon glyphicon-search'></i>
            </button>
          </InputGroup>
        </div>
        <ul className='books-list'>
          {showingBooks.map((book) =>(
            <li key={book.id} className='list-group-item'>
                <h2 className='list-group-item-heading'>{book.title}</h2>
                <p className='list-group-item-text'>{book.subtitle}</p>
                <img className='img-thumbnail' src={book.imageLinks.thumbnail} alt='bookThumb' />
              {book.authors.map((author) => (
                <p key={author} className='list-group-item-text'>{author}</p>
              ))}
              <br />
              <a href={'https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=' + book.title}>
                <button className='btn btn-success'>Purchase</button>
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

}

export default BookList
