import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';
import StoreProvider from './store/storeProvider.jsx';

const rootElement = document.getElementById('root');

if(rootElement){
    ReactDOM.render(<StoreProvider><App/></StoreProvider>, rootElement);
}