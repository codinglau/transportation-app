import { boot } from 'quasar/wrappers';
import axios from 'axios';

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create();

export default boot(({ app, router }) => {
  // set default API URL based on the route
  router.beforeEach((to, from) => {
    if (to.meta.companies?.includes(to.params.companyId.toLowerCase())) {
      api.defaults.baseURL = process.env.API.CTB_NWFB;
    }
  });

  // set default API URL based on the route
  // const apiKey = {
  //   ctb: 'CTB_NWFB',
  //   nwfb: 'CTB_NWFB',
  //   kmb: 'KMB',
  // };

  // const routeParams = window.location.pathname.split('/');
  // if (routeParams.length > 2) {
  //   const companyId = routeParams[2];
  //   const getApiKey = apiKey[companyId];
  //   if (getApiKey) {
  //     api.defaults.baseURL = process.env.API[getApiKey];
  //   }
  // }

  // get route params through navigation guards
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
