import { request } from "../helpers/request";

export  const adressReducer = (adress, action) => {
    switch(action.type) {
        case "FETCH": 
            return action.data;

        case "CHANGE" :
            adress = action.data;
            adress.changed = true;
            return adress;

        case "SEND" :
            const {id, phone, email, location, link, map,facebook} = adress

            adress ={id, phone, email, location, link, map,facebook};
            sendAdress(adress);
            return adress;
             
    }
}

const sendAdress =  async(adress) =>{
    await request.post('/adress',adress )
}