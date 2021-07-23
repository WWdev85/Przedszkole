import  React, { useContext, useState, useEffect, useRef }  from 'react';
import { Switch, Route , Link ,HashRouter as Router } from 'react-router-dom';
import { StoreContext } from '../../store/storeProvider';
import bemCssModules from 'bem-css-modules';
import { Advertisements } from '../Advertisements/Advertisements';
import {default as GroupStyles} from './Group.module.scss';



const style = bemCssModules(GroupStyles);

export const Group = ({group}) => {

    const {id, name, teacher, numberOfChildren} = group;
    const { groupAdvertisements , setGroupAdvertisements } = useContext(StoreContext);

    const teacherPhoto = useRef();
  

    useEffect(() => {
        if(teacher.photoFn){
            teacherPhoto.current.style.backgroundImage = `url('http://localhost:3001/staff-member/photo/${teacher.id}')`;
        }
        setGroupAdvertisements(id);
    },[])
    return(
        <section className = {style()}> 
            <div className={style('picture')}>
                <div className={style("picture-wrapper")}>
                    <h2 className={style('name')} >{name}</h2>
                    <div className={style('teacher-picture')} ref={teacherPhoto}></div>
                </div>
                
            </div>
            <div className={style('info')}>
                <p className={style('teacher')}>Wychowawca: {teacher.name} {teacher.surname}</p>
                <p className={style('teacher')}>Liczba dzieci w grupie: {numberOfChildren}</p>
            </div>
            <Router > 
                <div className={style('links')}>
                    <Link className={style('link')} to={`/grupy/${name}/aktualności`}><h1 className={style('title')}>Aktualności</h1>  </Link>
                    <Link className={style('link')} to={`/grupy/${name}/galeria`}><h1 className={style('title')}>Galeria</h1>  </Link>
                </div>  
            </Router>
            <Switch>
                <Route path={`/grupy/${name}/aktualności`} render={() => <Advertisements advertisements={groupAdvertisements} />} />
            </Switch>   
             
            
        </section>
    )
}