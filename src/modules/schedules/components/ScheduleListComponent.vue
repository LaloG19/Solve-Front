<template>
  <div>
    <h1>Lista de Horarios</h1>
    <div class="scheduleCard">
      <div v-for="schedule in scheduleStore.schedules" :key="schedule.scheduleID" class="schedule">
        <h2>{{ schedule.scheduleID }}</h2>
        <p>{{ schedule.entryTime }}</p>
        <p>{{ schedule.exitTime }}</p>
        <p>{{ schedule.monday }}</p>
        <p>{{ schedule.tuesday }}</p>
        <p>{{ schedule.wednesday }}</p>
        <p>{{ schedule.thursday }}</p>
        <p>{{ schedule.friday }}</p>
        <p>{{ schedule.saturday }}</p>
        <p>{{ schedule.sunday }}</p>
        <button @click="confirmDeleteSchedule(schedule)">Eliminar</button>
      </div>
    </div>
  </div>
</template>

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
</script>

<style scoped>
.scheduleCard {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.schedule {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;

  box-sizing: border-box;
}
</style>
