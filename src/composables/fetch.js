// @ts-check
import { Loading, Notify } from 'quasar';
import { ref } from 'vue';

export default function useFetch() {
  // loading state
  const isLoading = ref(false);

  /**
   * @type {Object} defaultConfig - default loading configuration
   * @property {Boolean} enableLoading - default true; toggle loading state
   * @property {Boolean} renderLoadingSpinner - only works when enableLoading is true; render loading spinner when true
   */
  const defaultConfig = {
    enableLoading: true,  
    renderLoadingSpinner: true,
  };

  /**
   * @param {Function} action
   * @param {{[x: string]: string}} request
   * @param {{ 
   *  config?: Object,
   *  onSuccess?: Function,
   *  onError?: Function,
   *  onFinally?: Function, 
   * }} context
   */
  async function fetch(
    action, 
    request,
    { config, onSuccess, onError, onFinally }, 
  ) {
    // merge default config with the config provided by the user
    const { 
      enableLoading, 
      renderLoadingSpinner 
    } = Object.assign({}, defaultConfig, config);
    
    try {      
      if (action === undefined || typeof action !== 'function') {
        // throw an error if action is undefined
        throw new Error('Missing action or action is not a function.');
      } else if (typeof action === 'function') {
        // turn on loading if enabled
        // render loading spinner if enabled
        if (enableLoading) {
          isLoading.value = true;
          if (renderLoadingSpinner) Loading.show();
        }
        
        // when action is a function
        // call action with request if request is provided
        const response = await action(request);
        
        // handle success
        if (typeof onSuccess === 'function') {
          const successMsg = onSuccess(response);
          if (successMsg) {
            Notify.create({ type: 'positive', message: successMsg });
          }
        }
      }

    // catch and handle error
    } catch (error) {
      let message = '';
      
      if (typeof onError === 'function') {
        message = onError(error);
      } else {
        message = error.message;
      }

      if (message) Notify.create({ type: 'negative', message: message });
    
    // turn off loading and hide loading spinner
    } finally {
      if (enableLoading) {
        isLoading.value = false;
        if (renderLoadingSpinner) Loading.hide();
      }
      if (typeof onFinally === 'function') {
        onFinally();
      }
    }
  }

  return { fetch, isLoading };
}