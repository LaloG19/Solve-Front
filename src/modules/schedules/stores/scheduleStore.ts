import { defineStore } from 'pinia'
import ScheduleServices from '../services/ScheduleServices'
import type { ISchedule } from '../interfaces/ISchedule'
import Swal from 'sweetalert2'

const scheduleService = new ScheduleServices()

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    schedules: [] as ISchedule[],
    selecteSchedule: {} as ISchedule
  }),
  actions: {
    async getAllSchedules() {
      this.schedules = await scheduleService.getAllSchedules()
    },

    async updateSchedule(scheduleData: ISchedule) {
      const updatedSchedule = await scheduleService.updateSchedule(scheduleData)
      const index = this.schedules.findIndex(
        (schedule) => schedule.scheduleID === updatedSchedule.scheduleID
      )
      if (index !== -1) {
        this.schedules.splice(index, 1, updatedSchedule)
      }
    },

    async createSchedule(scheduleData: ISchedule) {
      try {
        const newSchedule = await scheduleService.createSchedule(scheduleData)
        this.schedules.push(newSchedule)
        await this.getAllSchedules()
      } catch (error) {
        console.error('Error al crear el horario: ', error)
        throw new Error('Error al crear el horario: ' + error)
      }
    },

    async deleteSchedule(scheduleID: number) {
      try {
        await scheduleService.deleteSchedule(scheduleID)
        this.schedules = this.schedules.filter((schedule) => schedule.scheduleID !== scheduleID)
        await this.getAllSchedules()
      } catch (error) {
        console.error('Error al eliminar el horario:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar el horario',
          text: error.message || 'No se ha podido eliminar el horario.'
        })
      }
    }
  }
})
