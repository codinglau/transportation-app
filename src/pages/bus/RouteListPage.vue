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

    <template v-if="!loading && $q.screen.lt.md">
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab 
            :icon="searchField.isActive ? 'clear' : 'search'"
            color="secondary"
            @click="toggleSearchField" />
      </q-page-sticky>
      <q-page-sticky position="bottom-right" :offset="[80, 18]">
        <q-input outlined
            v-model="searchField.value" 
            ref="searchFieldRef"
            debounce="300"
            :placeholder="t(searchField.placeholder)"
            :class="searchFieldClasses" />
      </q-page-sticky>
    </template>
  </q-page>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
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
});

// #region Search Field
const searchFieldRef = ref(null);
// define search field
const searchField = reactive({
  isActive: false,
  value: '',
  placeholder: 'layout.drawer.search',
});

// toggle search field
function toggleSearchField() {
  searchField.isActive = !searchField.isActive;
  if (searchField.isActive) searchFieldRef.value.focus();
  else searchField.value = '';
};

// toggle search field classes
const searchFieldClasses = computed(() => ({
  'bg-white search-field': true,
  'active': searchField.isActive,
}));
// #endregion

/** computed properties */
// filter routes
const filteredRoutes = computed(() => {
  // if no search value, return all routes
  if (!searchField.value) return props.routeList;

  // else filter routes by search value
  return props.routeList.filter((r) => {
    const target = [r.id, r.origin, r.destination].join(' ').toUpperCase();
    return target.includes(searchField.value.toUpperCase());
  });
});

// check if there are any routes
const hasRoutes = computed(() => filteredRoutes.value.length > 0);
</script>

<style scoped lang="scss">
.search-field {
  opacity: 0;
  width: 0;
  transition: width 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.active {
  opacity: 1;
  width: calc(100vw - 98px);
}
</style>
