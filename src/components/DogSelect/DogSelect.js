import React, { Component } from 'react';
import './DogSelect.css';

import Select from 'react-select'

const REACT_APP_TRANSLATE_API_KEY = process.env.REACT_APP_TRANSLATE_API_KEY;

class DogSelect extends Component {
  constructor(props) {
    super(props);

    //this.props = props;

    this.state = { breeds: [] };

    let breedList;

    fetch('https://dog.ceo/api/breeds/list/all')
      .then(res => res.json())
      .then(json => {
        breedList = Object.keys(json.message);

        return fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' +
            REACT_APP_TRANSLATE_API_KEY +
            '&text=' + breedList.join('&text=') +
            '&lang=en-ru'
          )
      })
      .then(res => res.json())
      .then(json => json.text.map(
          (breed, index) => ({
            value: breedList[index],
            label: breed.slice(0, 1).toUpperCase() + breed.slice(1)
          })
        ).sort((a, b) => a.label > b.label)
      )
      .then(breeds => this.setState({ breeds }));
  }

  render() {
    return (
      <div className="DogSelect">
        <Select
          className="DogSelect-Select"
          options={this.state.breeds}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }

  onChange(e) {
    this.props.onChange(e);
  }
}

export default DogSelect;
