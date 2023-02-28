<template>
  <q-drawer show-if-above bordered
      :model-value="modelValue"
      @update:model-value="(value) => $emit('update:modelValue', value)"
      class="drawer no-scroll">
    <!-- drawer header -->
    <q-toolbar class="bg-primary text-white">
      <q-avatar icon="fa-solid fa-bus" />
      <q-toolbar-title>{{ t(title) }}</q-toolbar-title>

      <q-btn flat round dense
          icon="fa-solid fa-gear"
          :aria-label="t(dialog.btn.label)"
          @click="dialog.isOpen = true">
        <q-tooltip>{{ t(dialog.btn.label) }}</q-tooltip>
      </q-btn>
    </q-toolbar>

    <!-- drawer content -->
    <q-scroll-area class="drawer__content">
      <Bus.RouteListSkeleton v-if="loading" />
      <Bus.RouteList 
          v-else-if="isEmptyRouteList" 
          :options="filteredRouteList" />
      <div v-else class="flex flex-center">
        <q-chip square 
            color="transparent"
            icon="warning"
            text-color="primary"
            :label="t(emptyRouteListLabel)" />
      </div>
    </q-scroll-area>

    <!-- drawer search -->
    <q-input outlined dense clearable
        v-model.trim="searchField.value"
        clear-icon="close"
        debounce="300"
        :placeholder="t(searchField.placeholder)">
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- drawer tabs -->
    <Bus.CompanyTabs outside-arrows 
        class="bg-grey-2"
        :options="companyList" />
    
    <!-- setting dialog -->
    <component :is="dialog.name" v-model="dialog.isOpen" />
  </q-drawer>
</template>

<script setup>
import { reactive, computed, markRaw } from 'vue';
import { Bus, Dialog } from 'components';
import { useI18n } from 'vue-i18n';

// use i18n
const { t } = useI18n();

// define props
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  companyList: {
    type: Array,
    default: () => [],
    required: true,
  },
  routeList: {
    type: Array,
    default: () => [],
    required: true,
  },
  loading : {
    type: Boolean,
    default: false,
    required: true,
  },
});

// define emits
defineEmits(['update:modelValue']);

// drawer title
const title = 'layout.drawer.title';

// #region Dialog
const dialog = reactive({
  isOpen: false,
  name: markRaw(Dialog.AboutDialog),
  btn: {
    label: 'layout.tooltip.about',
  },
});
// #endregion

// #region Search Field
const searchField = reactive({
  value: '',
  placeholder: 'layout.drawer.search',
});
// #endregion 

// #region Bus Route List
// filter route list by search field
const filteredRouteList = computed(() => {
  let routeList = [];

  if (!searchField.value) {
    // if search field is empty
    routeList = props.routeList.slice();
  } else {
    // if search field is not empty
    routeList = props.routeList.filter((r) => {
      const target = [r.id, r.origin, r.destination].join(' ').toUpperCase();
      return target.includes(searchField.value.toUpperCase());
    });
  }

  return routeList;
});

// empty route list flag
const isEmptyRouteList = computed(() => filteredRouteList.value.length > 0);

// empty route list label
const emptyRouteListLabel = 'layout.drawer.noData';
// #endregion
</script>
