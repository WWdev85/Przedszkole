import  React, { useContext ,useEffect,useState } from 'react';
import { StoreContext } from '../../../store/storeProvider';
import { AdvertisementForm } from './AdvertisementForm';

import bemCssModules from 'bem-css-modules';
import {default as AdvertisementPanelStyles} from './AdvertisementPanel.module.scss';

const style = bemCssModules(AdvertisementPanelStyles);


export const AdvertisementPanel = ({active}) => {

    const { groupAdvertisements, dispatchGroupAdvertisements, loggedUser, setGroupAdvertisements } = useContext(StoreContext);

    const [changes , setChanges] = useState(null);

    const group = loggedUser.group;
    
    useEffect(() => {
        setGroupAdvertisements(group);
    },[])
    



    const news = groupAdvertisements.map(adv => 
        <AdvertisementForm advertisement={adv}  key ={groupAdvertisements.indexOf(adv)} index ={groupAdvertisements.indexOf(adv)}  changes={setChanges}/>
        );

    const handleSendData = () => {
        dispatchGroupAdvertisements({type: 'SAVE'});
        setChanges(null);
        active(false);
    }
  
    return (

        <div className={style('')}>
            {changes? <button className={style('button')} onClick={handleSendData}>Zapisz zmiany</button> : null}
            <AdvertisementForm advertisement={{id:"", content:"", createdAt:"", group: group}} changes={setChanges}/>
            {news}
        </div>     
    )
}