<template>
  <q-list separator>
    <q-item v-for="i in 20" :key="i">
      <q-item-section avatar class="items-center">
        <q-item-label>
          <q-skeleton type="QBadge" />
        </q-item-label>
        <q-item-label>
          <q-skeleton type="QAvatar" />
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
</script>
