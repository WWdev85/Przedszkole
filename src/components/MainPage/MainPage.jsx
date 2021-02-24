import  React, { useContext, useEffect, useState, useRef }  from 'react';
import { StoreContext } from '../../store/storeProvider';

import bemCssModules from 'bem-css-modules';
import {default as MainPageStyles} from './MainPage.module.scss';
import { request } from '../../helpers/request';

import { Slider } from './subcomponents/Slider';
import { AboutUs } from './subcomponents/AboutUs';
import { Groups } from './subcomponents/Groups';
import { News } from './subcomponents/News';


const style = bemCssModules(MainPageStyles);



export const MainPage =() => {

    

    return(
        <section className={style()}>
            <Slider/>
            <AboutUs/>
            <Groups/>
            <News/>

        </section>
    );
}