<template>
  <q-layout view="lHh Lpr lFf">
    <!-- header -->
    <q-header class="gt-sm">
      <q-toolbar>
        <q-btn flat dense round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer" />
        <q-toolbar-title>
          {{ t(title) }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- footer -->
    <q-footer bordered class="lt-md bg-transparent text-dark">
      <!-- company tabs -->
      <Bus.CompanyTabs outside-arrows switch-indicator
          class="bg-primary text-white lt-md"
          active-bg-color="primary"
          indicator-color="white"
          :options="companyList">
        <template #prepend>
          <q-btn unelevated stretch
              icon="fa-solid fa-gear" 
              :aria-label="t(dialogBtnLabel)"
              @click="isDialogOpen = true" />
        </template>
        <template #append>
          <q-btn unelevated stretch
              v-if="returnBtn.show"
              icon="reply" 
              :to="returnBtn.to" />
        </template>
      </Bus.CompanyTabs>
    </q-footer>

    <!-- desktop drawer -->
    <Layout.DesktopDrawer 
        v-if="$q.screen.gt.sm"
        v-model="leftDrawerOpen"
        :loading="loadingRouteList"
        :company-list="companyList"
        :route-list="routeListByLang"
        @on-dialog-open="isDialogOpen = true" />

    <!-- main panel -->
    <q-page-container>
      <router-view />
    </q-page-container>

     <!-- setting dialog -->
     <Dialog.AboutDialog v-model="isDialogOpen" />
  </q-layout>
</template>

<script setup>
import { useMeta, useQuasar } from 'quasar';
import { ref, computed, onBeforeMount, watch, provide } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Bus, Dialog, Layout } from 'components';
import { useFetch } from 'src/composables';
import { useBusService } from 'src/services';
import { useOption } from 'src/constants';

// #region Setup
// use q object
const $q = useQuasar();
// use route
const route = useRoute();
// use i18n
const { t } = useI18n();
// use global option
const option = useOption();
// use fetch 
const { 
  fetch, 
  loadingRouteList 
} = useFetch(['loadingRouteList']);
// use bus service
const { getBusRouteList } = useBusService();
// #endregion

// define props
const props = defineProps({
  lang: {
    type: String,
    default: 'tc',  // default to traditional chinese
    required: true,
  },
  companyId: {
    type: String,
    default: 'kmb', // default to kmb
  },
});

// #region Drawer
// left drawer open state
const leftDrawerOpen = ref(false);

// toggle left drawer
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
// #endregion

// #region Bus Route List
const routeList = ref([]);

// computed bus routes by language
const routeListByLang = computed(
  () => routeList.value.map((r) => ({
    ...r,
    origin: r.origin[props.lang],
    destination: r.destination[props.lang],
  }))
);
// provide bus route list to child component
provide('routeList', routeListByLang);
provide('loadingRouteList', loadingRouteList);

// fetch bus route list
function fetchRouteList(companyId) {
  fetch(getBusRouteList, { companyId }, {
    config: {
      loadingScope: 'loadingRouteList',
    },
    onSuccess(response) {
      routeList.value = response.map((r) => {
        let company = option.busCompanies.find((c) => c.value === companyId);
        return {
          ...r,
          company: company.label,
          color: company.color,
        };
      });
    },
  });
}
// #endregion

// #region Company List
// when it is route stop list page, display the belonging company
// and return to route list page button
// otherwise, display all bus companies
const companyList = computed(() => {
  let companyList = option.busCompanies.map((c) => ({
    ...c,
    to: {
      name: 'bus.routeList',
      params: { companyId: c.value },
    }
  }));

  if(route.name === 'bus.routeStopList' && $q.screen.lt.md) {
    companyList = companyList.filter((c) => c.value === props.companyId);
  }

  return companyList;
});

// return button target
const returnBtn = computed(() => {
  let to = null;
  if (route.name === 'bus.routeStopList') {
    to = {
      name: 'bus.routeList',
      params: {
        lang: route.params.lang,
        companyId: route.params.companyId,
      },
    }
  }

  return {
    show: route.name === 'bus.routeStopList',
    to,
  };
});
// #endregion

// #region Dialog
// dialog open state
const isDialogOpen = ref(false);
const dialogBtnLabel = 'layout.tooltip.about';
// #endregion

// #region Meta
const title = 'layout.header.title';
useMeta(() => ({
  title: t(title),
}));
// #endregion

// reset bus route list when company id changes
watch(() => props.companyId, () => {
  setTimeout(() => {
    fetchRouteList(props.companyId);
  }, 300);
});

// watch screen size changes
watch(() => $q.screen.gt.sm, (newVal) => {
  if (!newVal && route.name === 'bus.routeList') {
    // if screen size is less than sm and current route is bus routes
    // then reset bus route list
    fetchRouteList(props.companyId);
  } else if (newVal) {
    // if screen size is greater than sm, reset bus route list
    fetchRouteList(props.companyId);
  }
});

// fetch bus route list on before mount
onBeforeMount(() => {
  fetchRouteList(props.companyId);
});
</script>

<style scoped lang="scss">
:deep(.drawer) {
  display: flex;
  flex-direction: column;  
  
  .drawer__content {
    flex: 1 1 auto; // fill remaining space
  }
}
</style>
