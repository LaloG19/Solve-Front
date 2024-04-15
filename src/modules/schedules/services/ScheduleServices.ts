import type { ISchedule } from '../interfaces/ISchedule'

const API_URL = 'https://backup-production-9704.up.railway.app/api/v1/schedule'

//This is the GET url 'https://backup-production-9704.up.railway.app/api/schedule'

//This is the POST url 'https://backup-production-9704.up.railway.app/api/schedule'

//This is the PATCH url 'https://backup-production-9704.up.railway.app/api/schedule'

//This is the DELETE url 'https://backup-production-9704.up.railway.app/api/schedule'

//This is the GET and one schedule by id url 'https://backup-production-9704.up.railway.app/api/schedule/busqueda/{id}'

export default class ScheduleServices {
  async getAllSchedules(): Promise<ISchedule[]> {
    try {
      const response = await fetch(API_URL)
      const data: ISchedule[] = await response.json()
      console.log(data)
      return data
    } catch (error) {
      console.error('Error al buscar los horarios: ', error)
      throw new Error('Error al buscar los horarios : ' + error)
    }
  }

  async getOneSchedule(id: number): Promise<ISchedule> {
    const response = await fetch(`${API_URL}/busqueda/${id}`)
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error('Error al buscar el horario')
    }
  }

  async createSchedule(scheduleData: ISchedule): Promise<ISchedule> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scheduleData)
    })
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error('Error al crear el horario')
    }
  }

  async updateSchedule(scheduleData: ISchedule): Promise<ISchedule> {
    const response = await fetch(`${API_URL}/${scheduleData.scheduleID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scheduleData)
    })
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error('Error al actualizar el horario')
    }
  }

  async deleteSchedule(scheduleID: number): Promise<void> {
    const response = await fetch(`${API_URL}/${scheduleID}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Error al eliminar el horario')
    }
  }
}
