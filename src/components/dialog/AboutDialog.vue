<template>
  <q-dialog persistent
      :model-value="modelValue"
      @update:model-value="(value) => $emit('update:modelValue', value)">
    <q-card class="dialog">
      <q-toolbar class="bg-primary text-white justify-between">
        <q-toolbar-title>{{ t(dialogTitle) }}</q-toolbar-title>
        <q-btn flat round dense v-close-popup
            icon="close"
            aria-label="Close" />
      </q-toolbar>
      <q-card flat bordered>
        <q-item>
          <q-item-section avatar>
            <q-avatar :icon="data.language.icon" text-color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>
              {{ t(data.language.label) }}
            </q-item-label>
            <q-item-label>
              <q-card flat bordered>
                <q-btn-toggle spread unelevated no-caps
                    v-model="data.language.value"
                    :options="data.language.options"
                    toggle-color="primary"
                    @update:model-value="setLanguage" />
              </q-card>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>

      <!-- project descriptions -->
      <q-card flat bordered>
        <q-list separator>
          <q-item 
              v-for="item in projectDescriptions"
              :key="item.caption">
            <q-item-section avatar>
              <q-avatar
                  v-if="item.icon" 
                  :icon="item.icon" 
                  text-color="primary" />
              <q-avatar v-else-if="item.imgSrc">
                <q-img :src="item.imgSrc" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label caption>
                {{ t(item.caption) }}
              </q-item-label>
              <q-item-label>
                {{ t(item.label) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

// use route
const route = useRoute();
// use router
const router = useRouter();
// use i18n
const { t, locale } = useI18n({ useScope: 'global' });

// define props
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
});

// define emits
defineEmits(['update:modelValue']);

// page data
const data = reactive({
  language: {
    icon: 'translate',
    label: 'dialog.about.setting.language.label',
    value: computed({
      get: () => route.params?.lang === 'tc' ? 'zh-TW' : 'en-US',
      set: (value) => null
    }),
    options: [
      { 
        label: '繁體中文', 
        value: 'zh-TW' 
      },
      { 
        label: 'English', 
        value: 'en-US' 
      },
    ]
  },
});

// dialog title
const dialogTitle = 'dialog.about.title';

// project descriptions
const projectDescriptions = [
  {
    icon: 'flag',
    label: 'dialog.about.project.purpose.label',
    caption: 'dialog.about.project.purpose.caption',
  },
  {
    icon: 'volunteer_activism',
    label: 'dialog.about.project.about.label',
    caption: 'dialog.about.project.about.caption',
  },
  {
    icon: 'account_tree',
    label: 'dialog.about.project.dataSource.label',
    caption: 'dialog.about.project.dataSource.caption',
  },
  {
    icon: 'lock',
    label: 'dialog.about.project.dataOwnership.label',
    caption: 'dialog.about.project.dataOwnership.caption',
  },
  {
    icon: 'info',
    label: 'dialog.about.project.version.label',
    caption: 'dialog.about.project.version.caption',
  },
  {
    icon: 'bug_report',
    label: 'dialog.about.project.suggestionsOrBugReport.label',
    caption: 'dialog.about.project.suggestionsOrBugReport.caption',
  },
  {
    imgSrc: 'https://github.com/codinglau.png',
    label: 'dialog.about.project.createdBy.label',
    caption: 'dialog.about.project.createdBy.caption',
  },
];

// set language to cookie
function setLanguage(value) {
  // update locale
  locale.value = value;

  // replace the lang param in route
  router.push({ 
    name: route.name,
    params: { 
      ...route.params,
      lang: (value === 'zh-TW') ? 'tc' : 'en', 
    },
    query: {
      ...route.query,
    },
  });
}
</script>

<style scoped lang="scss">
.dialog {
  width: 600px;
  max-width: 90vw;
}
</style>