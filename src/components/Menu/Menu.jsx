import React ,{useContext} from 'react';
import { Link ,HashRouter as Router } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import { StoreContext } from '../../store/storeProvider';

import {default as MenuStyles} from './Menu.module.scss' 

const style = bemCssModules(MenuStyles);


const Menu = () => {

    const { games }  = useContext(StoreContext);
    
    const gamesList = games.map( game => <li key={game} className={style('list-item')}><Link className={style('name')} to={`/${game}`}>{game}</Link></li>);

    return(
        <Router> 
            <section className={style()}>
                <h1 className={style('title')}>Menu</h1>
                <ul className={style('list')}>
                    {gamesList}
                </ul>
            </section>    
        </Router>
    );    
}

export default Menu;