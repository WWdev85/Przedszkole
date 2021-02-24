import  React, { useContext, useEffect, useState }  from 'react';


import bemCssModules from 'bem-css-modules';
import {default as AdminPanelStyles} from './AdminPanel.module.scss';
import { StaffPanel } from './admin-subcomponents/StaffPanel';
import {UserPanel} from './admin-subcomponents/UserPanel';
import { AdressPanel } from './admin-subcomponents/AdressPanel';
import { GroupPanel } from './admin-subcomponents/GroupPanel';
import { AdvertisementPanel } from './admin-subcomponents/AdvertisementPanel';
import { MenuPanel } from './admin-subcomponents/MenuPanel';



const style = bemCssModules(AdminPanelStyles);


export const AdminPanel = () => {
   
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [isUserActive, setIsUserActive] = useState(false);
    const [isAdvertisementActive, setIsAdvertisementActive] = useState(false);
    const [isGroupActive, setIsGroupActive] = useState(false);
    const [isStaffActive, setIsStaffActive] = useState(false);
    const [isAdressActive, setIsAdressActive] = useState(false);
    

    console.log('AdminPanelRender');

    const menuSign = isMenuActive? "-" : "+" ;
    const userSign = isUserActive? "-" : "+" ;
    const advertisementSign = isAdvertisementActive? "-" : "+" ;
    const groupSign = isGroupActive? "-" : "+" ;
    const staffSign = isStaffActive? "-" : "+" ;
    const adressSign = isAdressActive? "-" : "+" ;

    const handleActivateMenuPanel = () => {
        setIsMenuActive(!isMenuActive);
     }
    const handleActivateUserPanel = () => {
        setIsUserActive(!isUserActive);
     }
    
    const handleActivateAdvertisementPanel = () => {
        setIsAdvertisementActive(!isAdvertisementActive);
     }

    const handleActivateGroupPanel = () => {
        setIsGroupActive(!isGroupActive);
     }
 
    const handleActivateStaffPanel = () => {
        setIsStaffActive(!isStaffActive);
     }

    const handleActivateAdressPanel = () => {
       setIsAdressActive(!isAdressActive);
    }
    
   
    return (
        <section className ={style()}>
            <h1 className={style('title')}>panel administracyjny</h1>

            <h2 className={style('subtitle')} onClick={handleActivateMenuPanel}>jadłospis {menuSign}</h2>
            { isMenuActive? <MenuPanel active={setIsMenuActive} />  : null}

            <h2 className={style('subtitle')} onClick={handleActivateAdvertisementPanel}>posty  {advertisementSign}</h2>
            { isAdvertisementActive? <AdvertisementPanel active={setIsAdvertisementActive} />  : null}

            <h2 className={style('subtitle')} onClick={handleActivateGroupPanel}>grupy  {groupSign}</h2>
            { isGroupActive? <GroupPanel active={setIsGroupActive} />  : null}

            <h2 className={style('subtitle')} onClick={handleActivateStaffPanel}>kadra {staffSign}</h2>
            { isStaffActive? <StaffPanel active={setIsStaffActive} /> : null} 

            <h2 className={style('subtitle')} onClick={handleActivateUserPanel}>użytkownicy {userSign}</h2>
            { isUserActive? <UserPanel active={setIsUserActive} />  : null}

            <h2 className={style('subtitle')} onClick={handleActivateAdressPanel}>dane teleadresowe  {adressSign}</h2>
            { isAdressActive? <AdressPanel active={setIsAdressActive} />  : null}

           
            
          
            
        </section>
    );
}