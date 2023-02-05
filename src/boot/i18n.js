import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import messages from 'src/i18n';

export default boot(({ app }) => {
  // default language
  let lang = 'zh-TW';

  // create i18n instance
  const i18n = createI18n({
    locale: lang,
    globalInjection: true,
    messages
  });

  // set i18n instance on app
  app.use(i18n);
})
