import React, { createContext , useEffect, useReducer, useState } from 'react';
import { request } from '../helpers/request';

import {adressReducer} from './adress.reducer';
import {staffReducer} from './staff.reducer';
import {groupsReducer} from './groups.reducer';
import {usersReducer} from './users.reducer';
import {menuReducer} from './menu.reducer';
import {advertisementsReducer} from './advertisements.reducer';
export const StoreContext = createContext(null);


const StoreProvider = ({children}) => {

    const [adress, dispatchAdress] = useReducer(adressReducer,null);
    const [staffMembers, dispatchStaffMembers] = useReducer(staffReducer,null);
    const [groups, dispatchGroups] = useReducer(groupsReducer,null);
    const [advertisements, dispatchAdvertisements] = useReducer(advertisementsReducer,null);
    const [ users, dispatchUsers ] = useReducer(usersReducer, []);
    const [ menu, dispatchMenu ] = useReducer(menuReducer, null);
    const [loginModal, setLoginModal] = useState("disabled");
    const [loggedUser, setLoggedUser] = useState();


    useEffect(async() => {

        fetchData();
        const { data } = await request.get('/user');
        if(data.role)
            setLoggedUser(data);
    },[]);

    useEffect( async() => {
        if(loggedUser && loggedUser.role === "administrator"){
            const newUsers = await request.get('/user/staffMember');
            dispatchUsers({type: 'FETCH', data: newUsers.data});
        }   
    },[loggedUser])
   
    const fetchData = async () => {
        const newAdress = await request.get('/adress');
        dispatchAdress({type: 'FETCH', data: newAdress.data});

        const newstaffMembers  = await request.get('/staff-member');
        dispatchStaffMembers({type: 'FETCH', data: newstaffMembers.data});

        const newGroups  = await request.get('/group');
        dispatchGroups({type: 'FETCH', data: newGroups.data});

        const newAdvertisment = await request.get('/advertisment/root');
        const sortedAdvertisements = newAdvertisment.data.sort((a, b) => {
            if(a.createdAt > b.createdAt)
                return -1;
            if(a.createdAt <= b.createdAt)   
                return 1; 
        });
        dispatchAdvertisements({type: 'FETCH', data: sortedAdvertisements});

        const newUsers = await request.get('/user/staffMember');
        dispatchUsers({type: 'FETCH', data: newUsers.data});

        const newMenu = await request.get('/meal');
        dispatchMenu({type: 'FETCH', data: newMenu.data});
    }

   
    console.log("storeProviderRender");

    return(
        <StoreContext.Provider value={{
            adress,
            dispatchAdress,
            loginModal,
            setLoginModal,
            loggedUser,
            setLoggedUser,
            staffMembers,
            dispatchStaffMembers,
            groups,
            dispatchGroups,
            advertisements,
            dispatchAdvertisements,
            users,
            dispatchUsers,
            menu,
            dispatchMenu,
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreProvider;