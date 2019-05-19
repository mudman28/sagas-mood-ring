import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import ImageCard from '../ImageCard/ImageCard';
import PreviousButton from '../PreviousButton/PreviousButton'
import NextButton from '../NextButton/NextButton'

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Header />
          <div className="row">
            <div className="column1">
              <PreviousButton />
            </div>
            <div className="column2">
              <ImageCard />
            </div>
            <div className="column3">
              <NextButton />
            </div>
          </div>
        
      </div>
    );
  }
}

export default App;
