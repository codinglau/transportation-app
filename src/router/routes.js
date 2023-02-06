const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    props: (route) => ({
        ...route.params,
        ...route.props,
    }),
    children: [
      {
        path: '',
        redirect: (to) => ({
          name: 'home',
          params: {
            lang: to.params.lang || 'tc', // default to traditional chinese
          },
        }),
      },
      {
        path: ':lang',
        children: [
          {
            path: '',
            name: 'home',
            redirect: (to) => ({
              name: 'bus.index',
              params: {
                lang: to.params.lang,
                companyId: to.params.companyId || 'kmb', // default to KMB
              },
            }),
          },
          {
            path: 'bus/:companyId',
            name: 'bus.index',
            component: () => import('pages/bus/RouteListPage.vue'),
            props: (route) => ({ 
              ...route.params,
            }),
          },
        ],
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