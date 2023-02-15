<template>
  <q-page class="flex flex-center">
    <div class="gt-sm column items-center">
      <q-avatar 
          icon="fa-solid fa-route"
          text-color="primary"
          size="8rem" />
      <q-chip 
          icon="warning" 
          label="尚未選擇巴士路線"
          color="transparent"
          text-color="primary"
          size="xl" />
    </div>
    
    <q-card class="lt-md fit">
      <Bus.RouteListSkeleton v-if="isLoading" />
      <Bus.RouteList 
          v-else-if="hasRoutes" 
          :routes="filteredRoutes" />
      <div v-else class="flex flex-center">
        <q-chip square 
            icon="warning"
            label="No data available."
            color="transparent"
            text-color="primary" />
      </div>
    </q-card>

    <!-- dialog -->
    <component :is="data.dialog.name" v-model="data.dialog.isOpen" />
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { computed, reactive, markRaw, onBeforeMount, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Bus, Dialog } from 'components';
import { useFetch } from 'src/composables';
import { useBusService } from 'src/services';
import { useOption } from 'src/constants';

// use quasar
const $q = useQuasar();
// use i18n
const { t } = useI18n();
// use composables
const { fetch, isLoading } = useFetch();
// use bus service
const { getBusRoutes } = useBusService();
// use global option
const option = useOption();

// define emit
const emit = defineEmits(['data-bus-routes']);

// define props
const props = defineProps({
  lang: {
    type: String,
    default: 'tc',  // default to traditional chinese
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
});

// data
const data = reactive({
  title: 'layout.header.title',
  busRoute: {
    value: '',
    options: [],
  },
  dialog: {
    name: markRaw(Dialog.SettingDialog),
    isOpen: false,
    btn: {
      label: 'layout.settings',
    },
  },
  noDataLabel: '',
  searchField: {
    value: '',
    placeholder: 'layout.drawer.search',
  },
});

/** computed properties */
// filter routes
const filteredRoutes = computed(() => {
  // add origin and destination by language
  const busRoutes = data.busRoute.options.map((br) => ({
    ...br,
    origin: br.origin[props.lang],
    destination: br.destination[props.lang],
  }));
  
  // if no search value, return all routes
  if (!data.searchField.value) return busRoutes;

  // else filter routes by search value
  return busRoutes.filter((r) => {
    const target = [r.id, r.origin, r.destination].join(' ').toUpperCase();
    return target.includes(data.searchField.value.toUpperCase());
  });
});

  // check if there are any routes
const hasRoutes = computed(() => filteredRoutes.value.length > 0);

// fetch bus routes when company id changes
watch(() => props.companyId, (newCompanyId) => {
  // wait for the company id to be updated before fetching bus routes
  setTimeout(() => {
    fetchBusRoutes(newCompanyId)
  }, 100);
}); 

// fetch bus routes
function fetchBusRoutes(companyId) {
  // emit loading state
  emit('data-bus-routes', { isLoading: true });
  
  fetch(getBusRoutes, { companyId }, {
    config: {
      renderLoadingSpinner: false,
    },
    onSuccess(routes) {
      data.busRoute.options = routes.slice();
    },
    onFinally() {
      // emit bus routes and loading state
      emit('data-bus-routes', {
        options: data.busRoute.options.slice(),
        isLoading: false,
      });
    }
  });
}

// before mount
onBeforeMount(() => {
  fetchBusRoutes(props.companyId);
});
</script>
