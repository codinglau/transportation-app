import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import messages from 'src/i18n';

export default boot(({ app, router }) => {
  // default language
  let lang = 'zh-TW';

  // create i18n instance
  const i18n = createI18n({
    locale: lang,
    globalInjection: true,
    messages
  });

  // set language based on lang parameter in route
  router.beforeEach((to, _) => {
    if ('lang' in to.params) {
      if (['en', 'tc'].includes(to.params.lang)) {
        i18n.global.locale.value = (to.params.lang === 'en') 
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

  // set i18n instance on app
  app.use(i18n);
})
