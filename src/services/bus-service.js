// @ts-check
import { useCtbNwfbStore } from 'stores/ctb-nwfb-store';
import { useKmbLwbStore } from 'stores/kmb-lwb-store';
import { useNlbStore } from 'src/stores/nlb-store';

export default function useBusService() {
  const ctbNwfbStore = useCtbNwfbStore();
  const kmbLwbStore = useKmbLwbStore();
  const nlbStore = useNlbStore();

  /**
   * @param {string} companyId
   */
  async function getBusRoutes(companyId) {
    try {
      let busRoutes = [];

      if (Object.keys(process.env.API).includes(companyId.toUpperCase())) {
        let response = null;

        if (['ctb', 'nwfb', 'kmb'].includes(companyId)) {
          response = (companyId === 'kmb') 
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
          response = await nlbStore.getBusRoutes();

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
      }
      
      return Promise.resolve(busRoutes);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    getBusRoutes,
  };
}