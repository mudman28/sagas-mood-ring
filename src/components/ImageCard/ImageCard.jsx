import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ImageCard.css'; 
//import MaterialUI stuff
//import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
//import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Typography from '@material-ui/core/Typography';




class ImageCard extends Component {

    componentDidMount(){
        console.log();
        
        this.props.dispatch({ type: 'GET_IMAGES' })
        this.props.dispatch({ type: 'GET_TAGS' })
    }

    handleFavClick = (event) => {
 
    };


    render() {
        console.log('SEE ME:', this.props.imageList);
        console.log('TAG ME:', this.props.tagList);
        return (
            <div>
                <p>{}</p>
                <Card className="moodCard">
                    <CardActionArea>
                        <CardMedia>
                            <img src={this.props.link} alt="pic"/>
                            
                        </CardMedia>
                
                    </CardActionArea>
                </Card>
                <p>Tags: </p> 
                <select className="tagSelect">
                    <option value="" disabled selected>Select Tag</option> 
                    {this.props.tagList.map(tags =>{
                        return(
                            <option value={tags.id}>{tags.name}</option>
                        )
                    })}   
                </select>
            </div>
        );
    }

}


const mapStateToProps = reduxState => ({
    imageList : reduxState.images,
    tagList : reduxState.tags
})

export default connect(mapStateToProps)(ImageCard);