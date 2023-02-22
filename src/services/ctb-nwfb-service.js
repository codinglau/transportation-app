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
  async function getBusRoutes({ companyId }) {
    try {
      let busRoutes = [];
      const response = await ctbNwfbStore.getBusRoutes(companyId);

      if (response) {
        // map response to bus routes
        busRoutes = response
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

      return Promise.resolve(busRoutes);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get bus stops for a given route
   * @param {{ [x:string]: string }} request
   * @returns {Promise<Object[]>}
   */
  async function getBusRoute({ companyId, routeId, direction }) {
    try {
      let busRoute = [];

      // get bus route detail
      const busRouteResponse = await ctbNwfbStore.getBusRouteStops(companyId, routeId, direction);
      
      // generate actions to get details of each bus stop
      const getBusStopActions = busRouteResponse
        .map((
          /** @type {{ stop: Object; }} */ s
        ) => ctbNwfbStore.getBusStop(s.stop));

      // get bus stop details
      const busStopResponses = await Promise.all(getBusStopActions);
      
      // generate actions to get bus stop ETA
      // const getBusStopEtaActions = busRouteResponse
      //   .map((
      //     /** @type {{ stop: Object; }} */ s
      //   ) => ctbNwfbStore.getBusEta(companyId, s.stop, routeId));

      // get bus stop ETAs
      // const busStopEtaResponses = await Promise.all(getBusStopEtaActions);

      // map bus stop details to bus route
      busRoute = busRouteResponse
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

      return Promise.resolve(busRoute);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get bus stop ETA
   * @param {{ [x:string]: string }} request
   * @returns {Promise<Object[]>}
   */
  async function getBusStopEta({ companyId, stopId, routeId }) {
    try {
      const eta = await ctbNwfbStore.getBusStopEta(companyId, stopId, routeId);
      console.log(eta);
      return Promise.resolve(eta);
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