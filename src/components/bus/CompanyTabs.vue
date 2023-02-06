<template>
  <q-tabs active-bg-color="primary" active-color="white">
    <q-route-tab exact
        v-for="tab in options"
        :key="tab.value"
        v-bind="tab"
        :label="t(tab.label)" />
  </q-tabs>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

// use i18n
const { t } = useI18n();

defineProps({
  options: {
    type: Array,
    required: true,
  },
});
</script>
