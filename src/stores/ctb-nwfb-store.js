import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useCtbNwfbStore = defineStore('ctb-nwfb', {
  state: () => ({
  }),
  getters: {
  },
  actions: {
    // fetch bus company data from API
    async busCompanyData({ companyId }) {
      try {
        const response = await api.get(`company/${companyId}`);
        return Promise.resolve(response.data.data);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  },
});
