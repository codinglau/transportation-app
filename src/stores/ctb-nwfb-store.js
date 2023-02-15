import { defineStore } from 'pinia';
import { api } from 'boot/axios';

// handle response
function handleResponse(response) {
  if (response.data.code === 422) {
    return Promise.reject(response.data.message);
  } else if (response.data.code === 429) {
    return Promise.reject('Too many requests. Please try again later.');
  } else if (response.data.code === 500) {
    return Promise.reject('Server error. Please try again later.');
  }

  return Promise.resolve(response.data.data);
}

export const useCtbNwfbStore = defineStore('ctb-nwfb', {
  state: () => ({
  }),
  getters: {
  },
  actions: {
    // get bus company information from API
    async getBusCompanyInfo(companyId) {
      try {
        const response = await api.get(`company/${companyId}`);
        return handleResponse(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    // get bus routes from API
    async getBusRoutes(companyId) {
      try {
        const response = await api.get(`route/${companyId}`);
        return handleResponse(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    // get bus route information from API
    async getBusRouteInfo(companyId, routeId) {
      try {
        const response = await api.get(`route/${companyId}/${routeId}`);
        return handleResponse(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    // get bus route stops from API
    async getBusRouteStops(companyId, routeId, direction) {
      try {
        const response = await api
          .get(`route-stop/${companyId}/${routeId}/${direction}`);
        return handleResponse(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    // get bus stop from API
    async getBusStop(stopId) {
      try {
        const response = await api.get(`stop/${stopId}`);
        return handleResponse(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    // get bus ETA from API
    async getBusEta(companyId, stopId, routeId) {
      try {
        const response = await api.get(`eta/${companyId}/${stopId}/${routeId}`);
        return handleResponse(response);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  },
});
