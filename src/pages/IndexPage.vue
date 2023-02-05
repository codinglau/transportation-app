<template>
  <q-page padding class="flex flex-center">
    test
  </q-page>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useOption } from 'src/constants';

// use router
const router = useRouter();

// get global option
const { regions } = useOption();

// page data
const data = reactive({
  title: '選擇地區',
  regions: regions.slice(),
});

// go to region page
function goToRegionPage(region) {
  router.push({ 
    name: 'region', 
    params: { 
      region: region.value, 
    } 
  });
}
</script>
