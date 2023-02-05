// @ts-check
import { useCtbNwfbStore } from 'stores/ctb-nwfb-store';

const store = useCtbNwfbStore();

export const useCtbNwfbService = {
  /**
   * Get all bus routes
   * @param {string} companyId 
   * @returns 
   */
  async getRoutes(companyId) {
    try {
      // get all routes
      const response = await store.getBusRoutes(companyId);
      const routes = response.map((/** @type {{ route: any; }} */ route) => ({
        routeId: route.route,
        origin: {
          'en-US': route['orig_en'],
          'zh-TW': route['orig_tc'],
        },
        destination: {
          'en-US': route['dest_en'],
          'zh-TW': route['dest_tc'],
        },
      }));
      return Promise.resolve(routes);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}