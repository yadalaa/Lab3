import { createRouter, createWebHistory } from "vue-router";
import EventListView from "../views/EventListView.vue";
import AboutView from "../views/AboutView.vue";
import OrganizerListView from "../views/OrganizerListView.vue";
import StudentView from "../views/StudentView.vue";
import EventDetailView from "../views/event/EventDetailView.vue";
import EventEditView from "../views/event/EventEditView.vue";
import EventRegisterView from "../views/event/EventRegisterView.vue";
import EventLayoutView from "../views/event/EventLayoutView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import NetworkErrorView from "../views/NetworkErrorView.vue";
import NProgress from "nprogress";
import EventService from "@/services/EventService";
import { useEventStore } from "@/stores/event";
import AddEventView from '@/views/EventFormView.vue';
import AddOrganizerView from '@/views/OrganizerFormview.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "event-list",
      component: EventListView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || "1"),
      }),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
      component: AboutView,
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: AddEventView
    },
    {
      path: '/add-organizer',
      name: 'add-organizer',
      component: AddOrganizerView
    },
    {
      path: "/organizer",
      name: "organizer-list",
      component: OrganizerListView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || "1"),
      }),
    },
    {
      path: "/student",
      name: "student-info",
      component: StudentView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || "1"),
      }),
    },
    // {
    //   path: '/event/:id',
    //   name: 'event-detail',
    //   component: EventDetailView,
    //   props: true
    // },
    // {
    //   path: '/event/:id/edit',
    //   name: 'event-edit',
    //   component: EventEditView,
    //   props: true
    // },
    // {
    //   path: '/event/:id/register',
    //   name: 'event-register',
    //   component: EventRegisterView,
    //   props: true
    // }
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    
    {
      path: "/event/:id",
      name: "event-layout",
      component: EventLayoutView,
      props: true,
        beforeEnter: (to) => {
          const id: number = parseInt(to.params.id as string)
            const eventStore = useEventStore()
          return EventService.getEventByID(id).then((response) => {
            //need to srt up the data for the component
            eventStore.setEvent(response.data)
          }).catch((error) => {
            if (error.response && error.response.status == 404){
              return {
                name: '404-resource',
                params: { resource: 'event' }
              }
            }else{
              return { name: 'network-error' }
            
            }
          })
        },
      children: [

        {
          path: "/event/:id",
          name: "event-detail",
          component: EventDetailView,
          props: true,
        },
        {
          path: "/event/:id/edit",
          name: "event-edit",
          component: EventEditView,
          props: true,
        },
        {
          path: "/event/:id/register",
          name: "event-register",
          component: EventRegisterView,
          props: true,
        },
      ],
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
    {
      path: "/404/:resource",
      name: "404-resource",
      component: NotFoundView,
      props: true,
    },
    {
      path: "/network-error",
      name: "network-error",
      component: NetworkErrorView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {

      return { top: 0}
    }
  }
});
router.beforeEach(()=>{
  NProgress.start()
})

router.afterEach(()=>{
  NProgress.done()
})
export default router;
