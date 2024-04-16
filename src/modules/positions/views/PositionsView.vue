<script setup lang="ts">
import { ref, onMounted, computed} from 'vue';
import LayoutView from '@/views/LayoutView.vue';
import searcher from '../components/searcherPositions.vue';
import { usePosition } from '../stores/position.js';
import Swal from 'sweetalert2';


const store = usePosition();

const title = ref('Puestos');
const credentials = ref( localStorage.getItem('credentials') ? JSON.parse(localStorage.getItem('credentials')) : null );
const positionsList = ref([]);
const mode = ref(0);
const showFrm = ref(false);
const record = ref({ positionID: '', name: '', description: '', departmentID: '' });

onMounted(() => {
  loadPositions();
});

const loadPositions = () => {
  store.loadPositions().then((res) => {
    if (res){
      positionsList.value = store.getPositionsList;
    }
  });
}
const addNewPosition = () => {
  console.log('Agregando nuevo registro');
  store.createPosition(record.value).then((res) => {
    if (res){
      loadPositions();
    }
    cleanFrm();
  });
}
const updatePosition = () => {
  console.log('Actualizando registro');
  store.updatePosition(record.value).then((res) => {
    if (res){
      loadPositions();
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
  record.value.positionID = recordData.positionID;
  record.value.name = recordData.name;
  record.value.description = recordData.description;
  record.value.departmentID = recordData.departmentID;

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
      store.deletePosition(recordData.positionID).then((res) => {
        if (res){
          loadPositions();
        }
      });
    }
  });
}
const handlerSearch = (value) => {
  if (value) {
  if (store.getPositionsList.length > 0){
    positionsList.value = store.getPositionsList;
  }else{
    loadPositions();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se encontraron registros con ese criterio de búsqueda',
    });
  }
  } else {
    loadPositions();
  }

  cleanFrm();
}
const cleanFrm = () => {
  record.value = { positionID: '', name: '', description: '', departmentID: '' };
  mode.value = 0;
}

const msgIncomplete = () => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Faltan campos por llenar: ' + JSON.stringify(record.value),
  });
}

const validateFrm = computed (() => {
  if (mode.value == 0){
    if (record.value.name == '' || record.value.description == '' || record.value.departmentID == '' || record.value.name.length > 3 || record.value.description.length > 3 || record.value.departmentID.length > 0){
      return true;
    }
  }else{
    if (record.value.positionID == '' || record.value.positionID.length > 0  || record.value.name == '' || record.value.name.length > 3 || record.value.description == '' || record.value.description.length > 3|| record.value.departmentID == '' || record.value.name.length > 0){
      return true;
    }
  }
  return false;
});

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
                    <input type="text" placeholder="position ID" class="inpKey" v-model="record.positionID" :disabled="mode == 1" v-if="mode == 1">
                    <input type="text" placeholder="Name" class="inpName" v-model="record.name">
                    <input type="text" placeholder="Description" class="inpDescription" v-model="record.description">
                    <span for="department"> Departamento: </span>
                    <select name="department" class="inpDepartment" v-model="record.departmentID">
                      <option value="1"> TI </option>
                      <option value="2"> Marketing </option>
                      <option value="3"> Contabilidad </option>
                    </select>
                    <button class="btAdd" @click="validateFrm ? msgIncomplete() : (mode == 0 ? addNewPosition() : updatePosition())" > {{ mode == 0 ? 'Agregar' : 'Actualizar' }} </button>
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
              <tr v-for="position in positionsList" :key="position.positionID">
                <td class="col-xs">{{ position.positionID }}</td>
                <td class="col-s col-start">{{ position.name }}</td>
                <td class="col-a col-start">{{ position.description }}</td>
                <td class="col-s">{{ position.departmentID }}</td>
                <td class="col-xs actions">
                  <div class="btTable">
                    <img class="imgTable" src="@/assets/icons/edit_gray.svg" alt="edit" @click="uploadData(position)">
                  </div>
                  <div class="btTable">
                    <img class="imgTable" src="@/assets/icons/trash_gray.svg" alt="delete" @click="deleteRecord(position)">
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