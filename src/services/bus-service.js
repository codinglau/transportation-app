// @ts-check
import useCtbNwfbService from './ctb-nwfb-service.js';
import useKmbLwbService from './kmb-lwb-service.js';
import useNlbService from './nlb-service.js';
import { useNlbStore } from 'src/stores/nlb-store';

export default function useBusService() {
  const ctbNwfbService = useCtbNwfbService();
  const kmbLwbService = useKmbLwbService();
  const nlbService = useNlbService();

  /**
   * Get bus routes for a given company
   * @param {{ [x:string]: string }} request
   * @returns {Promise<any>}
   */
  async function getBusRoutes({ companyId }) {
    try {
      let busRoutes = [];

      if (['ctb', 'nwfb'].includes(companyId)) {
        busRoutes = await ctbNwfbService.getBusRoutes({ companyId });
      } else if (companyId === 'kmb') {
        busRoutes = await kmbLwbService.getBusRoutes();
      } else if (companyId === 'nlb') {
        busRoutes = await nlbService.getBusRoutes();
      }
      return Promise.resolve(busRoutes);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get bus stops for a given route
   * @param {{ [x:string]: string }} request
   * @returns {Promise<any>}
   */
  async function getBusRoute({ companyId, routeId, direction }) {
    try {
      let busRoute = [];

      if (['nwfb', 'ctb'].includes(companyId)) {
        busRoute = await ctbNwfbService.getBusRoute({ companyId, routeId, direction });
      }

      return Promise.resolve(busRoute);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function getBusStopEta({ companyId, stopId, routeId, direction }) {
    try {
      let busStopEta = [];

      if (['nwfb', 'ctb'].includes(companyId)) {
        busStopEta = await ctbNwfbService.getBusStopEta({ companyId, stopId, routeId, direction });
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    getBusRoutes,
    getBusRoute,
    getBusStopEta,
  };
}