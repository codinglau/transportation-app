<template>
  <q-page class="flex flex-center">
    <q-card flat class="gt-sm">
      <q-card-section class="column items-center">
        <q-avatar 
            icon="fa-solid fa-route"
            text-color="primary"
            size="8rem" />
        <q-chip 
            icon="info" 
            label="尚未選擇巴士路線"
            color="transparent"
            text-color="primary"
            size="xl" />
      </q-card-section>
    </q-card>
    <q-card class="lt-md fit">
      <q-scroll-area class="fit">
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
      </q-scroll-area>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed, reactive, onBeforeMount, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Bus } from 'components';
import { useFetch } from 'src/composables';
import { useBusService } from 'src/services';
import { useOption } from 'src/constants';

// use i18n
const { t } = useI18n();
// use composables
const { fetch, isLoading } = useFetch();
// use bus service
const { getBusRoutes } = useBusService();
// use global option
const option = useOption();

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
  noDataLabel: '',
  searchField: {
    value: '',
    placeholder: 'layout.drawer.search',
  },
});

/** handle bus data */
// fetch bus routes when company id changed
watch(() => props.companyId, (newCId) => {
  fetchBusRoutes(newCId);
});

/** computed properties */
// filter routes
const filteredRoutes = computed(() => {
  if (!data.searchField.value) return data.busRoute.options;

  return data.busRoute.options.filter((r) => {
    const target = [r.id, r.origin, r.destination].join(' ').toUpperCase();
    return target.includes(data.searchField.value.toUpperCase());
  });
});

  // check if there are any routes
const hasRoutes = computed(() => filteredRoutes.value.length > 0);

function fetchBusRoutes(companyId) {
  fetch(() => ({
    action: getBusRoutes,
    request: companyId,
    config: {
      renderLoadingSpinner: false,
    },
  }),
  (routes) => {
    data.busRoute.options = routes.slice();
  });
}

// before mount
onBeforeMount(() => {
  fetchBusRoutes(props.companyId);
});
</script>

