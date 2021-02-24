import { request } from "../helpers/request";

export  const advertisementsReducer = (advertisement, action) => {
    switch(action.type) {
        case "FETCH": 
            return action.data;

        case "ADD":
            const { data } = action
            data.changed = true;
            advertisement.push(data);
            return(advertisement);

        case "CHANGE" :
            const { index }= action;
            advertisement[index] = action.data;
            advertisement[index].changed = true;
            return advertisement;
 
        case "DELETE" :
            advertisement[action.index].deleted = true;
            return advertisement;
        
        case "SAVE" :
            let formData;

            
            for(let adv of advertisement){
                let {changed, deleted, id, title, content, file} = adv;
                if(deleted === true && id){
                    deleteAdvertisement(id)
                }else if(changed === true && !deleted){
                    formData = new FormData();
                    formData.append('id',id);
                    formData.append('title',title);
                    formData.append('content',content);
                    if(file){
                         formData.append('photo',file);
                    }
                    updateAdvertisement(formData);
                }
                
            }
            const newAdvertisement = advertisement
            .filter(adv => adv.deleted !== true)
            .map(adv => {
                adv.changed = false;
                adv.file = null;
                return adv;
            });
            return newAdvertisement;
    }
}


const updateAdvertisement = async (adv) =>{
    await request.post('/advertisment', adv , {headers: {
        'Content-Type': 'multipart/form-data'
      }});
}


const deleteAdvertisement = async (id) => {
    await request.delete(`/advertisment/${id}`);
}

