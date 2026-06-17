import { createRouter, createWebHistory } from 'vue-router'

import { availability } from '@/api/user'
import duration from '@/utils/duration'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('@/views/UserView.vue'),
    async beforeEnter(to, from, next) {
      const data = { type: 'availability', uid: to.params.id }
      const result = await availability(data)
      if (result.data.status === 'success') {
        next()
      } else {
        next('/user/404')
      }
    },
  },
  {
    path: '/coming',
    name: 'coming',
    component: () => import('@/views/event-info/ComingView.vue'),
  },
  {
    path: '/end',
    name: 'end',
    component: () => import('@/views/event-info/EndView.vue'),
  },
  {
    path: '/user/404',
    name: 'user404',
    component: () => import('@/views/exception/UserNotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const validAccess = duration.validDuration()

  if (validAccess === 'before') {
    if (to.path === '/coming') return next()
    return next('/coming')
  }
  if (validAccess === 'after') {
    if (to.path === '/end') return next()
    return next('/end')
  }
  // duration is valid
  if (to.path === '/coming' || to.path === '/end') {
    return next('/')
  }
  next()
})

export default router
