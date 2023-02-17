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
              name: 'bus.routes',
              params: {
                lang: to.params.lang,
                companyId: to.params.companyId || 'kmb', // default to KMB
              },
            }),
          },
          {
            path: 'bus/:companyId',
            children: [
              {
                path: '',
                name: 'bus.routes',
                component: () => import('pages/bus/RouteListPage.vue'),
              },
              {
                path: ':routeId',
                name: 'bus.route',
                component: () => import('pages/bus/RoutePage.vue'),
                props: (route) => ({
                  ...route.params,
                  ...route.query,
                }),
              }
            ],
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
