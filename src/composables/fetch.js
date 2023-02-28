// @ts-check
import { Loading, Notify } from 'quasar';
import { reactive, toRefs } from 'vue';

/**
 * @param {[string]} loadingComponents - array of loading components
 */
export default function useFetch(loadingComponents) {
  // check if loadingComponents is an array
  if (!Array.isArray(loadingComponents)) {
    throw new Error('loadingComponents must be an array.');
  }

  // construct loading context
  const loadingContext = loadingComponents.reduce((cxt, component) => {
    // check if component is a string and not empty
    if (typeof component === 'string' && component.length > 0) {
      cxt[component] = false;
    }

    return cxt;
  }, {});

  const loading = reactive({
    ...loadingContext,
    global: false,
  });

  /**
   * @type {Object} defaultConfig - default loading configuration
   * @property {Boolean} enableLoading - default true; toggle loading state
   * @property {string} loadingScope - default 'global'; loading scope (global, component)
   */
  const defaultConfig = {
    enableLoading: true,  
    loadingScope: 'global',
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
  async function fetch(action, request, context) {
    // destructure context
    const {
      config,
      onSuccess,
      onError,
      onFinally
    } = context;

    // merge default config with the config provided by the user
    const { 
      enableLoading, 
      loadingScope 
    } = Object.assign({}, defaultConfig, config);

    // check if loading scope is valid
    if (!loadingScope || !loadingComponents.includes(loadingScope)) {
      throw new Error('Invalid loading scope.');
    }
    
    try {      
      if (action === undefined || typeof action !== 'function') {
        // throw an error if action is undefined
        throw new Error('Missing action or action is not a function.');
      } else if (typeof action === 'function') {
        // turn on loading if enabled
        // render loading spinner if enabled
        if (enableLoading) {
          loading[loadingScope] = true;
          if (loadingScope === 'global') Loading.show();
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
        loading[loadingScope] = false;
        if (loadingScope === 'global') Loading.hide();
      }
      if (typeof onFinally === 'function') {
        onFinally();
      }
    }
  }

  return { 
    fetch, 
    ...toRefs(loading), 
  };
}