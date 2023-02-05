<template>
  <q-page padding class="q-gutter-y-sm">
    <!-- settings -->
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
  </q-page>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

//use router
const router = useRouter();
// use i18n
const { t, locale } = useI18n({ useScope: 'global' });

// define props
const props = defineProps({
  lang: {
    type: String,
    required: true,
  },
});

// page data
const data = reactive({
  language: {
    icon: 'translate',
    label: 'page.setting.setting.language.label',
    value: computed({
      get: () => props.lang === 'en' ? 'en-US' : 'zh-TW',
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

// project descriptions
const projectDescriptions = [
  {
    icon: 'flag',
    label: 'page.setting.project.purpose.label',
    caption: 'page.setting.project.purpose.caption',
  },
  {
    icon: 'volunteer_activism',
    label: 'page.setting.project.about.label',
    caption: 'page.setting.project.about.caption',
  },
  {
    icon: 'account_tree',
    label: 'page.setting.project.dataSource.label',
    caption: 'page.setting.project.dataSource.caption',
  },
  {
    icon: 'lock',
    label: 'page.setting.project.dataOwnership.label',
    caption: 'page.setting.project.dataOwnership.caption',
  },
  {
    icon: 'info',
    label: 'page.setting.project.version.label',
    caption: 'page.setting.project.version.caption',
  },
  {
    icon: 'bug_report',
    label: 'page.setting.project.bugReport.label',
    caption: 'page.setting.project.bugReport.caption',
  },
  {
    imgSrc: 'https://github.com/codinglau.png',
    label: 'page.setting.project.createdBy.label',
    caption: 'page.setting.project.createdBy.caption',
  },
];

// set language to cookie
function setLanguage(value) {
  // update locale
  locale.value = value;

  // replace the lang param in route
  router.replace({ 
    name: 'settings',
    params: { 
      lang: (value === 'zh-TW') ? 'tc' : 'en', 
    },
  });
}
</script>
