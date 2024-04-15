import { defineStore } from 'pinia'
import ScheduleServices from '../services/ScheduleServices'
import type { ISchedule } from '../interfaces/ISchedule'

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
    async getOneSchedule(scheduleID: number) {
      this.selecteSchedule = await scheduleService.getOneSchedule(scheduleID)
    },
    async createSchedule(scheduleData: ISchedule) {
      const newSchedule = await scheduleService.createSchedule(scheduleData)
      this.schedules.push(newSchedule)
    },
    async updateSchedule(scheduleData: ISchedule) {
      this.selecteSchedule = await scheduleService.updateSchedule(scheduleData)
    },
    async deleteSchedule(scheduleID: number) {
      await scheduleService.deleteSchedule(scheduleID)
      this.schedules = this.schedules.filter((schedule) => schedule.scheduleID !== scheduleID)
    }
  }
})
