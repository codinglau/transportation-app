<template>
  <q-page class="row items-stretch">
    <!-- header -->
    <q-header reveal v-if="isRouteListPage" class="lt-md bg-primary">
      <q-item dense>
        <q-item-section avatar>
          <q-avatar icon="swipe_right" text-color="white" />
        </q-item-section>
        <q-item-section class="text-center text-white">
          <q-item-label>
            依滑動方向選擇路線方向
          </q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-avatar icon="swipe_left" text-color="white" />
        </q-item-section>
      </q-item>
      <q-toolbar>
        <q-input outlined dense clearable
            v-model="searchField.value" 
            ref="searchFieldRef"
            debounce="300"
            bg-color="white"
            class="full-width"
            clear-icon="close"
            :placeholder="t(searchField.placeholder)">
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <div class="gt-sm column items-center justify-center col-12">
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
    
    <q-card flat class="lt-md col-12">
      <Bus.RouteListSkeleton v-if="loadingRouteList" />
      <Bus.RouteList
          v-else-if="!isEmptyRouteList" 
          :options="filteredRoutes" />
      <div v-else class="fit flex flex-center">
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
import { computed, reactive, ref, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { Bus } from 'components';

// use i18n
const { t } = useI18n();
// use route
const route = useRoute();

// inject route list and loadingRouteList flag
const routeList = inject('routeList');
const loadingRouteList = inject('loadingRouteList');

// is route list page flag
const isRouteListPage = computed(() => route.name === 'bus.routeList');

// data
const data = {
  yetToSelectLabel: 'page.routeList.yetToSelect',
  noDataLabel: 'layout.drawer.noData',
};

// #region Search Field
const searchFieldRef = ref(null);
// define search field
const searchField = reactive({
  isActive: false,
  value: '',
  placeholder: 'layout.drawer.search',
});
// #endregion

/** computed properties */
// filter routes
const filteredRoutes = computed(() => {
  // if no search value, return all routes
  if (!searchField.value) return routeList.value;

  // else filter routes by search value
  return routeList.value.filter((r) => {
    const target = [r.id, r.origin, r.destination].join(' ').toUpperCase();
    return target.includes(searchField.value.toUpperCase());
  });
});

// empty route list flag
const isEmptyRouteList = computed(() => filteredRoutes.value.length === 0);
</script>

<style scoped lang="scss">
.search-field {
  opacity: 0;
  display: none;
  transition: opacity 0.3s ease-in-out;
}

.active {
  opacity: 1;
  display: block;
}
</style>
