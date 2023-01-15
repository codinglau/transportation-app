<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue';
import { useCtbNwfbStore } from 'stores/ctb-nwfb-store';
import { useFetch } from 'src/composables';

const store = useCtbNwfbStore();
const { fetch, isLoading } = useFetch();

const data = reactive({
  companyInfo: () => null,
});

// get company info from API
function fetchCompanyInfo() {
  fetch(store.getCompanyInfo, {
    companyId: 'ctb'
  }, 
  (response) => {
    console.log(response);
  });
}

// on before mount hook
onBeforeMount(() => {
});
</script>
