import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import '../styles/app.css';
import Home from './components/Home';


ReactDOM.render(
    <Router>
        <Home/>
    </Router>,
    document.getElementById('root')
);