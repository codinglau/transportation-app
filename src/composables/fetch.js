// @ts-check
import { Loading, Notify } from 'quasar';
import { ref } from 'vue';

export default function useFetch() {
  // loading state
  const isLoading = ref(false);

  /**
   * @typedef {Object} defaultConfig - default loading configuration
   * @property {Boolean} enableLoading - default is true; toggle loading state
   * @property {Boolean} renderLoadingSpinner - only works when enableLoading is true; render loading spinner when true
   */
  const defaultConfig = {
    enableLoading: true,  
    renderLoadingSpinner: true,
  };

  /**
   * @param {() => ({ action: Function, request?: Object, config?: Object })} dispatch
   * @param {Function} handleSuccess
   * @param {Function} handleError
   * @example
   * fetch(() => ({
   *  action: store.getUsers, 
   *  request: { page: 1, limit: 10 },
   *  config: { enableLoading: true, renderLoadingSpinner: true },
   * }), (response) => {
   *  users = response.data;
   *  return 'Users fetched successfully.';
   * }, (error) => {
   *  console.log(error);
   *  return 'Failed to fetch users.';
   * }); 
   */
  async function fetch(
    dispatch, 
    handleSuccess, 
    handleError = () => null,
  ) {
    // dispatch action
    const { action, request, config } = dispatch();

    // merge default config with user config
    const mergedConfig = (typeof config === 'object') 
      ? Object.assign({}, defaultConfig, config)
      : Object.assign({}, defaultConfig);

    try {
      // turn on loading if enabled
      if (mergedConfig.enableLoading) {
        isLoading.value = true;

        // render loading spinner if enabled
        if (mergedConfig.renderLoadingSpinner) Loading.show();
      }
      
      
      // throw an error if action is undefined
      if (action === undefined) {
        throw new Error('action is missing.');

      // otherwise, perform action
      } else {
        const response = request ? await action(request) : await action();
        
        // handle success
        if (response && typeof handleSuccess === 'function') {
          const { type, message } = handleSuccess(response);
          if (message) Notify.create({ type, message });
        }
      }

    // catch and handle error
    } catch (error) {
      let message = '';
      
      if (typeof handleError === 'function') {
        message = handleError(error);
      } else {
        message = error.message;
      }

      if (message) Notify.create({ type: 'negative', message: message });
    
    // turn off loading and hide loading spinner
    } finally {
      if (mergedConfig.enableLoading) {
        isLoading.value = false;
        if (mergedConfig.renderLoadingSpinner) Loading.hide();
      }
    }
  }

  return { fetch, isLoading };
}