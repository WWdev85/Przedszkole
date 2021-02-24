import  React, { useContext, useEffect, useRef, useState }  from 'react';
import { StoreContext } from '../../store/storeProvider';
import { Login } from '../Login/Login';
import { Navigation } from '../Navigation/Navigation';
import { Link ,HashRouter as Router } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import {default as FooterStyles} from './Footer.module.scss';
import { request } from '../../helpers/request';


const style = bemCssModules(FooterStyles);

  

export const Footer = () => {

    const {adress} = useContext(StoreContext);

    if(!adress){
        return null;
    }

    const {phone, email, location, link, facebook} = adress;
    
    const phoneTo = `tel:${phone}`;
    const mailTo = `mailto:${email}`;
   
    return(
        <footer className={style()}>
            <div className={style('wrapper')}>
                <div className={style('section')}>
                    <h2 className={style('title')}>Linki</h2>
                    <ul className={style('list')}>
                        <li className={style('listItem')}>
                            <Link className={style('link')}  to={'/'}>Strona główna</Link>
                        </li>
                        <li className={style('listItem')}>
                            <Link className={style('link')}  to={'/aktualności'}>Aktualności</Link>
                        </li>
                        <li className={style('listItem')}> 
                            <Link className={style('link')}  to={'/onas'}>O Nas</Link>
                        </li>
                        <li className={style('listItem')}>
                            <Link className={style('link')}  to={'/kadra'}>Grupy</Link>
                        </li>
                        <li className={style('listItem')}>
                            <Link className={style('link')}  to={'/rekrutacja'}>Rekrutacja</Link>
                        </li>
                        <li className={style('listItem')}>
                            <Link className={style('link')}  to={'/kontakt'}>Kontakt</Link>   
                        </li>
                    </ul>
                </div>
                <div className={style('section')}>
                    <h2 className={style('title')}>Kontakt</h2>
                    <div className = {style('info')}>
                        <a className = {style('contact')} href={phoneTo}>
                            <div className = {style('icon')}></div>
                            <p className = {style('text')}>{phone}</p>
                        </a>
                        <a className = {style('contact')} href={mailTo}>
                            <div className = {style('icon')}></div>
                            <p className = {style('text')}>{email}</p>
                        </a>
                        <a className = {style('contact')} href={link}>
                            <div className = {style('icon')}></div>
                            <p className = {style('text')}>{location}</p>
                        </a>
                        <a className = {style('contact')} href={facebook}>
                                <div className = {style('icon')}></div>
                                <p className = {style('text')}>facebook</p>
                        </a>
                    </div>
                </div>
                <div className={style('section')}></div>
                
            </div>
            <p className={style('copyright')}>©Copyright 2021 przedszkole.pl</p>
        </footer>
    );
}