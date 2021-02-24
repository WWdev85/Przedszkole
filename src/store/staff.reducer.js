import { request } from "../helpers/request";

export  const staffReducer = (staff, action) => {
    switch(action.type) {
        case "FETCH": 
            return action.data;

        case "ADD":
            action.data.changed = true;
            action.data.file = action.file;
            staff.push(action.data);
            return(staff)

        case "CHANGE" :
            const index = action.index;
            staff[index] = action.data;
            staff[index].changed = true;
            staff[index].file = action.file
            return staff;
 
        case "DELETE" :
            staff[action.index].deleted = true;
            return staff;
        
        case "SAVE" :
            let formData;
            for(let member of staff){
                if(member.deleted === true && member.id){
                    deleteStaffMember(member.id)
                }else if(member.changed === true && !member.deleted){
                    formData = new FormData();
                    formData.append('id',member.id);
                    formData.append('name',member.name);
                    formData.append('surname',member.surname);
                    formData.append('position',member.position);
                    if(member.file){
                         formData.append('photo',member.file);
                    }
                    sendStaffMember(formData);
                }
                
            }
            const newStaff = staff
            .filter(member => member.deleted !== true)
            .map(member => {
                member.changed = false;
                member.file = null;
                return member;
            });
            console.log(newStaff);
            return newStaff;
    }
}

const sendStaffMember =  async (member ) => {
    await request.post('/staff-member', member , {headers: {
        'Content-Type': 'multipart/form-data'
      }});
}

const deleteStaffMember =  async (id) => {
    await request.delete(`/staff-member/${id}`);
}