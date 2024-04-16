<script setup lang="ts">
import { ref, onMounted, computed} from 'vue';
import LayoutView from '@/views/LayoutView.vue';
import searcher from '../components/searcherDepartments.vue';
import { useDepartment } from '../stores/department.js';
import Swal from 'sweetalert2';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const store = useDepartment();

const title = ref('Departamentos');
const credentials = ref( localStorage.getItem('credentials') ? JSON.parse(localStorage.getItem('credentials')) : null );
const departmentsList = ref([]);
const mode = ref(0);
const showFrm = ref(false);
const record = ref({ departmentID: '', name: '', description: '', numberOfEmployees:'0'});

onMounted(() => {
  loadDepartments();
});

const loadDepartments = () => {
  store.loadDepartments().then((res) =>{
    if(res){
      departmentsList.value = store.getDepartmentsList;
    }
  });
}

const addNewDepartment = () => {
  console.log('Agregando nuevo registro');
  store.createDepartment(record.value).then((res) => {
    if(res){
      loadDepartments();
    }
    cleanFrm();
  });
}

const updateDepartment = () =>{
  console.log('Actualizando registro');
  store.updateDepartment(record.value).then((res) => {
    if(res){
      console.log('Se esta cargando');
      loadDepartments();
    }else{
      console.log('No se esta cargando');
    }
    cleanFrm();
  });
}

const newRecord = () =>{
  showFrm.value = !showFrm.value;
  mode.value = 0;
  cleanFrm();
}

const uploadData = (recordData) => {
  record.value.departmentID = recordData.departmentID;
  record.value.name = recordData.name;
  record.value.description = recordData.description;
  record.value.numberOfEmployees = recordData.numberOfEmployees;

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
  }).then((result) =>{
    if(result.isConfirmed){
      store.deleteDepartment(recordData.departmentID).then((res) =>{
        if(res){
          loadDepartments();
        }
      });
    }
  });
}

const handlerSearch = (value) => {
  if (value) {
  if (store.getDepartmentsList.length > 0){
    departmentsList.value = store.getDepartmentsList;
  }else{
    loadDepartments();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se encontraron registros con ese criterio de búsqueda',
    });
  }
  } else {
    loadDepartments();
  }

  cleanFrm();
}

const cleanFrm = () => {
  record.value = { departmentID: '', name: '', description: '', numberOfEmployees:'0'};
  mode.value = 0;
}

const validateFrm = computed (() => {
  if (mode.value == 0){
    if (record.value.name == '' || record.value.description == '' ||  record.value.name.length <= 1 || record.value.description.length <= 3){
      return true;
    }
  }else{
    if (record.value.departmentID == '' || record.value.departmentID.length <= 0  || record.value.name == '' || record.value.name.length <= 1 || record.value.description == '' || record.value.description.length <= 3){
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
            <transition-group name="general">
                <div class="form" v-if="showFrm">
                    <input type="text" placeholder="department ID" class="inpKey" v-model="record.departmentID" :disabled="mode == 1" v-if="mode == 1">
                    <input type="text" placeholder="Name" class="inpName" v-model="record.name">
                    <input type="text" placeholder="Description" class="inpDescription" v-model="record.description">
                    <button class="btAdd" @click="validateFrm ? msgIncomplete() : (mode == 0 ? addNewDepartment() : updateDepartment())" > {{ mode == 0 ? 'Agregar' : 'Actualizar' }} </button>
                </div>
            </transition-group>
            <button class="btAdd" @click="newRecord()"> {{ showFrm == true ? 'Cancelar' : 'Nuevo' }} </button>
        </div>

        <div class="tableContainer">
          <table>
            <thead>
                <tr>
                  <th class="col-xs"> ID </th>
                  <th class="col-s col-start"> Nombre </th>
                  <th class="col-a col-start"> Descripción </th>
                  <th class="col-s"> Departamento </th>
                  <th class="col-xs"> Acciones </th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="department in departmentsList" :key="department.departmentID">
                <td class="col-xs">{{ department.departmentID }}</td>
                <td class="col-s col-start">{{ department.name }}</td>
                <td class="col-a col-start">{{ department.description }}</td>
                <td class="col-s">{{ department.numberOfEmployees }}</td>
                <td class="col-xs actions">
                  <div class="btTable">
                    <img class="imgTable" src="@/assets/icons/edit_gray.svg" alt="edit" @click="uploadData(department)"> 
                  </div>
                  <div class="btTable">
                    <img class="imgTable" src="@/assets/icons/trash_gray.svg" alt="delete" @click="deleteRecord(department)"> 
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

.mainContainer{
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
}
.btAdd:hover{
  background-color: #263238;
}

.btAdd:disabled {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
}

.line{
  margin-bottom: 1rem;
}


.tableContainer{
  width: 100%;
  /* height: 45rem; */
  flex-grow: 1;
  overflow-y: scroll;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Edge */
}
th{
  background-color: #37464E;
  color: white;
  letter-spacing: 0.25rem;
}
</style>