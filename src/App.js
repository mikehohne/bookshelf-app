import React, { Component } from 'react';
import BookList from './BookList'
import BookCard from './BookCard'
import { Route } from 'react-router-dom'
import './App.css';
import * as BooksAPI from './utils/BooksAPI'

class App extends Component {
  state = {
    books: [],
    book: [],
    query: [],
    maxResults: 0

  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  getBookById(id){
    BooksAPI.get(id).then((id) => {
      this.setState({ book: id })
    })
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <BookList
            books={this.state.books}
            onGetBookById={(bookId) => {
              this.getBookById(bookId)
            }}
           />
        )}/>
        <Route path='/book' render={() => (
          <BookCard
            book={this.state.book}
          />
        )}/>
      </div>
    );
  }
}

export default App;
