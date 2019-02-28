import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './config/store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const app = <Provider store={store}>
    <MuiThemeProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MuiThemeProvider>
</Provider>

ReactDOM.render(app, document.getElementById('root'));

