import React, { createContext , useState } from 'react';



export const StoreContext = createContext(null);

const StoreProvider = ({children}) => {
    const [games, setGames] = useState(["wisielec","saper","diamenty", "oczko", "gwiezdne wojny","arkanoid"]);

   
    return(
        <StoreContext.Provider value={{
            games,
            setGames,
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreProvider;