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
        <h1>My Bookshelf</h1>
        <ul className='books-list'>
          {books.map((book) =>(
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
