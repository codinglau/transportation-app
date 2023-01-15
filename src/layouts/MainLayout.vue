<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer" />
        <q-toolbar-title>{{ data.title }}</q-toolbar-title>
        <q-select borderless dark emit-value map-options
            popup-content-class="bg-white"
            v-model="data.currentRegion"
            :options="data.option.regions">
          <template #prepend>
            <q-icon name="public" color="white" />
          </template>
        </q-select>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above bordered v-model="leftDrawerOpen">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>

        <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useMeta } from 'quasar';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import EssentialLink from 'components/EssentialLink.vue';

// use route
const route = useRoute();

// page data
const data = reactive({
  title: '交通資訊 APP',
  currentRegion: null,
  option: {
    regions: [
      { label: '香港', value: 'hk' },
    ],
  }
});

// set meta
useMeta(() => {
  const region = data.option.regions.find((region) => region.value === data.currentRegion);

  return {
    title: [data.title, region?.label, data.title].join(' | '),
  }
});

const essentialLinks = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
