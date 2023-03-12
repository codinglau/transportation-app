// @ts-check
import { date } from 'quasar';
import { useCtbNwfbStore } from 'stores/ctb-nwfb-store';

export default function useCtbNwfbService() {
  const ctbNwfbStore = useCtbNwfbStore();

  /**
   * Get a bus route info, e.g. origin, destination, etc.
   * @param {{ [x:string]: string }} request
   * @returns {Promise<Object>}
   */
  async function getBusRoute({ companyId, routeId }) {
    try {
      const response = await ctbNwfbStore.getBusRoute(companyId, routeId);

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get bus route list for CTB/NWFB
   * @param {{ [x:string]: string }} request
   * @returns {Promise<Object[]>}
   */
  async function getBusRouteList({ companyId }) {
    try {
      let busRouteList = [];
      const response = await ctbNwfbStore.getBusRouteList(companyId);

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
          }));
      }

      return Promise.resolve(busRouteList);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get bus stop list for a given route
   * @param {{ [x:string]: string }} request
   * @returns {Promise<Object>}
   */
  async function getBusRouteStopList({ companyId, routeId }) {
    try {
      const busRouteStopList = {
        inbound: [],
        outbound: [],
      };

      // get both inbound and outbound bus stop lists
      const busRouteStopListActions = Object.keys(busRouteStopList)
        .map((d) => ctbNwfbStore.getBusRouteStopList(companyId, routeId, d));

      const busRouteStopListResponses = await Promise.all(busRouteStopListActions);
      
      // 1. merge inbound and outbound bus stop lists
      // 2. filtter out duplicate bus stops
      // 3. map bus stop actions to bus stop list
      const busStopActions= busRouteStopListResponses
        .flatMap((r) => r)
        .filter((s, i, o) => o.findIndex((t) => (t.stop === s.stop)) === i)
        .map((
          /** @type {{ stop: Object; }} */ s
        ) => ctbNwfbStore.getBusStop(s.stop));
        
      // get bus stop details
      const busStopResponses = await Promise.all(busStopActions);

      // map bus stop details to bus route
      for (const key in busRouteStopList) {
        const directionIdx = key === 'inbound' ? 0 : 1;
        busRouteStopList[key] = busRouteStopListResponses[directionIdx]
          .map((
            /** @type {{ stop: Object; }} */ br
          ) => {
            // find bus stop
            const busStop = busStopResponses
              .find((
                /** @type {{ stop: any; }} */ bs
              ) => bs.stop === br.stop);

            return {
              ...br,
              tc: busStop?.name_tc,
              en: busStop?.name_en,
            };
          });
      }
      
      return Promise.resolve(busRouteStopList);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get bus stop ETA
   * @param {{ [x:string]: string }} request
   * @returns {Promise<Object[]>}
   */
  async function getBusStopEtaList({ companyId, stopId, routeId, direction }) {
    try {
      const response = await ctbNwfbStore.getBusStopEtaList(companyId, stopId, routeId);

      let busStopEtaList = [];
      if (response && Array.isArray(response)) {
        // filter out null values and format ETA
        busStopEtaList = response.filter((r) => r && r.eta);

        // filter out bus stop ETAs that are not for the current direction
        if (direction.toUpperCase() === 'INBOUND') {
          busStopEtaList = busStopEtaList.filter((bse) => bse.dir === 'I');
        } else if (direction.toUpperCase() === 'OUTBOUND') {
          busStopEtaList = busStopEtaList.filter((bse) => bse.dir === 'O');
        }
        
        // format ETA
        if (busStopEtaList.length > 0) {
          busStopEtaList = busStopEtaList.map((bse) => date.formatDate(bse.eta, 'HH:mm'));
        }
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