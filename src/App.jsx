import React from 'react';
import StoreProvider from './store/storeProvider';

import './App.scss';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import { Switch , HashRouter as Router, Route} from 'react-router-dom';
import Hangman from './components/Hangman/Hangman';
import Saper from './components/Saper/Saper'

const App = () => ( 
    <StoreProvider>
        <Header />
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Menu />} />
                <Route path="/wisielec" render={() => <Hangman />} />
                <Route path="/saper" render={() => <Saper />} />
            </Switch>
        </Router>
    </StoreProvider>
    
);

export default App;