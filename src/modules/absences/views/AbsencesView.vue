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
      Swal.fire({
      icon: 'error',
      title: 'Completa todos los campos del formulario',
      showConfirmButton: true,
      confirmButtonText: 'OK',
    });
      return false;
    }
      return true;
  };

  const limitDigits = (event, maxLength) => {
    const value = event.target.value;
    if (value.length > maxLength) {
      event.target.value = value.slice(0, maxLength);
    }
  };

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
                <input type="number" placeholder="absence ID" id="absenceID" class="inpKey" v-model.number="record.absenceID" :disabled="mode == 1" v-if="mode == 1" min="1" max="99999" @input="limitDigits($event, 5)">
                <input type="number" placeholder="Matricula" id="employeeID" class="inpName" v-model.number="record.employeeID" min="1" max="99999" @input="limitDigits($event, 5)">
                <input type="number" placeholder="N. Horario" id="scheduleID" class="inpName" v-model.number="record.scheduleID" min="1" max="99999" @input="limitDigits($event, 5)">
                <input type="text" placeholder="Fecha (YYYY-MM-DD)" id="absenceDate" class="inpDescription" v-model="record.absenceDate" pattern="\d{4}-\d{2}-\d{2}" minlength="10" maxlength="10" min="1900-01-01">
                  <span for="justified"> Justificación: </span>
                  <select name="justified" class="inpjustified" v-model="record.justified">
                      <option value="0" selected>Si</option>
                      <option value="1">No</option>
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
                  <th class="col-xs"> Matricula </th>
                  <th class="col-s col-s"> Nombre </th>
                  <th class="col-s col-s"> Apellido </th>
                  <th class="col-xs"> Horario </th>
                  <th class="col-s"> Fecha </th>
                  <th class="col-xs"> Justificado </th>
                  <th class="col-xs"> Acciones </th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="absence in absencesList" :key="absence.absenceID">
                <td class="col-xs">{{ absence.absenceID }}</td>
                <td class="col-xs">{{ absence.employeeID }}</td>
                <td class="col-xs">{{ absence.Employee.name }}</td>
                <td class="col-xs">{{ absence.Employee.lastName }}</td>
                <td class="col-xs">{{ absence.scheduleID }}</td>
                <td class="col-xs">{{ absence.absenceDate }}</td>
                <td class="col-xs">{{ absence.justified !== 0 ? 'NO' : 'SI' }}</td>
                <td class="col-auto actions">
                  <div class="btTable" v-if="absence.justified === 0">
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
  width: 10rem;
}
.inpDescription{
  width: 15rem;
}
.inpjustified{
  width: 8rem;
  border-radius: 0.5rem;
  outline: none;
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