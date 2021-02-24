import  React, { useContext ,useState, useRef, useEffect } from 'react';
import { StoreContext } from '../../../store/storeProvider';

import bemCssModules from 'bem-css-modules';
import {default as MenuPanelStyles} from './MenuPanel.module.scss';


const style = bemCssModules(MenuPanelStyles);

export const MenuForm = ({date , meal, index, changes}) =>{

    const { dispatchMenu } = useContext(StoreContext);

    const weekDays = [ 'niedziela','poniedziałek', 'wtorek', 'środa', 'czwartek','piątek', 'sobota'];
    const months= ['01','02','03','04','05','06','07','08','09','10','11','12'];

    const form = useRef();
    const submitButton = useRef();

    const[id] = useState(meal.id);
    const [day] = useState(`${date.getDate() < 10 ? "0" + date.getDate() :  date.getDate() }.${months[date.getMonth()]}.${date.getFullYear()}`);
    const [weekDay] = useState(weekDays[date.getDay()]);
    const [breakfast, setBreakfast] = useState(meal.breakfast);
    const [ firstCourse, setFirstCourse] = useState(meal.firstCourse);
    const [mainCourse, setMainCourse] = useState(meal.mainCourse);
    const [tea, setTea] = useState(meal.tea);

    useEffect(() => {
        
        if(meal.changed){
            form.current.style.backgroundColor = "rgba(255,255,0,0.1)";
        }
        if(meal.deleted){
            form.current.style.backgroundColor = "rgba(255,0,0,0.1)";
        }
    })
 
    const changeBreakfast = (e) => {
        setBreakfast(e.target.value);
 
    };

    const submit = index >= 0 ? "zmień" : "dodaj";  

    const changeFirstCourse = (e) => {
        setFirstCourse(e.target.value);
    };

    const changeMainCourse = (e) => {
        setMainCourse(e.target.value);
    };

    const changeTea = (e) => {
        setTea(e.target.value);
    };

    const handleDeleteMeal = ()=>{
        dispatchMenu({type: 'DELETE', index: index});
        changes(Math.random());
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newMeal = {id, date: day, breakfast, firstCourse, mainCourse, tea};
        if(!(index >= 0)){
            dispatchMenu({type: 'ADD', data: newMeal});
            form.current.style.backgroundColor = "rgba(255,255,0,0.1)";
            submitButton.current.disabled = true;
        }else{
            dispatchMenu({type: 'CHANGE', data: newMeal, index: index});
            changes(Math.random());
        }
    }

    return (
                   
        <form className={style('form')}  onSubmit={handleSubmit} ref={form} >
            <div className={style('input-wrapper')}>
                <p className={style('text')}>{day}</p>
                <p className={style('text')}>{weekDay}</p>
                <label  className={style('label')}>data</label>
            </div> 
            <div className={style('input-wrapper')}>
                <textarea  className={style('textarea')} rows="8"  type="textarea" onChange={changeBreakfast}  value={breakfast} required/>
                 <label  className={style('label')}>śniadanie</label>
            </div>
            <div className={style('input-wrapper')}>
                <textarea  className={style('textarea')} rows="8"  type="textarea" onChange={changeFirstCourse}  value={firstCourse} required/>
                 <label  className={style('label')}>pierwsze danie</label>
            </div>
            <div className={style('input-wrapper')}>
                <textarea  className={style('textarea')} rows="8" type="textarea" onChange={changeMainCourse}  value={mainCourse} required/>
                 <label  className={style('label')}>drugie danie</label>
            </div>
            <div className={style('input-wrapper')}>
                <textarea  className={style('textarea')} rows="8" type="textarea" onChange={changeTea}  value={tea} required/>
                 <label  className={style('label')}>podwieczorek</label>
            </div>
            <button className={style('button')} type="submit" ref={submitButton} >{submit}</button>
            {index >= 0? <button className={style('button')} onClick={handleDeleteMeal} type="button"  >usuń</button> : null}  
        
        </form>
    );
}