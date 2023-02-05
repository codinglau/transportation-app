// @ts-check
import { useCtbNwfbStore } from 'stores/ctb-nwfb-store';
import { useKmbLwbStore } from 'stores/kmb-lwb-store';

export default function useBusService() {
  const ctbNwfbStore = useCtbNwfbStore();
  const kmbLwbStore = useKmbLwbStore();

  /**
   * @param {string} companyId
   */
  async function getBusRoutes(companyId) {
    try {
      let busRoutes = [];

      if (Object.keys(process.env.API).includes(companyId.toUpperCase())) {
        let response = null;

        if (['ctb', 'nwfb'].includes(companyId)) {
          response = await ctbNwfbStore.getBusRoutes(companyId);
        } else if ('kmb' === companyId) {
          response = await kmbLwbStore.getBusRoutes(companyId);
        }
        
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