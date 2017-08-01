import React, { Component } from 'react'
import { Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class BookCard extends Component {
  render(){
    const { book } = this.props
    return (
      <div>
        <br/>
        <Link to='/'>
          <Glyphicon glyph='chevron-left' bsSize='lg' />
        </Link>
        <h1>Description</h1>
        <h4>{book.title}</h4>
        <h4>Publisher {book.publisher}</h4>
        <h5>Date Published {book.publishedDate}</h5>
        <div className='container'>
          <p>{book.description}</p>
        </div>
        <Button to='#'>Buy</Button>
      </div>
    )
  }
}

export default BookCard;
