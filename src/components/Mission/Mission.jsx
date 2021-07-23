import  React, { useContext, useState, useEffect, useRef }  from 'react';
import { StoreContext } from '../../store/storeProvider';
import bemCssModules from 'bem-css-modules';
import {default as MissionStyles} from './Mission.module.scss';



const style = bemCssModules(MissionStyles);

export const Mission = () => {
    return(
        <section className={style()}>
               <h1 className={style('title')}>Misja i wizja</h1>
               <h2 className={style('subtitle')}>Wizja Przedszkola</h2> 
               <p> Każde dziecko jest niepowtarzalną osobą, dlatego też wraz z rodzicami dążymy do tego, by nasze dzieci wyposażone były w wiedzę, umiejętności i sprawności, które pozwolą im sprostać wymaganiom stawianym w szkole i dorosłym życiu, by były otwarte na kontakty z innymi ludźmi, by cechowała je patriotyczna oraz twórcza postawa wobec otaczającego je świata. Respektujemy prawo rodzica do zabierania głosu w sprawach dotyczących jego dziecka - zabiegamy o partnerską współpracę z rodzicami. </p>

               <h2 className={style('subtitle')}>Misja Przedszkola</h2> 
               <p>Nasze przedszkole zapewnia opiekę, wychowanie w atmosferze akceptacji i bezpieczeństwa. Dzieci mają możliwość samorealizacji i aktywnego odkrywania swoich możliwości. Dzięki bogatej ofercie zajęć dodatkowych rozwijają swoje zainteresowania wzbogacając wiedzę o otaczającym świecie.

Zajęcia wychowawczo - dydaktyczne dostosowane są do możliwości rozwojowych dzieci                  i prowadzone są na wysokim poziomie. Dzieci mają stworzone warunki do twórczego działania, przyswajają ważne umiejętności przydatne w życiu dorosłego człowieka.

Wychowankowie mają w nauczycielach wsparcie, a ci każdemu dziecku zapewniają podmiotowe traktowanie i dbają o jego wielostronny rozwój. Pedagodzy w naszym przedszkolu współpracują ze sobą i dzielą się zdobytą wiedzą. Pogodna atmosfera w przedszkolu i życzliwi nauczyciele umiejętnie otaczają opieką wszystkie dzieci.

Nauczycielki znają potrzeby i zainteresowania dzieci oraz posiadają umiejętność atrakcyjnego prowadzenia zajęć. Konstruują ciekawe i bogate oferty zabaw i zadań, są dobrze przygotowane merytorycznie i metodycznie. Poszukują innowacyjnych rozwiązań, mają wysokie kwalifikacje, pracują z pasją ciągle doskonaląc swoje umiejętności.

Przedszkole propaguje edukację prozdrowotną oraz zachowania przyjazne przyrodzie. Dzieci wdrażane są do troski o własne zdrowie i aktywności ruchowej oraz poznawczej w naturalnym otoczeniu. Obserwują i badają przyrodę, uczą się ją rozumieć, kochać i szanować, a także korzystać z jej zasobów dla własnego zdrowia i zaspokojenia potrzeb.

Przedszkole ściśle współpracuje z rodzicami, uwzględnia ich potrzeby i oczekiwania. Angażuje rodziców do pracy na rzecz przedszkola. Rodzice są naszymi sojusznikami, a działania nasze są skoordynowane. Wszyscy pracownicy naszej placówki współdziałają ze sobą. Tworzą przyjazną atmosferę, dzięki której dzieci czują się akceptowane i bezpieczne.

Nasze przedszkole jest przyjazne dzieciom. Ciągle doskonalimy swoją bazę lokalową. Sale wyposażone są w nowoczesny sprzęt, nowe meble, pomoce dydaktyczne i piękne zabawki. Nasz plac zabaw zaspokaja potrzeby ruchowe dzieci na świeżym powietrzu i zachęca do zabawy.

Dzięki skutecznej promocji nasze przedszkole ma dobra opinię w środowisku lokalnym. Dobra baza, wyposażenie, estetyka pomieszczeń i otoczenia dopełnia działania dydaktyczno - wychowawcze      i wpływa na wysoką ocenę. Placówka inwestuje w nauczycieli, pracowników, bazę lokalowa,            a zyskują na tym przede wszystkim dzieci. Przedszkole jest zarządzane w sposób sprawny i nowoczesny, a pracownicy mają satysfakcję ze swojej pracy

Absolwenci naszego przedszkola to dzieci otwarte, twórcze, komunikatywne, przygotowane do podjęcia obowiązków na kolejnym szczeblu edukacji. Znają siebie i swoje możliwości, akceptują odrębność innych, potrafią odnaleźć się w nowej sytuacji, rozwiązują problemy, dążą do osiągnięcia sukcesu i radzą sobie z porażkami.</p>
        </section>
     
    )
}
