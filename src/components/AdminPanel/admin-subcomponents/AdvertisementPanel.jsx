import  React, { useContext ,useEffect,useState } from 'react';
import { StoreContext } from '../../../store/storeProvider';
import { AdvertisementForm } from './AdvertisementForm';

import bemCssModules from 'bem-css-modules';
import {default as AdvertisementPanelStyles} from './AdvertisementPanel.module.scss';

const style = bemCssModules(AdvertisementPanelStyles);


export const AdvertisementPanel = ({active}) => {

    const { advertisements, dispatchAdvertisements } = useContext(StoreContext);

    const [changes , setChanges] = useState(null);

 

    const news = advertisements.map(adv => 
        <AdvertisementForm advertisement={adv}  key ={advertisements.indexOf(adv)} index ={advertisements.indexOf(adv)}  changes={setChanges}/>
        );

    const handleSendData = () => {
        dispatchAdvertisements({type: 'SAVE'});
        setChanges(null);
        active(false);
    }
  
    return (

        <div className={style('')}>
            {changes? <button className={style('button')} onClick={handleSendData}>Zapisz zmiany</button> : null}
            <AdvertisementForm advertisement={{id:"", content:"", createdAt:""}} changes={setChanges}/>
            {news}
        </div>     
    )
}