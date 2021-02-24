import  React, { useContext ,useEffect,useState, useRef } from 'react';
import { StoreContext } from '../../../store/storeProvider';
import {MenuForm} from './MenuForm';

import bemCssModules from 'bem-css-modules';
import {default as MenuPanelStyles} from './MenuPanel.module.scss';
import { request } from '../../../helpers/request';

const style = bemCssModules(MenuPanelStyles);


export const MenuPanel = ({active}) => {

    const { menu , dispatchMenu } = useContext(StoreContext);
    const form = useRef();

    
    const [beginDate ,setBeginDate] = useState("");
    const [endDate , setEndDate] = useState("");
    const [newMenu, setNewMenu] = useState("")
    const [history, setHistory] = useState(false);
    const [changes , setChanges] = useState(null);
     
    const allMeals =  menu.map(item => {
        console.log(item.date);
        const newDate = item.date.split(".").reverse().join("-");
        console.log(newDate);
        return <MenuForm date={new Date(newDate)}  meal={item} key={menu.indexOf(item)} index ={menu.indexOf(item)} changes={setChanges}/>
    }
        
        );

    const changeBeginDate = (e) => {
        setBeginDate(e.target.value);
    }   

    const changeEndDate = (e) => {
        setEndDate(e.target.value);
    } 

    const addDay = (date) => {
        let newDate = new Date(date)
        newDate.setDate(newDate.getDate() + 1)
        return newDate;
    }
    

    const handleSubmitDates = (e) => {
        e.preventDefault();
        const begin = new Date(beginDate);
        console.log(beginDate);
        const end = new Date(endDate);
        let meals = [];
        for(let beg = begin, i = 0; beg <= end ; beg = addDay(beg), i++){
            meals.push(<MenuForm date={beg} meal={{id:"", breakfast:"",firstCourse:"",mainCourse: "", tea:""}} key={i} changes={setChanges}/>);
        }
        setNewMenu(meals);
        form.current.style.display ="none";
        setChanges(true);
    }

    const handleShowHistory = () => {
        setHistory(!history);
    }

    const handleSendData = () => {
        dispatchMenu({type: 'SAVE'});
        setChanges(null);
        active(false);
    }

    
    return (
        
        <div className={style('')} onSubmit={handleSubmitDates}>
             {changes? <button className={style('button')} onClick={handleSendData}>Zapisz zmiany</button> : null}
            <form className={style('form')} ref={form} >
                <div className={style('input-wrapper')}>
                    <input  className={style('input-date')}  type="date" onChange={changeBeginDate} value={beginDate}  required/>
                    <label  className={style('label')}>od</label>
                </div> 
                <div className={style('input-wrapper')}>
                    <input  className={style('input-date')}  type="date" onChange={changeEndDate} value={endDate} required/>
                    <label  className={style('label')}>do</label>       
                </div> 
                <button className={style('button')} type="submit" >Dodaj jadłospis</button>
        </form>  
            {newMenu}
            <button className={style('button')} onClick={handleShowHistory} >Historia</button>  
            {history? allMeals : null}
        </div>     
    )
}