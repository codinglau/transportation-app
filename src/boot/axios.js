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
  // set default API URL based on the route params
  router.beforeEach((to, from) => {
    const companyId = ('companyId' in to.params) 
      ? to.params.companyId.toUpperCase() 
      : null;
      
    if (companyId) {
      const isValidCompanyId = (companyId in process.env.API);

      if (isValidCompanyId) {
        api.defaults.baseURL = process.env.API[companyId];
      } else {
        router.push({ path: '/404' });
      }
    }
  });

  // Add a request interceptor
  axios.interceptors.request.use((config) => {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  axios.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

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
