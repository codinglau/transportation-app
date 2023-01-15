
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '',
        name: 'home', 
        component: () => import('pages/IndexPage.vue'), 
      },
    ],
  },
  {
    path: '/:region',
    redirect: { name: 'region' },
    children: [
      {
        path: '',
        name: 'region',
        component: () => import('src/pages/Region.vue'),
        meta: {
          regions: [
            { label: '香港', value: 'hk' },
          ],
        },
      },
      {
        path: ':companyId',
        name: 'company',
        component: () => import('pages/bus/CompanyPage.vue'),
        meta: {
          companuIds: ['ctb', 'nwfb'],
        }
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: '404',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
