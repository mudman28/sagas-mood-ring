import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import ImageCard from '../ImageCard/ImageCard';
import PreviousButton from '../PreviousButton/PreviousButton'
import NextButton from '../NextButton/NextButton'

class App extends Component {

  componentDidMount(){
    console.log();
    this.props.dispatch({ type: 'GET_IMAGES' })
    this.props.dispatch({ type: 'GET_TAGS' })
}
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
              {this.props.imageList.map((image) => {
                return(
                  <ImageCard key={image.id} 
                  imageID={image.id} imageTitle={image.title} 
                  imagePath={image.path} tagName={image.name}
                  />
                )
              })}
            </div>
            <div className="column3">
              <NextButton />
            </div>
          </div>
        
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  imageList : reduxState.images,
})

export default connect(mapStateToProps)(App);
