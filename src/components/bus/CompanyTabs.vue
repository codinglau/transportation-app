<template>
  <q-tabs active-bg-color="primary" active-color="white">
    <q-route-tab exact
        v-for="tab in options"
        :key="tab.value"
        v-bind="tab" />
  </q-tabs>
</template>

<script setup>
defineProps({
  options: {
    type: Array,
    required: true,
  },
});
</script>
