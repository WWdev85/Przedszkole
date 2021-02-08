import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';


import Game from './game';

import {default as HangmanStyles} from './Hangman.module.scss';

const style = bemCssModules(HangmanStyles);



const Hangman = () =>{
    
    const history = useHistory();
    const [game, setGame] = useState();
  
    const goToMenu = () => {
        history.push('/');
    }

    
    useEffect(( )=> {
  
        setGame(new Game({
           letters: document.querySelector(`.${style('keyboard')}`), 
           category: document.querySelector(`.${style('category')}`),
           word: document.querySelector(`.${style('word')}`),
           output: document.querySelector(`.${style('result')}`),
           images: document.querySelectorAll(`.${style('image')}`)
        }));

    }, []);

    useEffect(( )=> {
         return   game ? game.start() : null;
    }, [game]);

   const newGame = () => {
        game.newGame();
   }



    return(
         <section className={style()}>
             <div className={style('result')}>
                <img className={style('image')} src="../../images/Hangman/1.png"></img>
                <img className={style('image')} src="../../images/Hangman/2.png"></img>
                <img className={style('image')} src="../../images/Hangman/3.png"></img>
                <img className={style('image')} src="../../images/Hangman/4.png"></img>
                <img className={style('image')} src="../../images/Hangman/5.png"></img>
                <img className={style('image')} src="../../images/Hangman/6.png"></img>
                <img className={style('image')} src="../../images/Hangman/7.png"></img>
                <img className={style('image')} src="../../images/Hangman/8.png"></img>
            </div>
             <div className={style('word')}></div>
             <div className={style('category')}></div>
             <div className={style('keyboard')}></div>
             <button onClick={newGame} className={style('button')}>Wylosuj hasło</button>
            <button onClick={goToMenu} className={style('button')}>Powrót do menu</button>
        </section>
    );
};

export default Hangman;