import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homeSlice';
import AppContainer from './components/AppContainer.jsx';
import '../css/home.scss';

const store = configureStore({
    reducer: homeReducer
});

export default class Home extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <AppContainer />
            </Provider>
        )
    }
};