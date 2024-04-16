import axios from 'axios';
import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
const ruta = 'https://backup-production-9704.up.railway.app/api/';

export const useDepartment = defineStore('department', {
    state:()=>({
        departmentList:[],
    }),
    getters:{
        getDepartmentsList(state){
            return state.departmentList;
        },
    },
    actions:{
        async loadDepartments(){
            try{
                const departments = await axios.get(`${ruta}v1/departments`);

                if(departments.status === 200){
                    this.departmentList = departments.data;
                    return true;
                }
            }catch (error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al obtener los departamentos',
                    text: 'Verifique su conexión a internet e intente de nuevo. \n'
                    + JSON.stringfy(error),
                });
                console.log('error: ' + JSON.stringfy(error.message));
            }
        },
        async createDepartment(department){
            try{
                delete department.departmentID;
                const response = await axios.post(`${ruta}v1/departments/create`, department);
                if(response.status === 200){
                    Swal.fire({
                        icon: 'success',
                        title: 'Departamento creado',
                        text: response.data.message,
                    });
                    return true;
                }
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al crear el departamento',
                    text: 'Verifique su conexión a internet e intente de nuevo.',
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        },
        async updateDepartment(department){
            try{
                const response = await axios.patch(`${ruta}v1/departments/modify`, department);
                if(response.message === 200){
                    Swal.fire({
                        icon: 'success',
                        title: 'Departamento actualizado',
                        text: response.data.message,
                    });
                    return true;
                }
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar el departamento',
                    text: 'Verifique su conexión a internet e intente de nuevo.',
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        },
        async deleteDepartment(departmentID){
            try{
                const response = await axios.delete(`${ruta}v1/departments/delete`, {data: {departmentID}});
                if(response.status === 200){
                    Swal.fire({
                        icon: 'success',
                        title: 'Departamento eliminado',
                        text: response.data.message,
                    });
                    return true;
                }
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar el departamento',
                    text: 'Verifique su conexión a internet e intente de nuevo.'
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        },
        async searchDepartment(txt){
            try{
                const response = await axios.get(`${ruta}v1/departments/search/${txt}`);
                if(response.status === 200){
                    this.departmentList = response.data;
                    return true;
                }
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al buscar el departamento',
                    text: 'Verifique su conexión a internet e intente de nuevo.'
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        }
    }
});