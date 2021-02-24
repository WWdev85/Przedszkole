import React from 'react';
import StoreProvider from './store/storeProvider';

import './App.scss';

import { Switch , HashRouter as Router, Route} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { MainPage } from './components/MainPage/MainPage'
import { AdminPanel }from './components/AdminPanel/AdminPanel';
import { Footer } from './components/Footer/Footer';


const App = () => ( 
    
    <StoreProvider>
        
        <Router>
            <Header />
            <Switch>
                 <Route path="/" exact render={() => <MainPage />} />
                 <Route path="/panel-administratora" render={() => <AdminPanel />} />
            </Switch>
            <Footer/>
        </Router>
    </StoreProvider>
    
);

export default App;