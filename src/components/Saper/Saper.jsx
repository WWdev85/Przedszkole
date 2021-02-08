import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Saper.module.scss';


import Game from './Game';


const Saper = () => {

    const [game, setGame] = useState();

    useEffect(() => {
        setGame(new Game());
    },[]);

    useEffect(( )=> {
        return   game ? game.initializeGame() : null;
   }, [game]);


    return(
        <section className="saper saper--easy" data-game>
            <div className="saper__header saper__border saper__border--convex">
                <div className="saper__counter" data-counter>0</div>
                <button className="saper__reset saper__border saper__border--concave">
                    <svg className="saper__reset-button" data-button-reset>
                    <use href="../../images/Saper/sprite.svg#neutral"></use>
                    </svg>
                </button>
                <div className="saper__counter" data-timer>0</div>
            </div>
            <div className="saper__board saper__border saper__border--convex" data-board>
         
            </div>
            <div className="saper__panel saper__border saper__border--convex">
                <h1 className="saper__panel-header">Wybierz stopień trudności</h1>
                <div className="saper__buttons">
                    <button className="saper__button" data-button-easy>Łatwy</button>
                    <button className="saper__button" data-button-medium>Średni</button>
                    <button className="saper__button" data-button-expert>Trudny</button>
                </div>
            </div>
            <div className="saper__modal saper__modal--hide" data-modal> 
                <div className="saper__modal-content">
                    <h2 className="saper__modal-text" data-modal-header>Wygrana</h2>
                    <button className="saper__modal-button" data-modal-button>Nowa Gra</button>
                </div>
            </div>
        </section>
    );
}

export default Saper;