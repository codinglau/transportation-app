// @ts-check
import { date } from 'quasar';
import { useCtbNwfbStore } from 'stores/ctb-nwfb-store';

export default function useCtbNwfbService() {
  const ctbNwfbStore = useCtbNwfbStore();

  /**
   * Get bus routes for a CTB/NWFB
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
   * Get bus stops for a given route
   * @param {{ [x:string]: string }} request
   * @returns {Promise<Object[]>}
   */
  async function getBusRouteStopList({ companyId, routeId, direction }) {
    try {
      let busRouteStopList = [];

      // get bus route detail
      const busRouteResponse = await ctbNwfbStore.getBusRouteStopList(companyId, routeId, direction);
      
      // generate actions to get details of each bus stop
      const getBusStopActions = busRouteResponse
        .map((
          /** @type {{ stop: Object; }} */ s
        ) => ctbNwfbStore.getBusStop(s.stop));

      // get bus stop details
      const busStopResponses = await Promise.all(getBusStopActions);
      
      // generate actions to get bus stop ETA
      // const getBusStopEtaListActions = busRouteResponse
      //   .map((
      //     /** @type {{ stop: Object; }} */ s
      //   ) => ctbNwfbStore.getBusEta(companyId, s.stop, routeId));

      // get bus stop ETAs
      // const busStopEtaResponses = await Promise.all(getBusStopEtaListActions);

      // map bus stop details to bus route
      busRouteStopList = busRouteResponse
        .map((
          /** @type {{ stop: Object; }} */ br
        ) => {
          // find bus stop
          const busStop = busStopResponses
            .find((bs) => bs.stop === br.stop);

          // find bus stop ETA
          // const busStopEtas = busStopEtaResponses
          //   .flatMap((bse) => bse)  // flatten array
          //   .filter((bse) => bse.stop === br.stop)  // filter out bus stop ETAs that are not for the current bus stop
          //   .filter((bse) => direction.slice(0, 1).toUpperCase() === bse.dir) // filter out bus stop ETAs that are not for the current direction
          //   .filter((bse) => bse.eta) // filter out bus stop ETAs that are not available
          //   .map((bse) => date.formatDate(bse.eta, 'HH:mm')); // format ETA

          return {
            ...br,
            tc: busStop?.name_tc,
            en: busStop?.name_en,
            // eta: busStopEtas,
          };
        });

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
    getBusRouteList,
    getBusRouteStopList,
    getBusStopEtaList,
  };
}