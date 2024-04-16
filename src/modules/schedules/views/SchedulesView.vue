<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Swal from 'sweetalert2'
import LayoutView from '@/views/LayoutView.vue'
import { useScheduleStore } from '../stores/scheduleStore'
import type { ISchedule } from '../interfaces/ISchedule'

const title = ref('Horarios')
const credentials = ref(
  localStorage.getItem('credentials') ? JSON.parse(localStorage.getItem('credentials')) : null
)
const mode = ref(0)
const showFrm = ref(false)
const record = ref({
  scheduleID: 0,
  entryTime: '',
  exitTime: '',
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false
})

const scheduleStore = useScheduleStore()
const displayedSchedules = computed(() => scheduleStore.schedules)

const addSchedule = async () => {
  try {
    if (!validateForm()) return

    const scheduleData = {
      ...record.value,
      entryTime: record.value.entryTime.trim(),
      exitTime: record.value.exitTime.trim(),
      monday: !!record.value.monday,
      tuesday: !!record.value.tuesday,
      wednesday: !!record.value.wednesday,
      thursday: !!record.value.thursday,
      friday: !!record.value.friday,
      saturday: !!record.value.saturday,
      sunday: !!record.value.sunday
    }

    const newSchedule = await scheduleStore.createSchedule(scheduleData)
    if (newSchedule && newSchedule.scheduleID) {
      scheduleStore.schedules.push(newSchedule)
      cleanFrm()
      Swal.fire('¡Éxito!', 'El horario ha sido agregado.', 'success')
    } else {
      console.error('newSchedule or newSchedule.scheduleID is undefined')
    }
  } catch (error) {
    console.error('Error al agregar el horario: ', error)
    Swal.fire({
      icon: 'error',
      title: 'Error al agregar el horario',
      text: error.message || 'No se ha podido agregar el horario.'
    })
  }
}

const updateSchedule = async () => {
  try {
    if (!validateForm()) return

    const scheduleData = {
      ...record.value,
      entryTime: record.value.entryTime.trim(),
      exitTime: record.value.exitTime.trim(),
      monday: !!record.value.monday,
      tuesday: !!record.value.tuesday,
      wednesday: !!record.value.wednesday,
      thursday: !!record.value.thursday,
      friday: !!record.value.friday,
      saturday: !!record.value.saturday,
      sunday: !!record.value.sunday
    }

    await scheduleStore.updateSchedule(scheduleData)
    await getSchedules()
    Swal.fire('¡Éxito!', 'El horario ha sido actualizado.', 'success')
    cleanFrm()
    showFrm.value = false
  } catch (error) {
    console.error('Error al actualizar el horario: ', error)
    Swal.fire({
      icon: 'error',
      title: 'Error al actualizar el horario',
      text: error.message || 'No se ha podido actualizar el horario.'
    })
  }
}

const editSchedule = (schedule: ISchedule) => {
  if (schedule) {
    record.value = { ...schedule }
    mode.value = 1
    showFrm.value = true
  }
}

const confirmDeleteSchedule = async (schedule: ISchedule) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, bórralo!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteSchedule(schedule.scheduleID)
      Swal.fire('¡Borrado!', 'El horario ha sido eliminado.', 'success')
    }
  })
}

const deleteSchedule = async (scheduleID: number) => {
  scheduleStore.deleteSchedule(scheduleID)
}

const newRecord = () => {
  if (showFrm.value) {
    showFrm.value = false
    mode.value = 0
    cleanFrm()
  } else {
    showFrm.value = true
    mode.value = 0
    cleanFrm()
  }
}

const validateTime = (event) => {
  const timeRegex = /^\d{2}:\d{2}:\d{2}$/
  const inputValue = event.target.value

  if (!timeRegex.test(inputValue)) {
    console.log('El formato de tiempo es incorrecto. Utiliza el formato 00:00:00')
  } else {
    console.log('Formato de tiempo válido')
  }
}

const validateForm = () => {
  const timeRegex = /^\d{2}:\d{2}:\d{2}$/

  if (!record.value.entryTime.trim() || !record.value.exitTime.trim()) {
    Swal.fire({
      icon: 'error',
      title: 'Los horatios deben estar llenos',
      text: 'Se llenan de este formato 00:00:00.'
    })
    return false
  }

  if (
    !timeRegex.test(record.value.entryTime.trim()) ||
    !timeRegex.test(record.value.exitTime.trim())
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Formato de tiempo incorrecto',
      text: 'Utiliza el formato 00:00:00 para los horarios de entrada y salida.'
    })
    return false
  }

  if (
    !record.value.monday &&
    !record.value.tuesday &&
    !record.value.wednesday &&
    !record.value.thursday &&
    !record.value.friday &&
    !record.value.saturday &&
    !record.value.sunday
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Días no seleccionados',
      text: 'Debe seleccionar al menos un día.'
    })
    return false
  }

  return true
}

const cleanFrm = () => {
  record.value = {
    scheduleID: 0,
    entryTime: '',
    exitTime: '',
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  }
}

onMounted(async () => {
  await getSchedules()
})

const getSchedules = async () => {
  await scheduleStore.getAllSchedules()
}
</script>

<template>
  <LayoutView>
    <template #Title>
      {{ title }}
    </template>

    <template #User>
      {{ credentials != null ? credentials.user : 'No hay user' }}
    </template>

    <template #mainContent>
      <div class="mainContainer">
        <div class="line">
          <transition-group name="general">
            <div class="form" v-show="showFrm">
              <input
                type="text"
                placeholder="Entry Time (HH:MM:SS)"
                id="entryTime"
                class="inpTime"
                v-model="record.entryTime"
                pattern="\d{2}:\d{2}:\d{2}"
                maxlength="8"
                minlength="8"
                @input="validateTime($event)"
              />

              <input
                type="text"
                placeholder="Exit Time (HH:MM:SS)"
                id="exitTime"
                class="inpTime"
                v-model="record.exitTime"
                pattern="\d{2}:\d{2}:\d{2}"
                maxlength="8"
                minlength="8"
                @input="validateTime($event)"
              />

              <div class="daysCheckboxes">
                <label
                  ><input type="checkbox" v-model="record.monday" value="Monday" />Monday</label
                >
                <label
                  ><input type="checkbox" v-model="record.tuesday" value="Tuesday" />Tuesday</label
                >
                <label
                  ><input
                    type="checkbox"
                    v-model="record.wednesday"
                    value="Wednesday"
                  />Wednesday</label
                >
                <label
                  ><input
                    type="checkbox"
                    v-model="record.thursday"
                    value="Thursday"
                  />Thursday</label
                >
                <label
                  ><input type="checkbox" v-model="record.friday" value="Friday" />Friday</label
                >
                <label
                  ><input
                    type="checkbox"
                    v-model="record.saturday"
                    value="Saturday"
                  />Saturday</label
                >
                <label
                  ><input type="checkbox" v-model="record.sunday" value="Sunday" />Sunday</label
                >
              </div>

              <button
                class="btAdd"
                @click="mode == 0 ? addSchedule() : updateSchedule()"
                onclick="return validateForm()"
              >
                {{ mode == 0 ? 'Agregar' : 'Actualizar' }}
              </button>
            </div>
          </transition-group>
          <button class="btAdd" @click="newRecord()">
            {{ showFrm == true ? 'Cancelar' : 'Nuevo' }}
          </button>
        </div>

        <div class="tableContainer">
          <table>
            <thead>
              <tr>
                <th class="col-xs">ID</th>
                <th class="col-s col-center">EntryTime</th>
                <th class="col-a col-center">ExitTime</th>
                <th class="col-xs col-center">Monday</th>
                <th class="col-xs col-center">Tuesday</th>
                <th class="col-xs col-center">Wednesday</th>
                <th class="col-xs col-center">Thursday</th>
                <th class="col-xs col-center">Friday</th>
                <th class="col-xs col-center">Saturday</th>
                <th class="col-xs col-center">Sunday</th>
                <th class="col-xs col-center">Boton</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="schedule in displayedSchedules" :key="schedule.scheduleID">
                <td class="col-xs col-center">{{ schedule.scheduleID }}</td>
                <td class="col-s col-center">{{ schedule.entryTime }}</td>
                <td class="col-s col-center">{{ schedule.exitTime }}</td>
                <td
                  class="col-xs col-center"
                  :class="{ 'bg-green': schedule.monday, 'bg-red': !schedule.monday }"
                >
                  {{ schedule.monday ? 'Laboral' : 'Descanso' }}
                </td>
                <td
                  class="col-xs col-center"
                  :class="{ 'bg-green': schedule.tuesday, 'bg-red': !schedule.tuesday }"
                >
                  {{ schedule.tuesday ? 'Laboral' : 'Descanso' }}
                </td>
                <td
                  class="col-xs col-center"
                  :class="{ 'bg-green': schedule.wednesday, 'bg-red': !schedule.wednesday }"
                >
                  {{ schedule.wednesday ? 'Laboral' : 'Descanso' }}
                </td>
                <td
                  class="col-xs col-center"
                  :class="{ 'bg-green': schedule.thursday, 'bg-red': !schedule.thursday }"
                >
                  {{ schedule.thursday ? 'Laboral' : 'Descanso' }}
                </td>
                <td
                  class="col-xs col-center"
                  :class="{ 'bg-green': schedule.friday, 'bg-red': !schedule.friday }"
                >
                  {{ schedule.friday ? 'Laboral' : 'Descanso' }}
                </td>
                <td
                  class="col-xs col-center"
                  :class="{ 'bg-green': schedule.saturday, 'bg-red': !schedule.saturday }"
                >
                  {{ schedule.saturday ? 'Laboral' : 'Descanso' }}
                </td>
                <td
                  class="col-xs col-center"
                  :class="{ 'bg-green': schedule.sunday, 'bg-red': !schedule.sunday }"
                >
                  {{ schedule.sunday ? 'Laboral' : 'Descanso' }}
                </td>

                <td class="col-xs actions">
                  <div class="btTable">
                    <img
                      class="imgTable"
                      src="@/assets/icons/edit_gray.svg"
                      alt="edit"
                      @click="editSchedule(schedule)"
                    />
                  </div>
                  <div class="btTable">
                    <img
                      class="imgTable"
                      src="@/assets/icons/trash_gray.svg"
                      alt="delete"
                      @click="confirmDeleteSchedule(schedule)"
                    />
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
  padding: 10px;
}
.frm {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
}
input {
  padding: 0.5rem;
  border: 1px solid #37464e;
  border-radius: 0.5rem;
  outline: none;
  padding-left: 1rem;
  height: 2rem;
}
.inpKey {
  width: 10rem;
}
.inpName {
  width: 15rem;
}
.inpDescription {
  width: 20rem;
}
.inpDepartment {
  width: 10rem;
  border: 1px solid #37464e;
  border-radius: 0.5rem;
  outline: none;
  padding-left: 0.5rem;
  height: 2rem;
}
.btAdd {
  width: 10rem;
  height: 2rem;
}
.btAdd:hover {
  background-color: #263238;
}
.line {
  margin-bottom: 1rem;
}

.tableContainer {
  width: 100%;
  /* height: 45rem; */
  flex-grow: 1;
  overflow-y: scroll;

  scrollbar-width: none;
  -ms-overflow-style: none;
}
th {
  background-color: #37464e;
  color: white;
}

.bg-green {
  background-color: green;
  color: white;
}

.bg-red {
  background-color: red;
  color: white;
}

.daysCheckboxes {
  display: flex;
  justify-content: space-between;
  border-radius: 20px;
  border: 1px solid #000000;
  padding: 4px;
}

.daysCheckboxes label {
  display: flex;
  align-items: center;
}

.daysCheckboxes input[type='checkbox'] {
  margin-right: 5px;
}
</style>
