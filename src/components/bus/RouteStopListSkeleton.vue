<template>
  <q-list bordered class="rounded-borders no-padding">
    <q-skeleton type="QToolbar" />
    <q-item v-for="i in 20" :key="i">
      <q-item-section avatar>
        <q-skeleton type="QAvatar" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" />
        </q-item-label>
        <q-item-label>
          <q-skeleton type="text" width="60%" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
</script>
