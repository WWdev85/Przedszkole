import React from 'react';
import StoreProvider from './store/storeProvider';

import './App.scss';

import { Switch , HashRouter as Router, Route} from 'react-router-dom';


const App = () => ( 
    <StoreProvider>
        
        <Router>
        <div>  sadasd  </div>
            <Switch>
               
            </Switch>
        </Router>
    </StoreProvider>
    
);

export default App;