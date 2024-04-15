<script setup lang="ts">
import LayoutView from '@/views/LayoutView.vue';
import { ref } from 'vue';

const title = ref('Dashboard');
const credentials = ref( localStorage.getItem('credentials') ? JSON.parse(localStorage.getItem('credentials')) : null );
</script>

<template>
  <LayoutView>
    
    <template #Title>
      {{ title }}
    </template>
    
    <template #User>
      {{ credentials != null ? credentials.user : 'No hay user'}}
    </template>

    <template #mainContent>
      <div>
        <h3>Dashboard View</h3>
        <p>This is the dashboard view</p>
      </div>
    </template>

  </LayoutView>
</template>

<style scoped>
</style>