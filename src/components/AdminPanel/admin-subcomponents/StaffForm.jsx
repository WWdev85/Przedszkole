import  React, { useContext ,useEffect,useState, useRef } from 'react';
import { StoreContext } from '../../../store/storeProvider';

import bemCssModules from 'bem-css-modules';
import {default as StaffPanelStyles} from './StaffPanel.module.scss';
import { request } from '../../../helpers/request';

const style = bemCssModules(StaffPanelStyles);

export const StaffForm = ({staff , index, changes}) =>{
    
    const {dispatchStaffMembers} = useContext(StoreContext);

    const form = useRef();

    const [id] = useState(staff.id);
    const [name, setName ] = useState(staff.name);
    const [surname, setSurname] = useState(staff.surname);
    const [position, setPosition] = useState(staff.position);
    const [file, setFile] = useState(null);

    useEffect(() => {
        
        if(staff.changed){
            form.current.style.backgroundColor = "rgba(255,255,0,0.1)";
        }
        if(staff.deleted){
            form.current.style.backgroundColor = "rgba(255,0,0,0.1)";
        }
    })


    console.log("staffFormRender");

    const changeName = (e) =>{
        setName(e.target.value)
    }

    const changeSurname = (e) =>{
        setSurname(e.target.value)
    }

    const changePosition = (e) =>{
        setPosition(e.target.value)
    }

    const changeFile = (e) =>{
        setFile(e.target.files[0]);
    }

    const handleDeleteStaffMember = () =>{
        dispatchStaffMembers({type: 'DELETE', index: index });
        changes(Math.random());
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const newStaffMember = {id, name, surname, position}
        const newFile = file;
        
        if(!(index >= 0)){
            dispatchStaffMembers({type: 'ADD', data: newStaffMember, file: newFile});
            setName("");
            setSurname("");
            setPosition("");
            setFile("");
            changes(Math.random() );
        }else{
           
            dispatchStaffMembers({type: 'CHANGE', data: newStaffMember, file: newFile, index: index });
            changes(Math.random());
        }
        
    }

    const submit = index >= 0 ? "zmień" : "dodaj"; 
    
    return (
                 
        <form className={style('form')} ref={form} onSubmit={handleSubmit}  >
            {(index >= 0 )? <p className={style('number')}>{index + 1}.</p> : null} 
            <div className={style('input-wrapper')}>
                <input  className={style('input')}  type="text" onChange={changeName}  value={name} required/>
                 <label  className={style('label')}>imię</label>
            </div> 
            <div className={style('input-wrapper')}>
                <input className={style('input')}  type="text" onChange={changeSurname} value={surname} required/>
                <label className={style('label')}>nazwisko</label>
            </div> 
            <div className={style('input-wrapper')} >
                <select className={style('select')} onChange={changePosition} value={position} required>
                    <option className={style('option')} disabled  value={""}> -- wybierz opcję -- </option>
                    <option className={style('option')}value="director">Dyrekcja</option>
                    <option className={style('option')}value="teacher">Nauczyciel</option>
                    <option className={style('option')}value="assistance">Pomoc Nauczyciela</option>
                    <option className={style('option')}value="cook">Kucharka</option>
                    <option className={style('option')}value="other">Inna</option>
                </select>
                <label  className={style('label')}>stanowisko</label>
            </div> 
            <div className={style('input-wrapper')}>
                <input className={style('input-file')} onChange={changeFile} type="file"  accept="image/png, image/jpeg" />
                <label className={style('label')}>zdjęcie</label>
            </div>
                    
            <button className={style('button')} type="submit" >{submit}</button>
            {index >= 0? <button className={style('button')} onClick={handleDeleteStaffMember} type="button"  >usuń</button> : null}
        </form>
    );
}