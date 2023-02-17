// @ts-check
import { date } from 'quasar';
import { useCtbNwfbStore } from 'stores/ctb-nwfb-store';
import { useKmbLwbStore } from 'stores/kmb-lwb-store';
import { useNlbStore } from 'src/stores/nlb-store';

export default function useBusService() {
  const ctbNwfbStore = useCtbNwfbStore();
  const kmbLwbStore = useKmbLwbStore();
  const nlbStore = useNlbStore();

  /**
   * Get bus routes for a given company
   * @param {{ [x:string]: string }} request
   */
  async function getBusRoutes({ companyId }) {
    try {
      let busRoutes = [];

      if (['ctb', 'nwfb', 'kmb'].includes(companyId)) {
        const response = (companyId === 'kmb') 
          ? await kmbLwbStore.getBusRoutes(companyId)
          : await ctbNwfbStore.getBusRoutes(companyId);

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
              }))
              .filter((
                /** @type {{ [x: string]: string; }} */ br, 
                /** @type {number} */ i, 
                /** @type {any} */ self
              ) => self.findIndex((
                  /** @type {{ id: string; }} */ sr
                ) => sr.id === br.id) === i); // filter out duplicate routes in kmb and lwb route list
          }
      } else if (companyId === 'nlb') {
        const response = await nlbStore.getBusRoutes();

        if (response) {
          // map response to bus routes
          busRoutes = response
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
      }
      return Promise.resolve(busRoutes);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get bus stops for a given route
   * @param {{ [x:string]: string }} request
   */
  async function getBusRoute({ companyId, routeId, direction }) {
    try {
      let busRoute = [];

      if (['nwfb', 'ctb'].includes(companyId)) {
        // get bus route detail
        const busRouteResponse = await ctbNwfbStore.getBusRouteStops(companyId, routeId, direction);
        
        // generate actions to get bus stop details
        const getBusStopActions = busRouteResponse
          .map((
            /** @type {{ stop: Object; }} */ s
          ) => ctbNwfbStore.getBusStop(s.stop));

        // get bus stop details
        const busStopResponses = await Promise.all(getBusStopActions);
        
        // generate actions to get bus stop ETA
        const getBusStopEtaActions = busRouteResponse
          .map((
            /** @type {{ stop: Object; }} */ s
          ) => ctbNwfbStore.getBusEta(companyId, s.stop, routeId));

        // get bus stop details
        const busStopEtaResponses = await Promise.all(getBusStopEtaActions);

        // map bus stop details to bus route
        busRoute = busRouteResponse
          .map((
            /** @type {{ stop: Object; }} */ rs
          ) => {
            // find bus stop
            const busStop = busStopResponses
              .find((bs) => bs.stop === rs.stop);

            // find bus stop ETA
            const busStopEta = busStopEtaResponses
              .flatMap((bse) => bse)
              .filter((bse) => bse.stop === rs.stop)
              .filter((bse) => direction.slice(0, 1).toUpperCase() === bse.dir)
              .filter((bse) => bse.eta)
              .map((bse) => date.formatDate(bse.eta, 'HH:mm'));

            return {
              ...rs,
              tc: busStop?.name_tc,
              en: busStop?.name_en,
              eta: busStopEta,
            };
          });
      }

      return Promise.resolve(busRoute);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    getBusRoutes,
    getBusRoute,
  };
}