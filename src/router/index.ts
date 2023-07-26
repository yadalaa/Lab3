import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import OrganizerListView from '../views/OrganizerListView.vue'
import StudentView from '../views/StudentView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
      component: AboutView
    },
    {
      path: '/organizer',
      name: 'organizer-list',
      component: OrganizerListView
    },
    {
      path: '/student',
      name: 'student-info',
      component: StudentView
    }
  ]
})

export default router
