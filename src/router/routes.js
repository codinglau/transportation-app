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
            lang: to.params.lang || 'tc', // default language 'tc'
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
                companyId: to.params.companyId || 'nwfb', // default company 'nwfb'
              },
            }),
          },
          {
            path: 'bus/:companyId',
            name: 'bus.index',
            component: () => import('pages/bus/IndexPage.vue'),
            props: (route) => ({ 
              ...route.params,
            }),
          },
          // {
          //   path: ':region',
          //   props: (route) => ({ 
          //     region: route.params.region,
          //     companyId: route.params.companyId,
          //   }),
          //   children: [
          //     {
          //       path: '',
          //       name: 'region',
          //       redirect: (to) => ({
          //         name: 'bus.routeList',
          //         params: {
          //           lang: to.params.lang,
          //           region: to.params.region,
          //           companyId: to.params.companyId || 'nwfb',
          //         },
          //       }),
          //     },
          //   ],
          // },
          {
            path: 'settings',
            name: 'settings',
            component: () => import('pages/SettingPage.vue'),
            props: (route) => ({
              ...route.params,
              renderReturnHomeBtn: true,
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
