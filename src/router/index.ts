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
      path: "/organizer",
      name: "organizer-list",
      component: OrganizerListView,
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
      path: "/event/:id",
      name: "event-layout",
      component: EventLayoutView,
      props: true,
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
});

export default router;
