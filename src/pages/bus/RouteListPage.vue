<template>
  <q-page>
    <q-tabs v-model="data.tab.value" class="fixed-top">
      <q-tab
          v-for="tab in data.tab.options"
          :key="tab.value"
          :name="tab.value"
          :label="t(tab.label)" />
    </q-tabs>
    <BusComponent.RouteList
        :rows="data.routes"
        :isLoading="isLoading" />
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { computed, reactive, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import BusComponent from 'components/bus';
import { useFetch } from 'src/composables';
import BusService from 'src/services/bus';
import { useOption } from 'src/constants';

const $q = useQuasar();
const { t } = useI18n();
const { fetch, isLoading } = useFetch();
const option = useOption();

// define props
const props = defineProps({
  region : {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
});

// define reactive data
const data = reactive({
  tab: {
    value: 'nwfb',
    options: computed(() => option[props.region].busCompanies),
  },
  routes: [],
});

const service = BusService[props.companyId];

// fetch bus routes
function fetchBusRoutes() {
  fetch(() => ({
    action: service.getRoutes,
    request: props.companyId,
    config: {
      renderLoadingSpinner: false,
    }
  }), (response) => {
    data.routes = response.slice();
  });
}

onBeforeMount(() => {
  fetchBusRoutes();
});
</script>
