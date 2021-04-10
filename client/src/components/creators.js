import React, { Component } from 'react';
import './creators.css';




class Creators extends Component {

  constructor() {
    super();
    this.state = {
      creators: []
    };
  }

  componentDidMount() {
    fetch('/api/creators')
      .then(res => res.json())
      .then(creators => this.setState({creators}, () => console.log('Customers fetched...', creators)));
  }



  render() {
    return (
      <div>
        <h2>Creators</h2>
        <ul>
        {this.state.creators.map(creator =>
          <li key={creator.id}>{creator.firstName} {creator.lastName}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Creators;
