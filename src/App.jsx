import React, { useContext }from 'react';
import { StoreContext } from './store/storeProvider';

import './App.scss';

import { Switch , HashRouter as Router, Route} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { MainPage } from './components/MainPage/MainPage';
import { AdminPanel }from './components/AdminPanel/AdminPanel';
import { TeacherPanel }from './components/TeacherPanel/TeacherPanel';
import { Footer } from './components/Footer/Footer';
import { Advertisements } from './components/Advertisements/Advertisements';
import { Meals } from './components/Meals/Meals';
import { Staff } from './components/Staff/Staff';
import { Mission } from './components/Mission/Mission';
import { Group } from './components/Group/Group';



const App = () => {
    const { groups, loggedUser, advertisements} = useContext(StoreContext);

    if(!groups){
        return null;
    }

    const groupsRoute = groups.map( group => <Route path={`/grupy/${group.name}`} key={group.id} render={() => <Group group={group} key={group.id}/>}></Route>);

    
    const groupId = loggedUser? loggedUser.group : null;
    const group = groups.find(group => group.id === groupId);
   

    return( 
    
        <Router>
            <Header />
            <Switch>
                 <Route path="/" exact render={() => <MainPage />} />
                 <Route path="/aktualnosci/ogloszenia" render={() => <Advertisements advertisements = {advertisements} />} />
                 <Route path="/aktualnosci/jadlospis" render={() => <Meals />} />
                 <Route path="/onas/kadra" render={() => <Staff />} />
                 <Route path="/onas/misjaiwizja" render={() => <Mission />} />
                 <Route path="/panel-administratora" render={() => <AdminPanel />} />
                 {group? <Route path={`/panel-nauczyciela/${group.name}`} render={() => <TeacherPanel group={group}  />} /> : null}
                 {groupsRoute}       
            </Switch>
            <Footer/>
        </Router>
   
    
)};

export default App;