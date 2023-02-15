<template>
  <q-drawer show-if-above bordered
      :model-value="modelValue"
      @update:model-value="(value) => $emit('update:modelValue', value)"
      class="drawer no-scroll">
    <!-- drawer header -->
    <q-toolbar class="bg-primary text-white">
      <q-avatar icon="fa-solid fa-bus" />
      <q-toolbar-title>{{ t(data.title) }}</q-toolbar-title>

      <q-btn flat round
          icon="fa-solid fa-gear"
          :aria-label="t(data.dialog.btn.label)"
          @click="data.dialog.isOpen = true">
        <q-tooltip>{{ t(data.dialog.btn.label) }}</q-tooltip>
      </q-btn>
    </q-toolbar>

    <!-- drawer content -->
    <q-scroll-area class="drawer__content">
      <Bus.RouteListSkeleton v-if="isLoading" />
      <Bus.RouteList 
          v-else-if="hasRoutes" 
          :routes="filteredRoutes" />
      <div v-else class="flex flex-center">
        <q-chip square 
            icon="warning"
            :label="t(data.noDataLabel)"
            color="transparent"
            text-color="primary" />
      </div>
    </q-scroll-area>

    <!-- drawer search -->
    <q-input outlined dense clearable reverse-fill-mask
        v-model.trim="data.searchField.value"
        clear-icon="close"
        debounce="300"
        mask="X"
        :placeholder="t(data.searchField.placeholder)">
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- drawer tabs -->
    <Bus.CompanyTabs outside-arrows 
        class="bg-grey-2"
        :options="companies" />
    
    <!-- setting dialog -->
    <component :is="data.dialog.name" v-model="data.dialog.isOpen" />
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
  companies: {
    type: Array,
    default: () => [],
    required: true,
  },
  routes: {
    type: Array,
    default: () => [],
    required: true,
  },
  isLoading : {
    type: Boolean,
    required: false,
  },
});

// define emits
defineEmits(['update:modelValue']);

// data context
const data = reactive({
  title: 'layout.drawer.title',
  dialog: {
    name: markRaw(Dialog.SettingDialog),
    isOpen: false,
    btn: {
      label: 'layout.settings',
    },
  },
  noDataLabel: 'layout.drawer.noData', 
  searchField: {
    value: '',
    placeholder: 'layout.drawer.search',
  },
});

/** computed properties */
// filter routes
const filteredRoutes = computed(() => {
  if (!data.searchField.value) return props.routes;

  return props.routes.filter((r) => {
    const target = [r.id, r.origin, r.destination].join(' ').toUpperCase();
    return target.includes(data.searchField.value.toUpperCase());
  });
});

  // check if there are any routes
const hasRoutes = computed(() => filteredRoutes.value.length > 0);
</script>
