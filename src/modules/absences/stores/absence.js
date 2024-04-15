import axios from 'axios';
import { defineStore } from 'pinia'
import Swal from 'sweetalert2';
const ruta = 'https://backup-production-9704.up.railway.app/api/';

export const useAbsence = defineStore('absence',{
    state:()=>({
        absencesList: [],
    }),
    getters:{
      getAbsencesList(state){
        return state.absencesList;
      },
    },
    actions:{
        async loadAbsences(){
        try{
            const absences = await axios.get(`${ruta}v1/absence`);

            if (absences.status === 200) {
                this.absencesList = absences.data;
                return true;
            }
         }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error al obtener las faltas',
                text: 'Verifique su conexión a internet e intente de nuevo. \n' 
                + JSON.stringify(error),
            });
            console.log('error: ' + JSON.stringify(error.message));
         }
        },
        async createAbsence(absence){
            try{
                delete absence.absenceID;
                const response = await axios.post(`${ruta}v1/absence/create`, absence);
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Falta creada',
                        text: response.data.message,
                    });
                    return true;
                }
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al crear la falta',
                    text: 'Verifique su conexión a internet e intente de nuevo.',
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        },
        async updateAbsence(absence){
            try{
                const response = await axios.patch(`${ruta}v1/absence/update`, absence);
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Falta actualizada',
                        text: response.data.message,
                    });
                    return true;
                }
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar la Falta',
                    text: 'Verifique su conexión a internet e intente de nuevo.',
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        },
        async updateAbsenceStatus(absenceID) {
            try {
                const response = await axios.put(`${ruta}v1/absence/updateStatus`, { absenceID });
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Estado de falta actualizado',
                        text: response.data.message,
                    });
                    return true;
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar la Falta',
                    text: 'Verifique su conexión a internet e intente de nuevo.'
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        },
        async deleteAbsence(absenceID) {
            try {
                const response = await axios.delete(`${ruta}v1/absence/delete`, { data: { absenceID } });
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Estado de falta actualizado',
                        text: response.data.message,
                    });
                    return true;
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar la Falta',
                    text: 'Verifique su conexión a internet e intente de nuevo.'
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        },
        
        async searchAbsence(txt){
            try{
                const response = await axios.get(`${ruta}v1/absence/employee/${txt}`);
                if (response.status === 200) {
                    this.absencesList = response.data;
                    return true;
                }
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al buscar la falta',
                    text: 'Verifique su conexión a internet e intente de nuevo.'
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        }
    },  
});