// import app from '@/app.vue'

const routes = [
  {
    path: '/',
    redirect: '/test',
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test'),
    meta: {
      title: 'test',
      isMenu: true,
    },
  },
  {
    path: '/utils',
    name: 'utils',
    component: () => import('@/views/utils/index'),
    meta: {
      title: 'utils',
      isMenu: true,
    },
  },
]

export default routes
