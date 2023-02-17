<template>
  <q-list>
    <q-item v-for="i in 12" :key="i">
      <q-item-section avatar>
        <q-skeleton type="QAvatar" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" width="65%" />
        </q-item-label>
        <q-item-label>
          <q-skeleton type="text" width="30%" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
</script>
