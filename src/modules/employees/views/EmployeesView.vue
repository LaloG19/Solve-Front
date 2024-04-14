<script setup lang="ts">
import { ref } from 'vue';
import LayoutView from '@/views/LayoutView.vue';

const title = ref('Employees View');
const user = ref('User 123');

</script>

<template>
  <LayoutView>
    
    <template #Title>
      {{ title }}
    </template>
    
    <template #User>
      {{ user }}
    </template>

    <template #mainContent>
      <div>
        <h3>Employees View</h3>
        <p>This is the employees view</p>
      </div>
    </template>

  </LayoutView>
</template>

<style scoped>
</style>