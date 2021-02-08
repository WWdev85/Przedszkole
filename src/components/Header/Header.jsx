import React from 'react';

import bemCssModules from 'bem-css-modules';

import{default as HeaderStyles} from './Header.module.scss';

const style = bemCssModules(HeaderStyles);

const Header = () =>{

    return(
        <header className={style()}>    
            <img className={style('logo')} src="./images/gamecarver_logo.svg" alt="logo"/>
        </header>
    ) ;   
}

export default Header;