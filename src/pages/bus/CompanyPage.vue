<template>
  <q-page class="flex flex-center">
    {{ busCompanyData }}
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useCtbNwfbStore } from 'stores/ctb-nwfb-store';
import { useFetch } from 'src/composables';

const route = useRoute();
const ctbNwfbStore = useCtbNwfbStore();
const { fetch, isLoading } = useFetch();
const busCompanyData = ref(null);

// get bus company data from API
function getBusCompanyData() {
  fetch(() => ({
    action: ctbNwfbStore.busCompanyData, 
    request: {
      companyId: route.params.companyId
    }
  }),
  (response) => {
    busCompanyData.value = response;
  });  
}

onBeforeMount(() => {
  getBusCompanyData();
});
</script>
