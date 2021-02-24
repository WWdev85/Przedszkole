import  React, { useContext ,useState, useRef, useEffect } from 'react';
import { StoreContext } from '../../../store/storeProvider';

import bemCssModules from 'bem-css-modules';
import {default as GroupStyles} from './GroupPanel.module.scss';

const style = bemCssModules(GroupStyles);

export const GroupForm = ({group , index, changes}) =>{
    
    const { dispatchGroups , staffMembers} = useContext(StoreContext);

    const [id] = useState(group.id);
    const [name, setName ] = useState(group.name);
    const [teacher, setTeacher] = useState(group.teacher.id);
    const [numberOfChildren, setNumberOfChildren ] = useState(group.numberOfChildren)
    
    const form = useRef();
    
    useEffect(() => {
        
        if(group.changed){
            form.current.style.backgroundColor = "rgba(255,255,0,0.1)";
        }
        if(group.deleted){
            form.current.style.backgroundColor = "rgba(255,0,0,0.1)";
        }
    })

    const options = staffMembers
    .filter(member => member.position === "teacher")
    .map(member =>
        <option className={style('option')} key={member.id} value={member.id}>{member.name+" "+member.surname}</option>
        );

    const submit = index >= 0 ? "zmień" : "dodaj";     

    const changeName = (e) =>{
        setName(e.target.value)
    }

    const changeTeacher = (e) => {
        setTeacher(e.target.value)
    }

    const changeNumberOfChildren = (e) =>{
        setNumberOfChildren(e.target.value)
    }

    const handleDeleteGroup = () => {
        dispatchGroups({type: 'DELETE', index: index });
        changes(Math.random());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newGroup = {id, name, teacher, numberOfChildren};
        if(!(index >= 0)){
            dispatchGroups({type: 'ADD', data: newGroup});
            setName("");
            setNumberOfChildren("");
            setTeacher("");
            changes(Math.random() );
        } else{
            dispatchGroups({type: 'CHANGE', data: newGroup, index: index });
            changes(Math.random());
        }  
    }

    return (
                   
        <form className={style('form')} ref={form} onSubmit={handleSubmit}>
            {(index >= 0 )? <p className={style('number')}>{index + 1}.</p> : null} 
            <div className={style('input-wrapper')} >
                <input  className={style('input')}  type="text" onChange={changeName}  value={name} required/>
                 <label  className={style('label')}>nazwa</label>
            </div>
            <div className={style('input-wrapper')} >
                <input  className={style('input')} step="1" min="1" max="40" type="number" onChange={changeNumberOfChildren}  value={numberOfChildren} required/>
                 <label  className={style('label')}>liczba dzieci</label>
            </div>
            <div className={style('input-wrapper')} >
                <select className={style('select')} onChange={changeTeacher} value={teacher} required>
                    <option disabled  value={""}> -- wybierz opcję -- </option>
                    {options}
                </select>
                <label  className={style('label')}>wychowawca</label>
            </div>
            <button className={style('button')} type="submit" >{submit}</button>
            {index >= 0? <button className={style('button')} onClick={handleDeleteGroup} type="button"  >usuń</button> : null}    
        </form>
    );
}