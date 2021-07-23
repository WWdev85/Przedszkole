import  React, { useEffect, useRef }  from 'react';

import bemCssModules from 'bem-css-modules';
import {default as SliderStyles} from './Slider.module.scss';


const style = bemCssModules(SliderStyles);

export const Slider = () => {

    const slide1 = useRef();
    const slide2 = useRef();
    const content1 = useRef();
    const content2 = useRef();


    let interval;

    useEffect(() => {
        slide1.current.classList.toggle('slider__slide--active');
        content1.current.classList.toggle('slider__slide-content--active');
        changeSlide();

        return () => {
            clearInterval(interval);
        }
    },[])

    const changeSlide = ()=> {
    interval = setInterval( () => {
        nextSlide();
        }, 7000)
    }

    const nextSlide = () =>{
        slide1.current.classList.toggle('slider__slide--active');
        slide2.current.classList.toggle('slider__slide--active');
        content1.current.classList.toggle('slider__slide-content--active');
        content2.current.classList.toggle('slider__slide-content--active');
    }

    const handleChangeSlide = ()=>{
        clearInterval(interval);
        nextSlide();
        changeSlide();
    }

    return(
        <div className={style()}>
                <button className={style('button')} onClick={handleChangeSlide}></button>
                <button className={style('button')} onClick={handleChangeSlide}></button>
                <div className={style('slide')} ref={slide1}>
                    <div className={style('slide-content')} ref={content1}>
                        <h2 className={style('slide-title')} >Przedszkole uczy</h2>
                        <p className={style('slide-text')}>Dbamy o wszechstronny, harmonijny rozwój dziecka</p>
                    </div>
                </div>
                <div className={style('slide')}ref={slide2}>
                    <div className={style('slide-content')} ref={content2} >
                        <h2 className={style('slide-title')}>Przedszkole bawi</h2>
                        <p className={style('slide-text')}>Lorems sad  sadasd sad sd sad asd asfageg et asf asfad</p>
                    </div>
                </div>
        </div>
          
    
    );

}