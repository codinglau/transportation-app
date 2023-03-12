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
   * Get a bus route info, e.g. origin, destination, etc.
   * @param {{ [x:string]: string }} request
   * @returns {Promise<Object>}
   */
  async function getBusRoute({ companyId, routeId }) {
    try {
      const response = await ctbNwfbService.getBusRoute({ companyId, routeId });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get bus routes for a given company
   * @param {{ [x:string]: string }} request
   * @returns {Promise<Array>}
   */
  async function getBusRouteList({ companyId }) {
    try {
      let busRouteList = [];

      if (['ctb', 'nwfb'].includes(companyId)) {
        busRouteList = await ctbNwfbService.getBusRouteList({ companyId });
      } else if (companyId === 'kmb') {
        busRouteList = await kmbLwbService.getBusRouteList();
      } else if (companyId === 'nlb') {
        busRouteList = await nlbService.getBusRouteList();
      }
      return Promise.resolve(busRouteList);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get bus stops for a given route
   * @param {{ [x:string]: string }} request
   * @returns {Promise<Array>}
   */
  async function getBusRouteStopList({ companyId, routeId }) {
    try {
      let busRouteStopList = [];

      if (['nwfb', 'ctb'].includes(companyId)) {
        busRouteStopList = await ctbNwfbService
          .getBusRouteStopList({ companyId, routeId });
      }

      return Promise.resolve(busRouteStopList);
    } catch (error) {
      return Promise.reject(error);
    }

  }

  /**
   * Get bus stops for a given route
   * @param {{ [x:string]: string }} request
   * @returns {Promise<Array>}
   */
  async function getBusStopEtaList({ companyId, stopId, routeId, direction }) {
    try {
      let busStopEtaList = [];

      if (['nwfb', 'ctb'].includes(companyId)) {
        busStopEtaList = await ctbNwfbService.getBusStopEtaList({ companyId, stopId, routeId, direction });
      }

      return Promise.resolve(busStopEtaList);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    getBusRoute,
    getBusRouteList,
    getBusRouteStopList,
    getBusStopEtaList,
  };
}