import  React, { useContext, useEffect, useState }  from 'react';

import bemCssModules from 'bem-css-modules';
import {default as TeacherPanelStyles} from './TeacherPanel.module.scss';

import { AdvertisementPanel } from '../TeacherPanel/teacher-subcomponents/AdvertisementPanel';
import { StoreContext } from '../../store/storeProvider';




const style = bemCssModules(TeacherPanelStyles);


export const TeacherPanel = ({group}) => {



    

    const [isAdvertisementActive, setIsAdvertisementActive] = useState(false);


    const advertisementSign = isAdvertisementActive? "-" : "+" ;


    const handleActivateAdvertisementPanel = () => {
        setIsAdvertisementActive(!isAdvertisementActive);
     }

    return(
        <section className={style()}>
            <h1 className={style('title')}>{`Panel administracyny grupy: ${group.name}`}</h1>

            <h2 className={style('subtitle')} onClick={handleActivateAdvertisementPanel}>posty  {advertisementSign}</h2>
            { isAdvertisementActive? <AdvertisementPanel active={setIsAdvertisementActive} />  : null}
        </section>
    );
}