import  React, { useContext, useEffect, useRef, useState }  from 'react';
import { StoreContext } from '../../store/storeProvider';
import { Login } from '../Login/Login';
import { Navigation } from '../Navigation/Navigation';
import { Link ,HashRouter as Router } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import {default as HeaderStyles} from './Header.module.scss';
import { request } from '../../helpers/request';


const style = bemCssModules(HeaderStyles);

export const Header = () => {

  
    const { adress , loggedUser,  setLoggedUser , loginModal, setLoginModal} = useContext(StoreContext);
    
    const menu = useRef();
    const logo = useRef();
    const info = useRef();
 
     let navigation;

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    },[adress]);


    if(!adress){
        return null;
    }

    navigation = document.querySelector('.navigation');
    

    const {phone, email, location, link, facebook} = adress;
    
    const role = loggedUser? loggedUser.role : "other";

    const phoneTo = `tel:${phone}`;
    const mailTo = `mailto:${email}`;
    const loginStatus = loggedUser? "Wyloguj" : "Logowanie";
    const login = (loginModal === "enabled")? <Login/>: null;

  
    const width = window.innerWidth;
    let offset = 247;
    if(width > 599){
        offset = 174;
        if(width > 850){
            offset = 138
            if(width > 1024){
                offset = 37;
            }
        }
    }

    
    
    const handleLoginModal = () => {
        if(!loggedUser){
           setLoginModal("enabled");
           return;
        }
        handleLogout();
        setLoggedUser(null);
    }

    const handleLogout = async () => {
        await request.get('/auth/logout');
    }

    
    const handleScroll = () =>{
        if(scrollY> offset){
            menu.current.classList.add('header__menu--fixed');
            info.current.style.marginBottom = '100px';
            if(width < 1024){
                logo.current.classList.add('header__logo--invisible');
                info.current.style.marginBottom = '181px';
            }    
        }else{
            menu.current.classList.remove('header__menu--fixed');
            logo.current.classList.remove('header__logo--invisible');
            info.current.style.marginBottom = '0px';
        }
     
    } 
 
    const handleClickMenu = (e) => {
        const button = e.target;
        button.classList.toggle('header__menu-button-active');
        navigation.classList.toggle('navigation-active');
    }
     console.log('headerRender');
    return (
         <header className = {style()} ref={info}>
             <div className = {style('infoWrapper')}>
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
            
            <div className={style('menu')} ref={menu}>
                <div className={style('menu-wrapper')}>
                    <Link className={style('logo')} ref={logo} to={'/'}></Link>
                    <button className={style('menu-button')} onClick={handleClickMenu} >Menu</button>
                    <Navigation reference={menu}/>
                    <button className={style('login-button')} onClick={handleLoginModal}>{loginStatus}</button>
                    <Router> 
                        {role ==="administrator" ? <Link className={style('link')} to={`/panel-administratora`}>Panel Administracyjny</Link> : null}
                        {role ==="teacher" ? <Link className={style('link')} to={`/panel-nauczyciela`}>Panel Nauczyciela</Link> : null}
                    </Router> 
                    {login}
                </div>
            </div>
            </header>
        )
    
};

