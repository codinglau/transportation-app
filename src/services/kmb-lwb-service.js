// @ts-check
import { useKmbLwbStore } from 'stores/kmb-lwb-store';

export default function useKmbLwbService() {
  const kmbLwbStore = useKmbLwbStore();

  /**
   * Get bus routes for a KMB/LWB
   */
  async function getBusRouteList() {
    try {
      let busRouteList = [];

      const response = await kmbLwbStore.getBusRouteList();

      if (response) {
        // map response to bus routes
        busRouteList = response
          .map((
            /** @type {{ [x: string]: string; }} */ r
          ) => ({
            id: r.route,
            origin: {
              en: r.orig_en,
              tc: r.orig_tc,
            },
            destination: {
              en: r.dest_en,
              tc: r.dest_tc,
            },
          }))
          .filter((
            /** @type {{ [x: string]: string; }} */ br, 
            /** @type {number} */ i, 
            /** @type {any} */ self
          ) => self.findIndex((
              /** @type {{ id: string; }} */ sr
            ) => sr.id === br.id) === i); // filter out duplicate routes in kmb and lwb route list
      }

      return Promise.resolve(busRouteList);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get bus stops for a given route
   * @param {{ [x:string]: string }} request
   */
  async function getBusRouteStopList({ companyId, routeId, direction }) {
    try {
      let busRouteStopList = [];

      

      return Promise.resolve(busRouteStopList);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    getBusRouteList,
    getBusRouteStopList,
  };
}