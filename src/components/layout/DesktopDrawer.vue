<template>
  <q-drawer show-if-above bordered
      :model-value="modelValue"
      @update:model-value="(value) => $emit('update:modelValue', value)"
      class="drawer no-scroll">
    <!-- drawer header -->
    <q-toolbar class="bg-primary text-white">
      <q-avatar icon="fa-solid fa-bus" />
      <q-toolbar-title>巴士路線</q-toolbar-title>
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
            label="Oops...找不到相關巴士路線資料"
            color="transparent"
            text-color="primary" />
      </div>
    </q-scroll-area>

    <!-- drawer search -->
    <q-input outlined dense clearable
        v-model.trim="searchText"
        placeholder="關鍵字搜尋巴士路線"
        clear-icon="close"
        debounce="300">
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- drawer tabs -->
    <Bus.CompanyTabs outside-arrows 
        class="bg-grey-2"
        :options="companies" />
  </q-drawer>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Bus } from 'components';

// search text
const searchText = ref('');

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

/** computed properties */
const filteredRoutes = computed(() => {
  if (!searchText.value) return props.routes;

  return props.routes.filter((r) => {
    const target = [r.id, r.origin, r.destination].join(' ').toUpperCase();
    return target.includes(searchText.value.toUpperCase());
  });
});

  // check if there are any routes
const hasRoutes = computed(() => filteredRoutes.value.length > 0);
</script>
