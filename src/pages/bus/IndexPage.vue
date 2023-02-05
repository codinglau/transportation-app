<template>
  <q-page padding class="flex flex-center">
    <!-- <div class="fit row justify-center q-col-gutter-sm"> -->
      <!-- label -->
      <!-- <div class="col-12 text-center">
        <q-chip square
            icon="fa-solid fa-map-location"
            :label="data[region].title"
            size="xl"
            color="primary" 
            text-color="white" />
      </div> -->

      <!-- bus companies -->
      <!-- <div class="col-12 col-sm-8 col-md-6">
        <div class="row q-col-gutter-sm">
          <q-intersection
              v-for="company in data[region].companies"
              :key="company.label"
              transition="rotate"
              class="col-6">
            <q-card class="clickable" @click="goToCompanyPage(company)">
              <q-card-section>
                <q-img fit="contain" :src="company.imgSrc" :ratio="40 / 9" />
              </q-card-section>
              <q-card-section class="text-center">
                {{ company.label }}
              </q-card-section>
            </q-card>
          </q-intersection>
        </div>
      </div> -->
    <!-- </div> -->
  </q-page>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useOption } from 'src/constants';

// define props
const props = defineProps({
  // region: {
  //   type: String,
  //   required: true,
  // },
});

// use router
const router = useRouter();

// get global option
// const { regions } = useOption();

// // page data
// const data = reactive({
//   hk: {
//     title: '選擇巴士公司',
//     companies: regions.find(region => region.value === 'hk').busCompanies,
//   },
// });

// // go to company page
// function goToCompanyPage(company) {
//   router.push({ 
//     name: 'bus-company', 
//     params: { 
//       companyId: company.value,
//     } 
//   });
// }
</script>
