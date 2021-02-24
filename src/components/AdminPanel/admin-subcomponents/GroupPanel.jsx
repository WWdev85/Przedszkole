import  React, { useContext ,useEffect,useState } from 'react';
import { StoreContext } from '../../../store/storeProvider';
import {GroupForm} from './GroupForm';

import bemCssModules from 'bem-css-modules';
import {default as GroupStyles} from './GroupPanel.module.scss';

const style = bemCssModules(GroupStyles);


export const GroupPanel = ({active}) => {

    const { groups, dispatchGroups } = useContext(StoreContext);

    const [changes , setChanges] = useState(null);

    

    const currentGroups = groups.map(group => 
        <GroupForm group={group} key ={groups.indexOf(group)} index ={groups.indexOf(group)} changes={setChanges}/>
        );

    const handleSendData = () => {
        dispatchGroups({type: 'SAVE'});
        setChanges(null);
        active(false);
    }   
    
  
    return (

        <div className={style('')}>
            {changes? <button className={style('button')} onClick={handleSendData}>Zapisz zmiany</button> : null}
            <GroupForm group={{id:"", name:"", teacher:{id:""}, numberOfChildren: ""}} changes={setChanges} />
            {currentGroups}
            
        </div>     
    )
}