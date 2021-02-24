import  React, { useContext, useEffect, useRef, useState }  from 'react';
import { StoreContext } from '../../../store/storeProvider';
import bemCssModules from 'bem-css-modules';
import {default as NewsStyles} from './News.module.scss';


const style = bemCssModules(NewsStyles);

export const News =() => {

    const [date, setDate] = useState();

    const { advertisements, menu} = useContext(StoreContext);

    useEffect(() => {
        let newDate = new Date;
        const day = newDate.getDate() < 10 ? '0'+ newDate.getDate() : newDate.getDate() ;
        const month = newDate.getMonth() + 1 < 10 ?  "0" + (newDate.getMonth() + 1) : ewDate.getMonth() + 1;
        const year = newDate.getFullYear();
        newDate = day+"."+month+"."+year;
        setDate(newDate);
        
    },[])

    if(!menu){
        return null;
    }

   const todayMenu = menu.filter(item => item.date === date);

   const adv = advertisements.slice(0,3).map( advertisement => <Advertisement advertisement={advertisement} key={advertisement.id}/>);

  

   

    return(
        <div className={style()}>
            <div className={style('wrapper')}>
                <div className='subtitle'>aktualności</div>
                <h2 className='title'>Ostatnie ogłoszenia</h2>
                {todayMenu.length > 0?<div className={style("menu")}>
                    <h3 className={style('menu-title')}>Jadłospis na dziś ({date})</h3>
                    <div className={style('meal')}>
                        <p className={style('content')}>{todayMenu[0].breakfast}</p>
                        <p className={style('name')}>śniadanie</p>
                    </div>
                    <div className={style('meal')}>
                        <p className={style('content')}>{todayMenu[0].firstCourse}</p>
                        <p className={style('name')}>obiad: I danie</p>
                    </div>
                    <div className={style('meal')}>
                        <p className={style('content')}>{todayMenu[0].mainCourse}</p>
                        <p className={style('name')}>obiad: II danie</p>
                    </div>
                    <div className={style('meal')}>
                        <p className={style('content')}>{todayMenu[0].tea}</p>
                        <p className={style('name')}>podwieczorek</p>
                    </div>
                </div> : null}

                <div className={style('advertisements')}>
                    
                {adv}
        
                </div>


            </div>
            
        </div>
    );
}



const Advertisement = ({advertisement}) => {
    const {id, title,createdAt, content, photoFn} = advertisement;

    return(
        <div className={style('adv')}>
            <p className={style('date')}>{createdAt.slice(0,16).replace("T", "   ")}</p>
            {( /jpg$/.test(photoFn) || /jpeg$/.test(photoFn))? 
                <img className={style('media')} width="320" height="240"  src={'http://localhost:3001/advertisment/photo/'+id} alt=""/> 
                : null}
             {( /mp4$/.test(photoFn))? 
                <video className={style('media')} width="320" height="240" controls>
                    <source src={'http://localhost:3001/advertisment/photo/'+id} type="video/mp4"/>
                 </video> 
                : null}
            { ((/mp4$/.test(photoFn)) || (/jpg$/.test(photoFn)) || (/jpeg$/.test(photoFn)))? null :<img className={style('media')} width="320" height="240"  src="../public/images/przedszkole_logo.svg" alt=""/> }
                        
            <h3 className={style('title')}>{title}</h3>
            <p className={style('text')}>{content}</p>
            {(( /jpg$/.test(photoFn)) || (/jpeg$/.test(photoFn)) || photoFn === null)? null :<a className={style('link')} href={"http://localhost:3001/advertisment/photo/"+id} download="plik">Pobierz plik</a> }
        </div>

    );
}