import  React, { useContext, useState }  from 'react';
import { StoreContext } from '../../store/storeProvider';

import bemCssModules from 'bem-css-modules';
import {default as LoginStyles} from './Login.module.scss';
import { request } from '../../helpers/request';


const style = bemCssModules(LoginStyles);



export const Login = () => {

    const [email , setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [status, setStatus] = useState(null);
    
    const { setLoggedUser , setLoginModal } = useContext(StoreContext);
    
    const handleChangeLogin = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePwd = (e) => {
        setPwd(e.target.value);
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        let res = null;
        await fetchLoginData()
          .then(response => {
              res = response;
           });
        if(res === "ok"){
            setStatus(null);
            setEmail("");
            setPwd("");
            handleClose();
            await fetchUserData()
              .then(response => setLoggedUser(response))
        }
        else{
            setStatus("Nieprawidłowy login lub hasło!");
            setLoggedUser(null);
        }
       
 
 
    }

    const fetchUserData = async () => {
        const { data } = await request.get('/user');
        return data;
    }

    const fetchLoginData = async () => {
        const{ data }= await request.post(`/auth/login` , {email , pwd});
        return data.status;  
    }

    const handleClose = () => {
        setLoginModal("disabled");
    }

    return(
        <section className={style()}>
            <div className={style('background')}></div>
            <h1 className={style('title')}>Logowanie</h1>
            <form className={style('form')}  onSubmit={handleSubmit}>
                <p className={style('monit')}>{status}</p>
                <input className={style('input')}  type="email" placeholder="e-mail" autoComplete=""  required  value={email} onChange={handleChangeLogin}/>
                <input  className={style('input')} type="password" placeholder="hasło" autoComplete="" required value={pwd} onChange={handleChangePwd}/>
                <button className={style('button')} type='submit' type="submit"  >Zaloguj</button>
            </form>
            <button className={style('close')} onClick={handleClose}>Anuluj</button>
        </section>

    )
}