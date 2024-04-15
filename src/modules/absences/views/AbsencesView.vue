<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import LayoutView from '@/views/LayoutView.vue';
  import { useAbsence } from '../stores/absence.js';
  import searcher from '../components/searcherAbsences.vue';
  import Swal from 'sweetalert2';

  const store = useAbsence();

  const title = ref('Faltas');
  const credentials = ref(localStorage.getItem('credentials') ? JSON.parse(localStorage.getItem('credentials')) : null);
  const absencesList = ref([]);
  const mode = ref(0);
  const showFrm = ref(false);
  const record = ref({ absenceID: '', employeeID: '', scheduleID: '', absenceDate: '', justified: '' });

  onMounted(() => {
    loadAbsences();
  });

  const loadAbsences = () => {
    store.loadAbsences().then((res) => {
      if (res) {
        absencesList.value = store.getAbsencesList;
      }
    });
  }

  const addNewAbsence = () => {
    if (!validateForm()) return;
    console.log('Agregando nuevo registro');
    store.createAbsence(record.value).then((res) => {
      if (res) {
        loadAbsences();
      }
      cleanFrm();
    });

  }

  const updateAbsence = () => {
    if (!validateForm()) return;
    console.log('Actualizando registro');
    store.updateAbsence(record.value).then((res) => {
      if (res) {
        loadAbsences();
      }
      cleanFrm();
    });
  }

  const validateForm = () => {
    if (!record.value.employeeID || !record.value.scheduleID || !record.value.absenceDate || !record.value.justified) {
      alert("Por favor completa todos los campos.");
      return false;
    }
    return true;
  }

  const validateNumeric = (event) => {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  const newRecord = () => {
    showFrm.value = !showFrm.value;
    mode.value = 0;
    cleanFrm();
  }

  const uploadData = (recordData) => {
    record.value.absenceID = recordData.absenceID;
    record.value.employeeID = recordData.employeeID;
    record.value.scheduleID = recordData.scheduleID;
    record.value.absenceDate = recordData.absenceDate;
    record.value.justified = recordData.justified;

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
        store.deleteAbsence(recordData.absenceID).then((res) => {
          if (res) {
            loadAbsences();
          }
        });
      }
    });
  }

  const handlerSearch = (value) => {
    if (value) {
      if (store.getAbsencesList.length > 0) {
        absencesList.value = store.getAbsencesList;
      } else {
        loadAbsences();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se encontraron registros con ese criterio de búsqueda',
        });
      }
    } else {
      loadAbsences();
    }

    cleanFrm();
  }

  const cleanFrm = () => {
    record.value = { absenceID: '', employeeID: '', scheduleID: '', absenceDate: '', justified: '' };
    mode.value = 0;
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
                <input type="text" placeholder="absence ID" id="absenceID" class="inpKey" v-model="record.absenceID" :disabled="mode == 1" v-if="mode == 1" maxlength="10" minlength="1" @input="validateNumeric($event)">
                <input type="text" placeholder="employee ID" id="employeeID" class="inpKey" v-model="record.employeeID" maxlength="10" minlength="1" @input="validateNumeric($event)">
                <input type="text" placeholder="schedule ID" id="scheduleID" class="inpKey" v-model="record.scheduleID" maxlength="10" minlength="1" @input="validateNumeric($event)">
                <input type="text" placeholder="Date (YYYY-MM-DD)" id="absenceDate" class="inpDate" v-model="record.absenceDate" pattern="\d{4}-\d{2}-\d{2}" maxlength="10" minlength="1" @input="validateNumeric($event)">
                  <span for="justified"> Justificación: </span>
                  <select name="justified" class="inpjustified" v-model="record.justified">
                      <option value="0"> Si </option>
                      <option value="1"> No </option>
                  </select>
                  <button class="btAdd" @click="mode == 0 ? addNewAbsence() : updateAbsence()" onclick="return validateForm()"> {{ mode == 0 ? 'Agregar' : 'Actualizar' }} </button>
              </div>
            </transition-group>
            <button class="btAdd" @click="newRecord()"> {{ showFrm == true ? 'Cancelar' : 'Nuevo' }} </button>
        </div>

        <div class="tableContainer">
          <table>
            <thead>
                <tr>
                  <th class="col-xs"> ID </th>
                  <th class="col-s col-start"> Matricula </th>
                  <th class="col-a col-start"> Horario </th>
                  <th class="col-s"> Fecha </th>
                  <th class="col-s"> justificacion </th>
                  <th class="col-xs"> Acciones </th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="absence in absencesList" :key="absence.absenceID">
                <td class="col-xs">{{ absence.absenceID }}</td>
                <td class="col-s col-start">{{ absence.employeeID }}</td>
                <td class="col-a col-start">{{ absence.scheduleID }}</td>
                <td class="col-s">{{ absence.absenceDate }}</td>
                <td class="col-s">{{ absence.justified }}</td>
                <td class="col-xs actions">
                  <div class="btTable">
                    <img class="imgTable" src="@/assets/icons/edit_gray.svg" alt="edit" @click="uploadData(absence)">
                  </div>
                  <div class="btTable">
                    <img class="imgTable" src="@/assets/icons/trash_gray.svg" alt="delete" @click="deleteRecord(absence)">
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