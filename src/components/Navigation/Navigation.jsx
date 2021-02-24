import  React, { useEffect, useState, useRef, useContext }  from 'react';
import { StoreContext } from '../../store/storeProvider';
import { Link ,HashRouter as Router } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import {default as NavigationStyles} from './Navigation.module.scss';

const style = bemCssModules(NavigationStyles);

export const Navigation = ({reference}) => {
    
    const navigation = useRef();

    const {groups} = useContext(StoreContext);

    if(!groups){
        return null;
    }

    const handleClickLink = () =>{

        navigation.current.classList.remove('navigation-active');
        reference.current.classList.remove('header__menu-active');
    }

    const links = groups.map(group =>
        <Link className={style('link')} onClick={handleClickLink} key={group.id} to={`/grupy/${group.name}`}>{group.name}</Link> 
    );
    return (
         <nav className={style()} ref={navigation} >
             <ul className={style('list')}>
                <li className={style('listItem')}>
                    <div className={style('link')+" "+style('link-container')}  >Aktualności
                        <div className={style('sublinks')}>
                            <Link className={style('link')} onClick={handleClickLink} to={'/aktualnosci/jadlospis'}>Jadłospis</Link>
                            <Link className={style('link')} onClick={handleClickLink} to={'/aktualnosci/ogloszenia'}>Ogłoszenia</Link>
                        </div>   
                    </div>
                </li>
                <li className={style('listItem')}> 
                    <div className={style('link')+" "+style('link-container')}  >O nas
                        <div className={style('sublinks')}>
                            <Link className={style('link')} onClick={handleClickLink} to={'/onas/kadra'}>Kadra</Link>
                            <Link className={style('link')} onClick={handleClickLink} to={'/onas/misjaiwizja'}>Misja i wizja</Link>
                        </div>   
                    </div>
                </li>
                <li className={style('listItem')}>
                    <div className={style('link')+" "+style('link-container')}  >Grupy
                        <div className={style('sublinks')}>
                            {links}
                        </div>   
                    </div>
                </li>
                <li className={style('listItem')}>
                    <Link className={style('link')} onClick={handleClickLink} to={'/rekrutacja'}>Rekrutacja</Link>
                </li>
                <li className={style('listItem')}>
                     <Link className={style('link')} onClick={handleClickLink} to={'/kontakt'}>Kontakt</Link>   
                </li>
             </ul>
        </nav>
    )
    
};



