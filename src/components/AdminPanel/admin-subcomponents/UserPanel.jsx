import  React, { useEffect,useState , useContext} from 'react';
import { StoreContext } from '../../../store/storeProvider';
import {UserForm} from './UserForm';

import bemCssModules from 'bem-css-modules';
import {default as UserPanelStyles} from './UserPanel.module.scss';



const style = bemCssModules(UserPanelStyles);


export const UserPanel = ({active}) => {

    const { users, dispatchUsers } = useContext(StoreContext);

    const [changes , setChanges] = useState(null);

     
    const staffUsers = users.map(user => 
        <UserForm user={user}  key ={users.indexOf(user)} index ={users.indexOf(user)} changes={setChanges}/>
        );

    const handleSendData = () => {
        dispatchUsers({type: 'SAVE'});
        setChanges(null);
        active(false);
    }     
  
    return (

        <div className={style('')}>
            {changes? <button className={style('button')} onClick={handleSendData}>Zapisz zmiany</button> : null}
            <UserForm user={{id:"", name:"", surname:"", email:"",role:"",group:"" }} changes={setChanges}/>
            {staffUsers}
           
        </div>     
    )
}