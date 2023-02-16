<template>
  <q-tabs active-bg-color="primary" active-color="white">
    <q-route-tab
        v-for="tab in options"
        :key="tab.value"
        v-bind="tab"
        :label="t(tab.label)"
        :disable="isActiveTab(tab.value)" />
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
