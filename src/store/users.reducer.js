import { request } from "../helpers/request";

export  const usersReducer = (users, action) => {
    switch(action.type) {
        case "FETCH": 
            return action.data;

        case "ADD":
            action.data.changed = true;
            users.push(action.data);
            return users;

        case "CHANGE" :
            const index = action.index;
            users[index] = action.data;
            users[index].changed = true;
            return users;
 
        case "DELETE" :
            users[action.index].deleted = true;
            return users;
        
        case "SAVE" :
            for(let user of users){
                if(user.deleted === true && user.id){
                    deleteUser(user.id)
                }else if(user.changed === true && !user.deleted){
                    const {id, name, surname, email, pwdHash,role, group} = user;
                    updateUser({id, name, surname, email, pwdHash,role, group});
                }
                
            }
            const newUsers = users
            .filter(user => user.deleted !== true)
            .map(user => {
                user.changed = false;
                return user;
            });
            return newUsers;
     }
}




const updateUser =  async (user) => {
    await request.post('/user', user );
}

const deleteUser =  async (id) => {
    await request.delete(`/user/${id}`);
}
