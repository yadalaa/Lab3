<template>
    <h1 class="text-center text-3xl font-bold mb-4" >Organizer For Good</h1>
    <main class="flex flex-col items-center">
      <OrganizerCard v-for="event in events" :key="event.id" :event="event"></OrganizerCard>
      <div class="flex w-290 pagination mt-4">
      <RouterLink :to="{name: 'organizer-list', query: {page: page - 1} }" rel="prev" v-if="page != 1" id="page-prev" class="text-left mr-auto">Prev Page</RouterLink>
      <RouterLink :to="{name: 'organizer-list', query: {page: page + 1} }" rel="next" v-if="hasNextPage" id="page-next" class="text-right ml-auto">Next Page</RouterLink>
    </div>
    </main>
  </template>
<script setup lang="ts">
import OrganizerCard from '../components/OrganizerCard.vue'
import type { OrganizerItem } from '@/organizer';
import type { Ref } from 'vue'
import { computed, ref, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import type { AxiosResponse } from 'axios';
import NProgress from 'nprogress'
import { useRouter } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';
import OrganizerService from '@/services/OrganizerService';
const events: Ref<Array<OrganizerItem>> = ref([])
// EventService.getEvent().then((response) => {
//   events.value = response.data
// })
const totalEvent = ref<number>(0)
const perPage = ref<number>(2)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / 3)
  return props.page.valueOf() < totalPages
})
const router = useRouter ()
NProgress
OrganizerService.getOrganizer(3, props.page).then((response: AxiosResponse<OrganizerItem[]>) => {
  events.value = response.data
  totalEvent.value = response.headers['x-total-count']
}).catch(() => {
  router.push({ name: 'NetworkError' })
})
onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  OrganizerService.getOrganizer(3, toPage).then((response: AxiosResponse<OrganizerItem[]>) => {
  events.value = response.data
  totalEvent.value = response.headers['x-total-count']
  next()
  }).catch(() => {
    next({ name: 'NetworkError' })
  })
})
</script>
  
  <style scoped>
  /* .events {
    display: flex;
    flex-direction: column;
    align-items: center;
  } */
  </style>