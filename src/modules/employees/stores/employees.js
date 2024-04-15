import axios from 'axios';
import { defineStore } from 'pinia'
import Swal from 'sweetalert2';
const ruta = 'https://backup-production-9704.up.railway.app/api/';

export const useEmployee = defineStore('employee',{
    state:()=>({
        employeesList: [],
    }),
    getters:{
      getEmployeesList(state){
        return state.employeesList;
      },
    },
    actions:{
        async loadEmployees(){
        try{
            const employees = await axios.get(`${ruta}v1/employees`);

            if (employees.status === 200) {
                this.employeesList = employees.data;
                return true;
            }
         }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error al obtener los empleados',
                text: 'Verifique su conexión a internet e intente de nuevo. \n' 
                + JSON.stringify(error),
            });
            console.log('error: ' + JSON.stringify(error.message));
         }
        },
        async createEmployee(employee){
            try{
                delete employee.employeeID;
                const response = await axios.post(`${ruta}v1/employees/create`, employee);
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Empleado agregado',
                        text: response.data.message,
                    });
                    return true;
                }
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al agregar al empleado',
                    text: 'Verifique su conexión a internet e intente de nuevo.',
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        },
        async updateEmployee(employee){
            try{
                const response = await axios.patch(`${ruta}v1/employees/modify`, employee);
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Empleado actualizado',
                        text: response.data.message,
                    });
                    return true;
                }
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar al empleado',
                    text: 'Verifique su conexión a internet e intente de nuevo.',
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        },
        async deleteEmployee(employeeID){
            try{
                const response = await axios.delete(`${ruta}v1/employees/delete`, {data: employeeID});
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Empleado eliminado',
                        text: response.data.message,
                    });
                    return true;
                }
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar al empleado',
                    text: 'Verifique su conexión a internet e intente de nuevo.'
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        },
        async searchEmployee(txt){
            try{
                const response = await axios.get(`${ruta}v1/employees/search/${txt}`);
                if (response.status === 200) {
                    this.employeesList = response.data;
                    return true;
                }
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al buscar al empleado',
                    text: 'Verifique su conexión a internet e intente de nuevo.'
                });
                console.log('error: ' + JSON.stringify(error.message));
            }
        }
    }
});