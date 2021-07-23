import  React, { useContext, useState }  from 'react';
import { StoreContext } from '../../store/storeProvider';
import bemCssModules from 'bem-css-modules';
import {default as AdvertisementsStyles} from './Advertisements.module.scss';
import{ Advertisement }from '../MainPage/subcomponents/News';

const style = bemCssModules(AdvertisementsStyles);

export const Advertisements = ({advertisements}) => {

   
  
    const[currentPage, setCurrentPage] = useState(0);
    
    let refs;

  
 
    

    if(!advertisements){
        return null;
    }

    
    
    const advOnPage = 4;
    const adver = advertisements;
    const adv = adver.slice((currentPage * advOnPage), currentPage * advOnPage + advOnPage).map(advertisement => <Advertisement advertisements ={advertisements} advertisement={advertisement} key={advertisement.id}/>);
    
    let pages = Math.floor(advertisements.length/advOnPage) ;
    const rest = advertisements.length%advOnPage;
    pages = rest > 0 ? pages + 1 : pages;

    let pageNumbers = [];

    for( let i = 1; i <= pages; i++){
        pageNumbers.push(i);

        
    } 

    const changePage = (e) => {
        refs = document.querySelectorAll('.page');
        refs.forEach(ref => ref.classList.remove('page--active'));
        refs[e.target.dataset.value - 1].classList.add('page--active');
        setCurrentPage(e.target.dataset.value - 1);
        
        
    }

    const previousPage = () => {
        refs = document.querySelectorAll('.page');
        refs.forEach(ref => ref.classList.remove('page--active'));
        refs[currentPage -1].classList.add('page--active');
        setCurrentPage(currentPage -1);
        
    }

    const nextPage = () => {
        refs = document.querySelectorAll('.page');
        refs.forEach(ref => ref.classList.remove('page--active'))
        refs[currentPage + 1].classList.add('page--active');
        setCurrentPage(currentPage + 1);
       
    }


    const pagesList = pageNumbers.map(page => <p className = 'page'  data-value={page} key={page} onClick={changePage} >{page}</p>);
   
    refs = document.querySelectorAll('.page');

    if( currentPage == 0 && refs[0] != undefined){
        refs[0].classList.add('page--active');
    }


    
    

    return(
        <section className={style()}>
            <h1 className={style('title')}>Aktualności</h1>
           
            <div className={style('advertisements')}>
                {adv}
                <div className = 'pages'>
                    {currentPage + 1 > 1 ? <p className='pageText' onClick={previousPage}> poprzednia </p> : null}
                    {pages > 1 ? pagesList : null}
                    {currentPage + 1 < pages ? <p className='pageText' onClick={nextPage}>następna</p> : null}
                </div>
                
            </div>
        </section>
    )
}