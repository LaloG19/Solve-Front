<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LayoutView from '@/views/LayoutView.vue';
const title = ref('Departamentos');
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
        <h3>Departments View</h3>
        <p>This is the departments view</p>
      </div>
    </template>

  </LayoutView>
</template>

<style scoped>
</style>