import  React, { useContext ,useEffect,useState } from 'react';
import { StoreContext } from '../../../store/storeProvider';
import {StaffForm} from './StaffForm';
import bemCssModules from 'bem-css-modules';
import {default as StaffPanelStyles} from './StaffPanel.module.scss';

const style = bemCssModules(StaffPanelStyles);


export const StaffPanel = ({active}) => {

    const { staffMembers, dispatchStaffMembers } = useContext(StoreContext);

    const [changes , setChanges] = useState(null);

    const staff = staffMembers.map(member => 
         <StaffForm staff={member} index={staffMembers.indexOf(member)} changes={setChanges} key ={staffMembers.indexOf(member)}/>
    );

     console.log("staffPanelRender");

     const handleSendData = () => {
        dispatchStaffMembers({type: 'SAVE'});
        setChanges(null);
        active(false);
     }
    
     return (

        <div className={style()}>
            {changes? <button className={style('button')} onClick={handleSendData}>Zapisz zmiany</button> : null}
            <StaffForm staff={{id: "", name:"", surname: "",position: ""}} changes={setChanges}/>
            {staff}
        </div>     
    )
}