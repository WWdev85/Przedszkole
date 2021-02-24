import  React, { useContext, useEffect, useState }  from 'react';
import { StoreContext } from '../../../store/storeProvider';

import bemCssModules from 'bem-css-modules';
import {default as AdressPanelStyles} from './AdressPanel.module.scss';
import { request } from '../../../helpers/request';

const style = bemCssModules(AdressPanelStyles);


export const AdressPanel = () => {

    const { adress, dispatchAdress} = useContext(StoreContext);

    const { id, phone, email, facebook, location, link, map, changed } = adress;

    const [ phoneNumber, setPhoneNumber ] = useState(phone);
    const [ emailAdress, setEmailAdress ] = useState(email);
    const [ facebookLink, setFacebookLink ] = useState(facebook);


    useEffect(() =>{
        setPhoneNumber(phone);
        setEmailAdress(email);
        setFacebookLink(facebook);
    },[adress])

    const phoneChange =(e) => {
        setPhoneNumber(e.target.value);
    }

    const emailChange =(e) => {
        setEmailAdress(e.target.value);
    }

    const facebookChange =(e) => {
        setFacebookLink(e.target.value);
    }

    const handleSubmit = () => {
        const newAdress = {id, phone: phoneNumber, email: emailAdress, location, link, map,facebook:facebookLink}
        dispatchAdress({type: 'CHANGE', data: newAdress});
    }

    const handleSendData = () => {
        dispatchAdress({type: 'SEND'});  
    }

    console.log("adressPanelRender");
    return (

        <div className={style('')}>
            <form className={style('form')} onSubmit={handleSubmit}>
                <div className={style('input-wrapper')}>
                    <input className={style('input')} type="text" onChange={phoneChange} value={phoneNumber} required/>
                    <label className={style('label')}>nr telefonu</label>
                </div> 
                <div className={style('input-wrapper')}>
                    <input className={style('input')} type="email" onChange={emailChange} value={emailAdress} required/>
                    <label className={style('label')}>adres email</label>
                </div>
                <div className={style('input-wrapper')}>
                    <input className={style('input')} type="text" onChange={facebookChange} value={facebookLink} required/>
                    <label className={style('label')}>facebook</label>
                </div>
                <button className={style('button')} type="submit">Zmień</button>
                { (changed  === true)? <button className={style('button')} onClick={handleSendData}>Zapisz zmiany</button> : null}
            </form> 
        </div>
    );
}