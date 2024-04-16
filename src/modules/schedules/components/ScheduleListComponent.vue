<script setup lang="ts">
import { useScheduleStore } from '../stores/scheduleStore'
import type { ISchedule } from '../interfaces/ISchedule'
import { onMounted } from 'vue'
import Swal from 'sweetalert2'

const scheduleStore = useScheduleStore()

onMounted(async () => {
  await getSchedules()
})

const getSchedules = async () => {
  await scheduleStore.getAllSchedules()
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
      console.log(schedule.scheduleID)
      Swal.fire('¡Borrado!', 'El horario ha sido eliminado.', 'success')
    }
  })
}

const deleteSchedule = async (scheduleID: number) => {
  scheduleStore.deleteSchedule(scheduleID)
  console.log(scheduleID)
}

const getDayStatus = (value: boolean, dayName: string) => {
  return value ? `Su día: ${dayName}` : `Descansa el día`
}
</script>

<template>
  <div>
    <h1>Lista de Horarios</h1>
    <div class="scheduleCard">
      <div v-for="schedule in scheduleStore.schedules" :key="schedule.scheduleID" class="schedule">
        <h2>{{ schedule.scheduleID }}</h2>
        <p>{{ schedule.entryTime }}</p>
        <p>{{ schedule.exitTime }}</p>
        <p>{{ getDayStatus(schedule.monday, 'Monday') }}</p>
        <p>{{ getDayStatus(schedule.tuesday, 'Tuesday') }}</p>
        <p>{{ getDayStatus(schedule.wednesday, 'Wednesday') }}</p>
        <p>{{ getDayStatus(schedule.thursday, 'Thursday') }}</p>
        <p>{{ getDayStatus(schedule.friday, 'Friday') }}</p>
        <p>{{ getDayStatus(schedule.saturday, 'Saturday') }}</p>
        <p>{{ getDayStatus(schedule.sunday, 'Sunday') }}</p>
        <button @click="confirmDeleteSchedule(schedule)">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

/* Estilo anterior integrado aquí */
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

/* Estilo adicional para la nueva vista de horarios */
.scheduleCard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
}

.schedule {
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.schedule h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.schedule p {
  margin: 0.5rem 0;
}

.schedule button {
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.schedule button:hover {
  background-color: #b71c1c;
}

</style>
