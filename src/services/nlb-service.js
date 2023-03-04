// @ts-check
import { useNlbStore } from 'src/stores/nlb-store';

export default function useNlbService() {
  const nlbStore = useNlbStore();

  /**
   * Get bus routes for a NLB
   */
  async function getBusRouteList() {
    try {
      let busRouteList = [];

      const response = await nlbStore.getBusRouteList();

      if (response) {
        // map response to bus routes
        busRouteList = response
          .map((
            /** @type {{ [x: string]: string; }} */ r
          ) => {
            const routeEn = r.routeName_e.split(' > ');
            const routeTc = r.routeName_c.split(' > ');
            return {
              id: r.routeNo,
              origin: {
                en: routeEn[0],
                tc: routeTc[0],
              },
              destination: {
                en: routeEn[1],
                tc: routeTc[1],
              },
            };
          })
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