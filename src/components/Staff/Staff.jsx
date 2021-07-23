import  React, { useContext, useState, useEffect, useRef }  from 'react';
import { StoreContext } from '../../store/storeProvider';
import bemCssModules from 'bem-css-modules';
import {default as StaffStyles} from './Staff.module.scss';



const style = bemCssModules(StaffStyles);

export const Staff = () => {

    const  {staffMembers} = useContext(StoreContext);


    if(!staffMembers){
        return null;
    }

    const director = staffMembers.find(member => member.position  === "director");
    const teachers = staffMembers
        .filter(member => member.position  === "teacher")
        .map(member => <Member member = {member} key={member.id}/>);

    const assistances = staffMembers
        .filter(member => member.position  === "assistance")
        .map(member => <Member member = {member} key={member.id}/>);  
    
    const others = staffMembers
        .filter(member => (member.position  === "other"))
        .map(member => <Member member = {member} key={member.id}/>);   




    return(
        <section className={style()}>
            <h1 className={style('title')}>Kadra</h1> 
            <div className={style('group')}>
                <h2 className={style('group-title')}>Dyrekcja</h2>
                <Member member = {director} />
            </div>
            <div className={style('group')}>
                <h2 className={style('group-title')}>nauczyciele</h2>
                {teachers}
            </div>
            <div className={style('group')}>
                <h2 className={style('group-title')}>nauczyciele wspomagający</h2>
                {assistances}
            </div>
            <div className={style('group')}>
                <h2 className={style('group-title')}>pozostali pracownicy</h2>
                {others}
            </div>
            
            
            
            

            
        </section>
    )
}


export const Member = ({member}) => {
    const {id, name, surname, position, photoFn} = member;

    let pos;

    switch(position){
        case 'director' :
        pos = 'dyrektor';
        break;

        case 'teacher' :
        pos = 'nauczyciel';
        break;

        case 'assistance' :
        pos = 'nauczyciel wspomagający';
        break;

        case 'other' :
        pos = '';
        break;
    }

    const photo = useRef();

    useEffect(() => {
        if(photoFn){
            photo.current.style.backgroundImage = `url('http://localhost:3001/staff-member/photo/${id}')`;
        }

   
    },[])

    return(
        <div className = {style('member')}  ref={photo}>
            <div className = {`${style('data')} ${position}`}>
                <p className = {style('name')} >{name} {surname}</p>
                <p className = {style('position')} >{pos}</p>
            </div>
        </div>
    )
}