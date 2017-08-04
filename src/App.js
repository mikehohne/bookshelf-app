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
    query: '',
    maxResults: 10,
    results: []

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

  searchForTerms(query,maxResults){
    BooksAPI.search(query,maxResults)
      .then((results) => {
        if(results.error) {
          console.error('Invalid Search Term');
        }
        this.setState({
          results: results,
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <BookList
            results={this.state.results}
            books={this.state.books}
            onGetBookById={(bookId) => {
              this.getBookById(bookId)
            }}
            onSearch={(query,maxResults) => {
              this.searchForTerms(query,maxResults)
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
