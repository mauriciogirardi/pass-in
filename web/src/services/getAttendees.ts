/* eslint-disable no-useless-catch */
import { api } from './api'

type GETAttendeesProps = {
  eventId: string
  pageIndex?: string
  query?: string
}

export type AttendeeType = {
  checkedInAt: string
  createdAt: string
  email: string
  id: number
  name: string
}

export type GetAttendeesData = {
  attendees: AttendeeType[]
  total: number
}

export async function getAttendees({
  eventId,
  pageIndex = '0',
  query = '',
}: GETAttendeesProps) {
  try {
    let url = `/events/${eventId}/attendees?pageIndex=${pageIndex}`

    if (query) {
      url = `${url}&query=${query}`
    }

    const { data } = await api.get<GetAttendeesData>(url)
    return data
  } catch (error) {
    throw error
  }
}
