import React, { createContext , useEffect, useReducer, useState } from 'react';
import { request } from '../helpers/request';

import {adressReducer} from './adress.reducer';
import {staffReducer} from './staff.reducer';
import {groupsReducer} from './groups.reducer';
import {usersReducer} from './users.reducer';
import {menuReducer} from './menu.reducer';
import {advertisementsReducer} from './advertisements.reducer';
import {groupAdvertisementsReducer} from './groupAdvertisements.reducer';
export const StoreContext = createContext(null);


const StoreProvider = ({children}) => {

    const [adress, dispatchAdress] = useReducer(adressReducer,null);
    const [staffMembers, dispatchStaffMembers] = useReducer(staffReducer,null);
    const [groups, dispatchGroups] = useReducer(groupsReducer,null);
    const [advertisements, dispatchAdvertisements] = useReducer(advertisementsReducer,null);
    const [groupAdvertisements, dispatchGroupAdvertisements] = useReducer(groupAdvertisementsReducer,null);
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
            const groupId = loggedUser ? loggedUser.group : null;
            setGroupAdvertisements(groupId);
             
    },[loggedUser])

    const setGroupAdvertisements = async(groupId) =>{
        const newGroupAdvertisment = await request.get(`/advertisment/${groupId}`);
        const sortedGroupAdvertisements = newGroupAdvertisment.data.sort((a, b) => {
          
        if(a.createdAt > b.createdAt)
            return -1;
        if(a.createdAt <= b.createdAt)   
            return 1; 
         });
        dispatchGroupAdvertisements({type: 'FETCH', data: sortedGroupAdvertisements});   
    }

    
   
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
        const sortedMenu = newMenu.data.sort((a, b) => {
            const yearA = a.date.slice(6,10);
            const monthA = a.date.slice(3,5);
            const dayA = a.date.slice(0,2);
            const yearB = b.date.slice(6,10);
            const monthB = b.date.slice(3,5);
            const dayB = b.date.slice(0,2);

            const dateA = new Date(yearA, monthA, dayA);
            const dateB = new Date(yearB, monthB, dayB);
            
            if(dateA > dateB)
                return -1;
            if(dateA <= dateB)   
                return 1; 
        });
        dispatchMenu({type: 'FETCH', data: sortedMenu});
    }



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
            groupAdvertisements, 
            dispatchGroupAdvertisements,
            setGroupAdvertisements,

            
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreProvider;