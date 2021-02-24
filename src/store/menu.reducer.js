import { request } from "../helpers/request";

export  const menuReducer = (menu, action) => {
    switch(action.type) {
        case "FETCH": 
            return action.data;

        case "ADD":
            action.data.changed = true;
            menu.push(action.data);
            return menu;

        case "CHANGE" :
            const index = action.index;
            menu[index] = action.data;
            menu[index].changed = true;
            return menu;
 
        case "DELETE" :
            menu[action.index].deleted = true;
            return menu;
        
        case "SAVE" :
            for(let item of menu){
                if(item.deleted === true && item.id){
                    deleteMenu(item.id)
                }else if(item.changed === true && !item.deleted){
                    const {id, date, firstCourse, mainCourse, breakfast,tea} = item;
                    updateMeal({id, date, firstCourse, mainCourse, breakfast,tea});
                }
                
            }
            const newMenu = menu
            .filter(item => item.deleted !== true)
            .map(item => {
                item.changed = false;
                return item;
            });
            return newMenu;
      }
}






const updateMeal = async (meal) =>{
    await request.post('/meal' , meal);
}

const deleteMenu = async(id) => {
    await request.delete(`/meal/${id}`)
}