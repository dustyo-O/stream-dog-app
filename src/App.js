import React, { Component } from 'react';
import './App.css';

import DogSelect from './components/DogSelect/DogSelect'

class App extends Component {
  constructor() {
    super();

    this.dogImage = React.createRef();
  }

  render() {
    return (
      <div className="App">
        <DogSelect onChange={this.onChange.bind(this)}></DogSelect>
        <img ref={this.dogImage} className="App-DogImage" src=""/>
      </div>
    );
  }

  onChange(e) {
    console.log(e);
    fetch('https://dog.ceo/api/breed/' + e.value + '/images/random')
      .then(res => res.json())
      .then(json => {
        const image = json.message;
        console.log(image);
        this.dogImage.current.src = image;
      })
  }
}

export default App;
