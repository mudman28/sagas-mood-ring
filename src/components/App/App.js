import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import ImageCard from '../ImageCard/ImageCard';



class App extends Component {
  state ={
    page: 1
  }

  handlePrevious = () => {
    if(this.state.page === 1){
      this.setState({
        page: 1
    }) 
    }
    else{
        this.setState({
            page: this.state.page - 1
        })
    }
  }
    handleNext = () => {
      if(this.state.page === 5){
        this.setState({
          page: 1
      }) 
      }
      else{
          this.setState({
              page: this.state.page + 1
          })
      }
    }
  componentDidMount(){
    this.props.dispatch({ type: 'GET_IMAGES' })
    this.props.dispatch({ type: 'GET_TAGS' })
}

  // Renders the entire app on the DOM
  render() {
    let page = this.state.page
    return (
      <div className="App">
        <Header />
          <div className="row">
            <div className="column1">
              <div className = "container1">
                  <button className="btn btn2" onClick={this.handlePrevious}>Previous</button>
              </div>
            </div>
            <div className="column2">

              {this.props.imageList.map((image, i) => {
                if(image.id === page)
                return(
                  
                  <ImageCard key ={i}
                    imageId={image.id}
                    imageTitle={image.title}
                    imagePath={image.path} 
                  />
                )
              })}
            </div>
            <div className="column3">
              <div className = "container2">
                  <button className="btn btn2" onClick={this.handleNext}>Next</button>
              </div>
            </div>
          </div>
        
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  imageList : reduxState.images
})

export default connect(mapStateToProps)(App);
