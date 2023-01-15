import { boot } from 'quasar/wrappers';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ router }) => {
  router.beforeEach((to, from) => {
    if (to.name === 'region') {
      // is valid region flag
      const isValidRegion = to.meta.regions.some(
        (region) => region.value === to.params.region);

      // for invalid region, redirect to home page
      if (!isValidRegion){
        return { name: '404' };
      }
    }
  });
})
