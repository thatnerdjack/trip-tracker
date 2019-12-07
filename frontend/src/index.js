import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import './custom.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux"
import store from "./store"

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
