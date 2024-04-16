<script setup lang="ts">
import { ref, onMounted, computed} from 'vue';
import LayoutView from '@/views/LayoutView.vue';
import searcher from '../components/searcherEmployees.vue';
import { useEmployee } from '../stores/employees.js';
import Swal from 'sweetalert2';


const store = useEmployee();

const title = ref('Empleados');
const credentials = ref( localStorage.getItem('credentials') ? JSON.parse(localStorage.getItem('credentials')) : null );
const employeesList = ref([]);
const mode = ref(0);
const showFrm = ref(false);
const record = ref({ employeeID: '', name: '', lastName: '', positionID: '', salary: '', email: '', phoneNumber: '', address: '', scheduleID: '' });

onMounted(() => {
  loadEmployees();
});

const loadEmployees = () => {
  store.loadEmployees().then((res) => {
    if (res){
      employeesList.value = store.getEmployeesList;
    }
  });
}
const addNewEmployee = () => {
  console.log('Agregando nuevo registro');
  store.createEmployee(record.value).then((res) => {
    if (res){
      loadEmployees();
    }
    cleanFrm();
  });
}
const updateEmployee = () => {
  console.log('Actualizando registro');
  store.updateEmployee(record.value).then((res) => {
    if (res){
      loadEmployees();
    }
    cleanFrm();
  });
}
const newRecord = () => {
  showFrm.value = !showFrm.value;
  mode.value = 0;
  cleanFrm();
}
const uploadData = (recordData) => {
  record.value.employeeID = recordData.employeeID;
  record.value.name = recordData.name;
  record.value.lastName = recordData.lastName;
  record.value.positionID = recordData.positionID;
  record.value.salary = recordData.salary;
  record.value.email = recordData.email;
  record.value.phoneNumber = recordData.phoneNumber;
  record.value.address = recordData.address;
  record.value.scheduleID = recordData.scheduleID;

  mode.value = 1;
  showFrm.value = true;
}
const deleteRecord = (recordData) => {
  console.log('Eliminando registro');
  Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#307351',
    cancelButtonColor: '#A22522',
    confirmButtonText: 'Sí, borrarlo!'
  }).then((result) => {
    if (result.isConfirmed) {
      store.deleteEmployee(recordData.employeeID).then((res) => {
        if (res){
          loadEmployees();
        }
      });
    }
  });
}
const handlerSearch = (value) => {
  if (value) {
  if (store.getEmployeesList.length > 0){
    employeesList.value = store.getEmployeesList;
  }else{
    loadEmployees();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se encontraron registros con ese criterio de búsqueda',
    });
  }
  } else {
    loadEmployees();
  }

  cleanFrm();
}

const cleanFrm = () => {
  record.value = { employeeID: '', name: '', lastName: '', positionID: '', salary: '', email: '', phoneNumber: '', address: '', scheduleID: '' };
  mode.value = 0;
}

const validateFrm = computed (() => {
  if (mode.value == 0){
    if (record.value.name == '' || record.value.lastName == '' ||  record.value.name.length <= 1 || record.value.lastName.length <= 3 || record.value.salary == '' || record.value.email == '' || record.value.phoneNumber == '' || record.value.address == ''){
      return true;
    }
  }else{
    if (record.value.employeeID == '' || record.value.employeeID.length <= 0  || record.value.name == '' || record.value.name.length <= 1 || record.value.lastName == '' || record.value.lastName.length <= 3 || record.value.salary == '' || record.value.email == '' || record.value.phoneNumber == '' || record.value.address == ''){
      return true;
    }
  }
  return false;
});

const msgIncomplete = () => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Faltan campos por llenar',
  });
}


</script>

<template>
  <LayoutView>
    
    <template #Title>
      {{ title }}
    </template>
    
    <template #User>
      {{ credentials != null ? credentials.user : 'No hay usuario'}}
    </template>

    <template #mainContent>
      <div class="mainContainer"> 
        <div class="line">
            <div class="searcher">
                <searcher
                    @eBusqueda="handlerSearch"
                />
            </div>
            
            <div class="formContainer" style="overflow-y: auto;">
              <transition-group name="general">
                <div class="form" v-if="showFrm">
                    <input type="text" placeholder="employee ID" class="inpKey" v-model="record.employeeID" :disabled="mode == 1" v-if="mode == 1">
                    <input type="text" placeholder="Nombre" class="inpName" v-model="record.name">
                    <input type="text" placeholder="Apellido" class="inpDescription" v-model="record.lastName">
                    <span for="department"> Puesto: </span>
                    <select name="department" class="inpDepartment" v-model="record.positionID">
                      <option value="1"> Accountant </option>
                      <option value="2"> Software Engineer </option>
                      <option value="3"> HR Manager </option>
                    </select>
                    <input type="text" placeholder="Salario" class="inpDescription" v-model="record.salary">
                    <input type="text" placeholder="Email" class="inpDescription" v-model="record.email">
                    <input type="text" placeholder="Teléfono" class="inpDescription" v-model="record.phoneNumber">
                    <input type="text" placeholder="Dirección" class="inpDescription" v-model="record.address">
                    <span for="department"> Horario: </span>
                    <select name="department" class="inpDepartment" v-model="record.scheduleID">
                      <option value="1"> 1 </option>
                      <option value="2"> 2 </option>
                      <option value="3"> 3 </option>
                      <option value="4"> 4 </option>
                      <option value="5"> 5 </option>
                    </select>
                    <button class="btAdd" @click="validateFrm ? msgIncomplete() : (mode == 0 ? addNewEmployee() : updateEmployee())"> {{ mode == 0 ? 'Agregar' : 'Actualizar' }} </button>
                </div>
            </transition-group>
            <button class="btAdd" @click="newRecord()"> {{ showFrm == true ? 'Cancelar' : 'Nuevo' }} </button>
            </div>
        </div>

        <div class="tableContainer">
          <table>
            <thead>
                <tr>
                  <th class="col-xs"> ID </th>
                  <th class="col-s"> Nombre </th>
                  <th class="col-s"> Apellido </th>
                  <th class="col-s"> Puesto </th>
                  <th class="col-s"> Salario </th>
                  <th class="col-s"> Email </th>
                  <th class="col-s"> Teléfono </th>
                  <th class="col-s"> Dirección </th>
                  <th class="col-s"> Horario </th>
                  <th class="col-xs"> Acciones </th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employeesList" :key="employee.employeeID">
                <td class="col-xs">{{ employee.employeeID }}</td>
                <td class="col-s col-start">{{ employee.name }}</td>
                <td class="col-a col-start">{{ employee.lastName }}</td>
                <td class="col-s">{{ employee.positionID }}</td>
                <td class="col-a col-start">{{ employee.salary }}</td>
                <td class="col-a col-start">{{ employee.email }}</td>
                <td class="col-a col-start">{{ employee.phoneNumber }}</td>
                <td class="col-s col-start">{{ employee.address }}</td>
                <td class="col-s">{{ employee.scheduleID }}</td>

                <td class="col-xs actions">
                  <div class="btTable">
                    <img class="imgTable" src="@/assets/icons/edit_gray.svg" alt="edit" @click="uploadData(employee)">
                  </div>
                  <div class="btTable">
                    <img class="imgTable" src="@/assets/icons/trash_gray.svg" alt="delete" @click="deleteRecord(employee)">
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

  </LayoutView>
</template>

<style scoped>

.mainContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  min-height: 100%;
  min-width: 100%;
}

.frm{
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
}


input{
  padding: 0.5rem;
  border: 1px solid #37464E;
  border-radius: 0.5rem;
  outline: none;
  padding-left: 1rem;
  height: 2rem;
}
.inpKey{
  width: 10rem;
}
.inpName{
  width: 15rem;
}
.inpDescription{
  width: 20rem;
}
.inpDepartment{
  width: 10rem;
  border: 1px solid #37464E;
  border-radius: 0.5rem;
  outline: none;
  padding-left: 0.5rem;
  height: 2rem;
}
.btAdd{
  width: 10rem;
  height: 2rem;
  margin-left: 1rem;
  margin-top: 0.5rem;
}
.btAdd:hover{
  background-color: #263238;
}

.line{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.searcher,
.formContainer {
  width: 100%;
}

.searcher{
  align-items: flex-end;
  display: flex;
  margin-left: 2rem;
}

.formContainer {
  margin-top: 1rem;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.formContainer > .form {
  display: flex;
  flex-wrap: wrap;
}

.formContainer > .form > * {
  margin-bottom: 0.5rem; 
}

.tableContainer{
  width: 100%;
  /* height: 45rem; */
  flex-grow: 1;
  overflow-y: scroll;

  scrollbar-width: none; 
  -ms-overflow-style: none;
}
th{
  background-color: #37464E;
  color: white;
  letter-spacing: 0.25rem;
}
</style>