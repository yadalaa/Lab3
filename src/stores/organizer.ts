import type { OrganizerItem } from '@/organizer'
import { defineStore } from 'pinia'
export const useOrganizerStore = defineStore('organizer', {
    state: () => ({
        organizer: null as OrganizerItem | null
    }),
    actions: {
        setOrganizer(organizer: OrganizerItem){
            this.organizer = organizer
        }
    }
})