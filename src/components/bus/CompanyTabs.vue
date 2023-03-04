<template>
  <q-tabs
      align="justify"
      active-bg-color="dark" 
      active-color="white" 
      indicator-color="primary">
    <q-route-tab
        v-for="tab in options"
        :key="tab.value"
        v-bind="tab"
        :label="t(tab.label)" />
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

// is active tab flag
function isActiveTab(value) {
  return route.params.companyId === value;
}
</script>
