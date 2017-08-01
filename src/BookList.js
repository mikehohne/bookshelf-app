import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { InputGroup, Button, Form, DropdownButton, ButtonGroup, MenuItem, FormControl, Glyphicon, FormGroup } from 'react-bootstrap'
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

    let showingBooks
    if(query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title))
    } else {
      showingBooks = books
    }

    showingBooks.sort(sortBy('name'))
    return (
      <div className='container'>
        <h3>Bookshelf</h3>
          <div className="input-group">
            <form>
              <FormGroup>
                <InputGroup bsSize='lg'>
                  <InputGroup.Addon>
                    <Glyphicon glyph="search" />
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    placeholder='Search'
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}/>
                </InputGroup>
              </FormGroup>
            </form>
          </div>
            {showingBooks.length === 0 && (
              <div className='get-more-results'>
                <Button bsSize='lg'>Get More Results</Button>
              </div>
            )}
          <ul className='books-list'>
            {showingBooks.map((book) => (
              <li key={book.id} className='list-group-item'>
                  <h4 className='list-group-item-heading'>{book.title}</h4>
                  <p className='list-group-item-text'>{book.subtitle}</p>
                  <Link to='/book'>
                    <img
                      className='img-fluid'
                      src={book.imageLinks.thumbnail}
                      alt='bookThumb'
                      onClick={() => onGetBookById(book.id)}
                      />
                    </Link>
                    <br />
                    {book.authors.map((author) => (
                      <p key={author} className='list-group-item-text'>{author}</p>
                    ))}
                    <br />
                    <ButtonGroup>
                      <DropdownButton title={
                        book.shelf
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, function(str){ return str.toUpperCase()
                      })}>
                        <MenuItem eventKey="1">
                          Currently Reading
                        </MenuItem>
                        <MenuItem eventKey="2">
                          Want To Read
                        </MenuItem>
                        <MenuItem eventKey="3">
                          Read
                        </MenuItem>
                      </DropdownButton>
                    </ButtonGroup>
                <br />
                {book.shelf.includes('wantToRead') && (
                  <div>
                    <br/>
                    <Button className='link-to-buy'>
                      <a href={'https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=' +book.title} target='_blank'>Buy</a>
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
      </div>

    )
  }

}
//
// <input
//   value={query}
//   onChange={(event) => this.updateQuery(event.target.value)}
//   name='queryInput'
//   placeholder='Search Books'
// />

export default BookList
