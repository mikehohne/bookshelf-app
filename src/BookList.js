import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }
  render() {
    const { books } = this.props
    console.log(books)
    return (
      <div className='list-group'>
        <ul className='books-list'>
          {books.map((book) =>(
            <li key={book.id} className='list-group-item'>
                <h2 className='list-group-item-heading'>{book.title}</h2>
                <p className='list-group-item-text'>{book.subtitle}</p>
                <img src={book.imageLinks.thumbnail} alt='bookThumb' />
              {book.authors.map((author) => (
                <p key={author} className='list-group-item-text'>{author}</p>
              ))}
            </li>
          ))}
        </ul>
      </div>
    )
  }

}

export default BookList
