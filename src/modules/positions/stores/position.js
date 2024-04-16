import axios from 'axios';
import { defineStore } from 'pinia'
import Swal from 'sweetalert2';
const ruta = 'https://backup-production-9704.up.railway.app/api/';

export const usePosition = defineStore('position',{
    state:()=>({
        positionsList: [],
    }),
    getters:{
      getPositionsList(state){
        return state.positionsList;
      },
    },
    actions:{
        async loadPositions(){
        try{
            const positions = await axios.get(`${ruta}v1/positions`);

            if (positions.status === 200) {
                this.positionsList = positions.data;
                return true;
            }
         }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error al obtener las posiciones',
                text: 'Verifique su conexión a internet e intente de nuevo. \n' 
                + JSON.stringify(error),
            });
            console.log('error: ' + JSON.stringify(error.message));
         }
        },
        async createPosition(position){
            try{
                delete position.positionID;
                const response = await axios.post(`${ruta}v1/positions/create`, position);
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Posición creada',
                        text: response.data.message,
                    });
                    return true;
                }
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al crear la posición',
                    text: 'Verifique su conexión a internet e intente de nuevo.',
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        },
        async updatePosition(position){
            try{
                const response = await axios.patch(`${ruta}v1/positions/modify`, position);
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Posición actualizada',
                        text: response.data.message,
                    });
                    return true;
                }
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar la posición',
                    text: 'Verifique su conexión a internet e intente de nuevo.',
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        },
        async deletePosition(positionID){
            try{
                const response = await axios.delete(`${ruta}v1/positions/delete`, {data: positionID});
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Posición eliminada',
                        text: response.data.message,
                    });
                    return true;
                }
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar la posición',
                    text: 'Verifique su conexión a internet e intente de nuevo.'
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        },
        async searchPosition(txt){
            try{
                const response = await axios.get(`${ruta}v1/positions/search/${txt}`);
                if (response.status === 200) {
                    this.positionsList = response.data;
                    return true;
                }
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al buscar la posición',
                    text: 'Verifique su conexión a internet e intente de nuevo.'
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        }
    }
});