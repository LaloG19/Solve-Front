import axios from 'axios';
import { defineStore } from 'pinia'
import Swal from 'sweetalert2';
const ruta = 'https://backup-production-9704.up.railway.app/api/';

export const useLogin = defineStore('login',{
    state:()=>({
        credentials: {
            "adminID": 0,
            "user": '',
            "name": '',
            "lastName": '',
            "password": ''
        }
    }),
    getters:{
      getCredentials(state){
        return state.credentials;
      },
    },
    actions:{
        async login(body){
        try{
            const tryLogin = await axios.post(`${ruta}v1/admins/login`, body);

            if (tryLogin.status === 200) {
                this.credentials = tryLogin.data;
                localStorage.setItem('credentials', JSON.stringify(this.credentials));
                console.log('Credenciales: ' + localStorage.getItem('credentials'));
                return this.credentials;
            }
         }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: 'Verifique sus credenciales e intente de nuevo.  ',
            });
            console.log('error: ' + JSON.stringify(error.message));
         }
        },
        async destroyCredentials(){
            this.credentials = {
                "adminID": 0,
                "user": '',
                "name": '',
                "lastName": '',
                "password": ''
            }
            return true;
        }
    }
});