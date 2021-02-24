import  React, { useContext ,useState, useRef, useEffect } from 'react';
import { StoreContext } from '../../../store/storeProvider';

import bemCssModules from 'bem-css-modules';
import {default as UserPanelStyles} from './UserPanel.module.scss';
import { request } from '../../../helpers/request';

const style = bemCssModules(UserPanelStyles);

export const UserForm = ({user, index, changes}) =>{

    const {groups , dispatchUsers} = useContext(StoreContext);

    const[id] = useState(user.id);
    const [name, setName ] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [group , setGroup] = useState(user.group);

    const form = useRef();
    
    useEffect(() => {
        
        if(user.changed){
            form.current.style.backgroundColor = "rgba(255,255,0,0.1)";
        }
        if(user.deleted){
            form.current.style.backgroundColor = "rgba(255,0,0,0.1)";
        }
    })
    

   

    const submit = index >= 0? "zmień" : "dodaj"; 

    const options = groups.map(group => 
        <option className={style('option')} key={group.id} value={group.id}>{group.name}</option>
        );

   

    
    const changeName = (e) =>{
        setName(e.target.value);
    }

    const changeSurname = (e) =>{
        setSurname(e.target.value);
    }
    const changeEmail = (e) =>{
        setEmail(e.target.value);
    }
    const changePassword = (e) =>{
        setPassword(e.target.value);
    }

    const changeGroup = (e) =>{
        setGroup(e.target.value);
    }

    const handleDeleteUser = () => {
        dispatchUsers({type: 'DELETE', index: index});
        changes(Math.random());
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const newUser = {id, name, surname, email, pwdHash: password, role:"staffMember", group}
        if(!(index >= 0)){
            dispatchUsers({type: 'ADD', data: newUser});
            setName("");
            setSurname("");
            setEmail("");
            setPassword("");
            setGroup("");
            changes(Math.random());
        }else{
            dispatchUsers({type: 'CHANGE', data: newUser, index: index});
            changes(Math.random());
        }
    }

    
    
    

  
    return (
                   
        <form className={style('form')} onSubmit={handleSubmit} ref={form} >
            {(index >= 0 )? <p className={style('number')}>{index + 1}.</p> : null} 
            <div className={style('input-wrapper')}>
                <input  className={style('input')}  type="text" onChange={changeName}  value={name} required/>
                 <label  className={style('label')}>imię</label>
            </div>
            <div className={style('input-wrapper')}>
                <input  className={style('input')}  type="text" onChange={changeSurname}  value={surname} required/>
                 <label  className={style('label')}>nazwisko</label>
            </div> 
            <div className={style('input-wrapper')}>
                <input  className={style('input')}  type="email" onChange={changeEmail}  value={email} required/>
                 <label  className={style('label')}>e-mail</label>
            </div>
            { !id? 
            <div className={style('input-wrapper')}>
                <input  className={style('input')}  type="password" onChange={changePassword} autoComplete="true" value={password} required/>
                 <label  className={style('label')}>hasło</label>
            </div> 
            : null}
            <div className={style('input-wrapper')} >
                <select className={style('select')} onChange={changeGroup} value={group} required>
                    <option  value={null}>Brak</option>
                    {options}
                </select>
                <label  className={style('label')}>administruje grupą</label>
            </div> 
            <button className={style('button')} type="submit" >{submit}</button>
            {id? <button className={style('button')} onClick={handleDeleteUser} type="button"  >usuń</button> : null}    
         
        </form>
    );
}