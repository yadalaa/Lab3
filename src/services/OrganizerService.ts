import apiClient from './AxiosClient'
import type { AxiosResponse  } from 'axios'
import type { EventOrganizer } from '@/type'

export default{
    getOrganizer(perPage: number, page: number): Promise<AxiosResponse<EventOrganizer[]>>{
        return apiClient.get<EventOrganizer[]>('organizers?_limit=' + perPage + '&_page=' + page)
    },
    getOrganizerByID(id: number): Promise<AxiosResponse<EventOrganizer>>{
        return apiClient.get<EventOrganizer>('organizers/' +id.toString())
    },
    saveOrganizer(organizer: EventOrganizer): Promise<AxiosResponse<EventOrganizer>>{
        return apiClient.post<EventOrganizer>('/organizers',organizer)
    },
    getOrganizers(): Promise<AxiosResponse<EventOrganizer[]>> {
        return apiClient.get<EventOrganizer[]>(`/organizers`)
    }
    
}