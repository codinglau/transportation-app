import { boot } from 'quasar/wrappers';
import { useOption } from 'src/constants';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app, router }) => {

  // get global options
  const { regions } = useOption();

  router.beforeEach((to, from) => {
    if ('lang' in to.params) {
      if (['en', 'tc'].includes(to.params.lang)) {
        app.__VUE_I18N__.global.locale.value = (to.params.lang === 'en') 
          ? 'en-US' 
          : 'zh-TW';
      
      } else {
        // for invalid language, redirect to home page
        return { 
          name: 'home',
          params: {
            lang: 'tc',
          }, 
        };
      }
    }
  });
})
