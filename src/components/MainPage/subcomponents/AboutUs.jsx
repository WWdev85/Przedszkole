import  React  from 'react';
import { Link ,HashRouter as Router } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import {default as AboutUsStyles} from './AboutUs.module.scss';


const style = bemCssModules(AboutUsStyles);

export const AboutUs = () => {

    return (
        <div className={style()}>
            <div className='subtitle'>o nas</div>
            <h2 className='title'>Witamy na stronie naszego przedszkola</h2>
            <div className ={style('content')}>
                <p className={style('text')}>W naszym przedszkolu i żłobku dbamy o wszechstronny, harmonijny rozwój dziecka wykorzystując niesamowitą chłonność umysłu naszych podopiecznych w pierwszych latach życia. Realizację podstawy programowej MEN uzupełniliśmy autorskim programem rozwoju inteligencji emocjonalnej i kompetencji społecznych opracowanym przez pedagogów z wieloletnim stażem we współpracy z psychologami dziecięcymi. Uczymy maluchy kluczowych do sprawnego funkcjonowania kompetencji takich jak krytyczne myślenie, rozpoznawanie emocji, szacunek do innych, współpraca.</p>
                <Link className={style('link')} to={`/onas`}>Więcej</Link>
            </div>
            <div className={style('image')}></div>
        </div>
    );
}