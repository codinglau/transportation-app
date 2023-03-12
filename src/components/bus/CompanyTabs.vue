<template>
  <q-tabs
      align="justify"
      active-bg-color="primary" 
      active-color="white" 
      indicator-color="primary">
    <!-- Prepend slot -->
    <slot name="prepend"></slot>
    <q-route-tab
        v-for="tab in options"
        :key="tab.value"
        v-bind="tab"
        :label="t(tab.label)" />
    <!-- Append slot -->
    <slot name="append"></slot>
  </q-tabs>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

// use i18n
const { t } = useI18n();
// use route
const route = useRoute();

// define props
defineProps({
  options: {
    type: Array,
    required: true,
  },
});
</script>
