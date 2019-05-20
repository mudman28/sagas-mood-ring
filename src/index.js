import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';
import axios from 'axios';

const allImages = []

// Create the rootSaga generator function
function* rootSaga() {
    console.log('imageData');
    yield takeEvery('GET_IMAGES', getImages);
    yield takeEvery('GET_TAGS', getTags);
    yield takeEvery('ADD_TAGS', addTags);
    yield takeEvery('NEW_TAGS', getNewTags)
}

function* getImages(action){
    try{
        const elementsResponse = yield axios.get(`/api/images`);
        yield put({ type: 'SET_IMAGES', payload: elementsResponse.data });
    }catch(err){
        console.log('Error in GET IMAGES request:', err);
    };
}

function* getTags(action){
    try{
        const elementsResponse = yield axios.get(`/api/tags`);
        yield put({ type: 'SET_TAGS', payload: elementsResponse.data });
    }catch(err){
        console.log('Error in GET TAGS request:', err);
    };
}

function* addTags(action){
    try{
        yield axios.post('/api/images/addtag', action.payload);
        yield put({type:'NEW_TAGS'});
    }catch(err){
        console.log('Error in POST addTags request:', err);
    };
}

function* getNewTags() {
    try{
        const elementsResponse = yield axios.get('/api/images/addtag');
        yield put({ type: 'NEW_TAGS', payload: elementsResponse.data })
    }catch(err){
        console.log('Error in GET NEW TAGS request:', err);
    };
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();



// Used to store images returned from the server
const images = (state = allImages, action) => {
    switch (action.type) {
        case 'SET_IMAGES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the images tags (e.g. 'Inspirational', 'Calming', 'Energy', etc.)
const tags = (state = [], action) => {
    console.log();
    
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
}
const newTags = (state=[], action) => {
    console.log('in newTags', action.payload);
    switch(action.type) {
        case 'NEW_TAGS':
            return action.payload
        default:
            return state
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        images,
        tags,
        newTags
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
