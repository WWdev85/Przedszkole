import  React , {useContext, useState, useRef, useEffect}  from 'react';
import { StoreContext } from '../../../store/storeProvider';
import { Link ,HashRouter as Router } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import {default as GroupsStyles} from './Groups.module.scss';
import { request } from '../../../helpers/request';

const style = bemCssModules(GroupsStyles);

export const Groups = () => {

    const { groups } = useContext(StoreContext);

    if(!groups){
        return null;
    }

    const allGroups = groups.map(group => <Group group={group} key={group.id}/>)

    

    return(
        <div className={style()}>
            <div className={style('wrapper')}> 
                <div className='subtitle'>grupy</div>
                <h2 className='title'>Wszystkie grupy</h2>
                { allGroups }
            </div>
        </div>
        

    );
}





const Group = ({group}) => {

    const teacherPhoto = useRef();
    const groupPhoto = useRef();
    
    useEffect(() => {
        if(group.teacher.photoFn){
            teacherPhoto.current.style.backgroundImage = `url('http://localhost:3001/staff-member/photo/${group.teacher.id}')`;
        }
        if(group.fotoFn){
            groupPhoto.current.style.backgroundImage = `url('http://localhost:3001/group/photo/${group.id}')`;
        }
    },[])

    

    return(
        <div className={style('group')}>
            <div className={style('group-image')} ref={groupPhoto}>
                <div className = {style('group-teacherPhoto')} ref={teacherPhoto}></div>
            </div>
            
            <h3 className={style('group-name')}>{group.name}</h3>
            <div className={style('info')}>
                <p className={style('value')}>{group.teacher.name+" "+group.teacher.surname}</p>
                <p className={style('label')}>wychowawca</p>
            </div>
            <div className={style('info')}>
                <p className={style('value')}>{group.numberOfChildren}</p>
                <p className={style('label')}>liczba dzieci</p>
            </div>
            
            <Link className={style('link')} to={`/${group.name}`}>Więcej</Link>

        </div>
    )

}