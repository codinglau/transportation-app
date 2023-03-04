<template>
  <q-page class="flex flex-center">
    <div class="gt-sm column items-center">
      <q-avatar 
          icon="fa-solid fa-route"
          text-color="primary"
          size="8rem" />
      <q-chip 
          icon="info" 
          :label="t(data.yetToSelectLabel)"
          color="transparent"
          text-color="primary"
          size="xl" />
    </div>
    
    <q-card flat class="lt-md fit">
      <Bus.RouteListSkeleton v-if="loading" />
      <Bus.RouteList
          v-else-if="hasRoutes" 
          :options="filteredRoutes" />
      <div v-else class="flex flex-center">
        <q-chip square 
            icon="warning"
            :label="t(data.noDataLabel)"
            color="transparent"
            text-color="primary" />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { Bus } from 'components';

// use i18n
const { t } = useI18n();

// define props
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
    required: true,
  },
  routeList: {
    type: Array,
    default: () => [],
    required: true,
  },
});

// data
const data = reactive({
  yetToSelectLabel: 'page.routeList.yetToSelect',
  noDataLabel: 'layout.drawer.noData',
  searchField: {
    value: '',
    placeholder: 'layout.drawer.search',
  },
});

/** computed properties */
// filter routes
const filteredRoutes = computed(() => {
  // if no search value, return all routes
  if (!data.searchField.value) return props.routeList;

  // else filter routes by search value
  return props.routeList.filter((r) => {
    const target = [r.id, r.origin, r.destination].join(' ').toUpperCase();
    return target.includes(data.searchField.value.toUpperCase());
  });
});

// check if there are any routes
const hasRoutes = computed(() => filteredRoutes.value.length > 0);
</script>
