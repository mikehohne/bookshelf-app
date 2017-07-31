import React, { Component } from 'react';
import BookList from './BookList'
import { Route } from 'react-router-dom'
import './App.css';
import * as BooksAPI from './utils/BooksAPI'

class App extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <BookList books={this.state.books}
           />
        )}/>
      </div>
    );
  }
}

export default App;
