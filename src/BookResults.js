import React, { Component } from 'react'
import { Button, Glyphicon, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class BookResults extends Component {

  state = {
    results: this.props.result
  }

  handleError = () => {
    return <h1>Err</h1>
  }

  render() {


    const { result } = this.props
    let error = 'Error'

    if(result.error) {
      console.log('Hello')
    }

    return (
      <div>
        <ul>
          {result.map((bookResult) => (
              <li key={bookResult.id}>{bookResult.title}</li>
          ))}
        <h4>Search Results = {result.length}</h4>
        </ul>
      </div>
    )
  }

}

export default BookResults
