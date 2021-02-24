import  React, { useContext ,useState, useRef, useEffect } from 'react';
import { StoreContext } from '../../../store/storeProvider';

import bemCssModules from 'bem-css-modules';
import {default as AdvertisementPanelStyles} from './AdvertisementPanel.module.scss';


import { request } from '../../../helpers/request';
const style = bemCssModules(AdvertisementPanelStyles);

export const AdvertisementForm = ({advertisement ,index, changes}) =>{

    const{ dispatchAdvertisements} = useContext(StoreContext);

    const publicationDate = useRef('');
    const form = useRef();

    const [id] = useState(advertisement.id);
    const [title, setTitle] = useState(advertisement.title);
    const [content, setContent] = useState(advertisement.content);
    const [date , setDate] = useState(advertisement.createdAt);
    const [file , setFile] = useState(null);

    useEffect(() => {
        if(!id){
            publicationDate.current.style.opacity="0";
        }
        if(advertisement.changed){
            form.current.style.backgroundColor = "rgba(255,255,0,0.1)";
        }
        if(advertisement.deleted){
            form.current.style.backgroundColor = "rgba(255,0,0,0.1)";
        }
    })

    const createdAt = date? date.slice(0, 16).replace("T", "   ") : null;

    const submit = index >= 0? "zmień" : "dodaj"; 


    const changeTitle = (e) => {
        setTitle(e.target.value);
    }

    
    const changeContent = (e) => {
        setContent(e.target.value);
    }

    const changeFile = (e) =>{
        setFile(e.target.files[0]);
    }

    const handleDeleteAdvertisement = () =>{
        dispatchAdvertisements({type: 'DELETE', index: index});
        changes(Math.random());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAdvertisement = {id,title, content, createdAt: date, file};

        if(!(index >= 0)){
            dispatchAdvertisements({type: 'ADD', data: newAdvertisement});
            setDate("");
            setContent("");
            setFile(null);
            changes(Math.random() );
        }else{  
            dispatchAdvertisements({type: 'CHANGE', data: newAdvertisement, index: index });
            changes(Math.random());
        }
        
    }


  
    return (
                   
        <form className={style('form')} onSubmit={handleSubmit} ref={form} >
            {(index >= 0 )? <p className={style('number')}>{index + 1}.</p> : null} 
            <div className={style('input-wrapper')} ref={publicationDate}>
                <p className={style('text')}>{createdAt}</p>
                 <label  className={style('label')}>data publikacji</label>
            </div> 
            <div className={style('input-wrapper')}>
                <input  className={style('input')}   onChange={changeTitle}  value={title} required/>
                 <label  className={style('label')}>tytuł</label>
            </div>
            <div className={style('input-wrapper')}>
                <textarea  className={style('textarea')}  type="textarea" rows="8"  onChange={changeContent}  value={content} required/>
                 <label  className={style('label')}>treść</label>
            </div>
            <div className={style('input-wrapper')}>
                <input className={style('input-file')} onChange={changeFile} type="file"  accept="image/png, image/jpeg, application/pdf, application/doc, application/docx, video/mp4/*" />
                <label className={style('label')}>zdjęcie/film</label>
            </div> 
            <button className={style('button')} type="submit" >{submit}</button>
            {index >= 0? <button className={style('button')} onClick={handleDeleteAdvertisement} type="button"  >usuń</button> : null}

         
        </form>
    );
}