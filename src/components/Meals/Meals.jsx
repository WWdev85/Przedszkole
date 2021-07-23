import  React, { useContext, useState, useEffect }  from 'react';
import { StoreContext } from '../../store/storeProvider';
import bemCssModules from 'bem-css-modules';
import {default as MealsStyles} from './Meals.module.scss';
import{ Meal }from '../MainPage/subcomponents/News';


const style = bemCssModules(MealsStyles);

export const Meals = () => {

    const  {menu} = useContext(StoreContext);
    const [weekDays, setWeekDays] = useState(null);

    useEffect(() => {
        setWeekDays(currentWeekDays());   
    },[])
    

    

    
    const currentWeekDays = () => {
        const date = new Date();
        date.setDate(date.getDate() - date.getDay() +  1);
        const week = [];
        let day, month;
        for ( let i = 0; i < 7; i++){
            day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            month = date.getMonth() + 1;
            month = month < 10 ? "0" + month : month;
            week.push(`${day}.${month}.${date.getFullYear()}`);
            date.setDate(date.getDate() + 1);
        }

        return week;
    }

    if(!menu){
        return null;
    }


    let weekMenu;

    if(weekDays){
        weekMenu = menu
            .filter(element =>  weekDays
            .find( date => date == element.date))
            .map( element => <Meal meal = {element} date = {element.date} title = {new Date(element.date.slice(6,10), Number(element.date.slice(3,5) - 1),element.date.slice(0,2)).getDay()} key = {element.id} />)
            .reverse();
    }
 


    return(
        <section className={style()}>
            <h1 className={style('title')}>Jadłospis</h1> 
            {weekDays ? <p className ={style('date')}>od {weekDays[0]} - do {weekDays[weekDays.length -1]} </p>: null}
            {weekMenu}

            
        </section>
    )
}