import { request } from "../helpers/request";

export  const groupsReducer = (groups, action) => {
    switch(action.type) {
        case "FETCH": 
            return action.data;

        case "ADD":
            action.data.changed = true;
            groups.push(action.data);
            return groups;

        case "CHANGE" :
            const index = action.index;
            groups[index] = action.data;
            groups[index].changed = true;
            return groups;
 
        case "DELETE" :
            groups[action.index].deleted = true;
            return groups;
        
        case "SAVE" :
            for(let group of groups){
                if(group.deleted === true && group.id){
                    deleteGroup(group.id)
                }else if(group.changed === true){
                    const {id, name, teacher, numberOfChildren} = group;
                    updateGroups({id, name, teacher, numberOfChildren});
                }
                
            }
            const newGroups = groups
            .filter(group => group.deleted !== true)
            .map(group => {
                group.changed = false;
                return group;
            });
            return newGroups;
     }
}


const updateGroups =  async (group) => {
    await request.post('/group', group );
}


const deleteGroup =  async (id) => {
    await request.delete(`/group/${id}`);
}