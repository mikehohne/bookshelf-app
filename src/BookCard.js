import React, { Component } from 'react'
import { Button, Glyphicon, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class BookCard extends Component {
  render(){
    const { book } = this.props

    let buy = 'Buy'
    let rate = 'Rate'
    return (
      <div>
        <br/>
        <Link to='/'>
          <Glyphicon glyph='chevron-left' bsSize='lg'><h4>Back</h4></Glyphicon>
        </Link>
        <h1>Description</h1>
        <h4>{book.title}</h4>
        <h4>Publisher {book.publisher}</h4>
        <h5>Date Published {book.publishedDate}</h5>
        <div className='container'>
          <p>{book.description}</p>
        </div>
        {book.shelf !== 'read' || book.shelf !== 'currentlyReading' && (
          <Button to='#'>{rate}</Button>
        )}
          <Button to='#'>{buy}</Button>
      </div>
    )
  }
}

export default BookCard;
