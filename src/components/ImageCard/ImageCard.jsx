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
    state ={
        tags_id : ''
    }


    handleTagChange =(event)=> {
        console.log(event.target.value);
        this.setState({
            tags_id : event.target.value
        })
    }

    handleAddTag =(event)=> {
        console.log(event.target.value);
        this.props.dispatch({type: 'ADD_TAGS', payload: this.state})
    }

    render() {
        console.log('SEE ME:', this.props.imageList);
        console.log('TAG ME:', this.props.tagList);
        return (
            <div>
                <h1>{this.props.imageTitle}</h1>
                <Card className="moodCard">
                    <CardActionArea>
                        <CardMedia>
                            <img src={this.props.imagePath} alt="pic"/>
                            
                        </CardMedia>
                
                    </CardActionArea>
                </Card>
                <h3>Tags: {this.props.tagName}</h3> 
                <select className="tagSelect" onChange={this.handleTagChange}>
                    <option value="" disabled selected>Select Tag</option> 
                    {this.props.tagList.map(tags =>{
                        return(
                            <option value={tags.id}>{tags.name}</option>
                        )
                    })}   
                </select>
                <button className="addTag" onClick={this.handleAddTag}>Apply Tag</button>
            </div>
        );
    }

}


const mapStateToProps = reduxState => ({
    tagList : reduxState.tags
})

export default connect(mapStateToProps)(ImageCard);