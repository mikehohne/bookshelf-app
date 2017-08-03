import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  InputGroup,
  Button,
  DropdownButton,
  ButtonGroup,
  MenuItem,
  FormControl,
  Glyphicon,
  FormGroup,
  Grid,
  Row,
  Col,
  Thumbnail,
  Image
  } from 'react-bootstrap'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    query: '',
    newShelf: []
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  }

  clearQuery = (query) => {
    this.setState({
      query: ''
    })
  }

  handleChange = (event) => {
    this.setState({
      newShelf: event.target.value
    })
  }



  render() {
    console.log(this.state.newShelf);
    const { books, onGetBookById } = this.props
    const { query, newShelf } = this.state

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
        <br/>
        <h3 className='app-title'>The Bookshelf</h3>
        <Image src='http://www.clipartpal.com/_thumbs/pd/household/furniture/book_shelf.png' />
        <div className="search-group">
          <form>
            <FormGroup>
              <InputGroup bsSize='lg'>
                <InputGroup.Addon>
                  <Glyphicon glyph="search" />
                </InputGroup.Addon>
                <FormControl
                  type="text"
                  placeholder='Search Books'
                  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}/>
              </InputGroup>
            </FormGroup>
          </form>
        </div>
            {showingBooks.length === 0 && (
              <div className='get-more-results'>
                <Button bsSize='lg' onClick={this.clearQuery}>Show All</Button>
              </div>
            )}
        <Grid>
          <Row>
            {showingBooks.map((book) => (
              <Col xs={6} md={4} key={book.id}>
                <Thumbnail src={book.imageLinks.thumbnail} className='thumbnail' onClick={() => onGetBookById(book.id)} alt="242x200">
                  <h3>{book.title}</h3>
                  <p>{book.subtitle}</p>
                  {book.authors.map((author) => (
                    <p key={author} className='list-group-item-text'>{author}</p>
                    ))}
                    <br/>
                    <div className='button-group'>
                      <Link to='/book'>
                        <Button bsStyle="default">More</Button>&nbsp;
                      </Link>
                      <ButtonGroup id='DropdownButton'>
                        <DropdownButton id={book.id} value={newShelf} title={book.shelf}>
                          <MenuItem eventKey='1' value='currentlyReading' onClick={this.handleChange}>Currently Reading</MenuItem>
                          <MenuItem eventKey='2' value='wantToRead'>Want To Read</MenuItem>
                          <MenuItem eventKey='3' value='read'>Read</MenuItem>
                        </DropdownButton>
                      </ButtonGroup>
                    </div>
                  </Thumbnail>
                </Col>
            ))}
          </Row>
        </Grid>
      </div>
    )
  }
}


export default BookList
