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
                {todayMenu.length > 0?   <Meal meal = {todayMenu[0]} date = {date} title = "Jadłospis na dziś" />: null}
                <div className={style('advertisements')}>   
                {adv}
                </div>
            </div>
            
        </div>
    );
}


export const Meal = ({meal ,date, title}) => {

    const {breakfast, firstCourse, mainCourse, tea} = meal

    switch(title){
        
        case 1 : 
        title = "Poniedziałek"
        break;

        case 2 : 
        title = "Wtorek"
        break;

        case 3 : 
        title = "Środa"
        break;

        case 4 : 
        title = "Czwartek"
        break;

        case 5 : 
        title = "Piątek"
        break;

        case 6 : 
        title = "Sobota"
        break;

        case 7 : 
        title = "Niedziela"
        break;


    }
    return(
        <div className={style("menu")}>
                   <h3 className={style('menu-title')}>{title}   ({date})</h3>
                    <div className={style('meal')}>
                        <p className={style('content')}>{meal.breakfast}</p>
                        <p className={style('name')}>śniadanie</p>
                    </div>
                    <div className={style('meal')}>
                        <p className={style('content')}>{meal.firstCourse}</p>
                        <p className={style('name')}>obiad: I danie</p>
                    </div>
                    <div className={style('meal')}>
                        <p className={style('content')}>{meal.mainCourse}</p>
                        <p className={style('name')}>obiad: II danie</p>
                    </div>
                    <div className={style('meal')}>
                        <p className={style('content')}>{meal.tea}</p>
                        <p className={style('name')}>podwieczorek</p>
                    </div>
                </div> 
    )
}



export const Advertisement = ({advertisement}) => {
    const {id, title,createdAt, content, photoFn} = advertisement;

    const media = useRef();
  

    useEffect(() => {
        if(media.current){
            media.current.style.backgroundImage = `url(http://localhost:3001/advertisment/photo/${id})`;
        }
    },[])

    return(
        <div className={style('adv')}>
            <p className={style('date')}>{createdAt.slice(0,16).replace("T", "   ")}</p>
            {( /jpg$/.test(photoFn) || /jpeg$/.test(photoFn))? 
                <div className={style('media')} ref = {media}></div>
                // <img className={style('media')} width="320" height="240"  src={'http://localhost:3001/advertisment/photo/'+id} alt=""/> 
                : null}
             {( /mp4$/.test(photoFn))? 
                <video className={style('media')} width="320" height="240" controls>
                    <source src={'http://localhost:3001/advertisment/photo/'+id} type="video/mp4"/>
                 </video> 
                : null}
            {/* { ((/mp4$/.test(photoFn)) || (/jpg$/.test(photoFn)) || (/jpeg$/.test(photoFn)))? null :<img className={style('media')} width="320" height="240"  src="../public/images/przedszkole_logo.svg" alt=""/> } */}
            { ((/mp4$/.test(photoFn)) || (/jpg$/.test(photoFn)) || (/jpeg$/.test(photoFn)))? null :<div className={style('media')}></div> }
            <div className={style('content')}>
                <h3 className={style('title')}>{title}</h3>
                <p className={style('text')}>{content}</p>
                {(( /jpg$/.test(photoFn)) || (/jpeg$/.test(photoFn)) || photoFn === null)? null :<a className={style('link')} href={"http://localhost:3001/advertisment/photo/"+id} download="plik">Pobierz plik</a> }
            </div>           
            
        </div>

    );
}