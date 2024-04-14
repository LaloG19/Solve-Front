<script setup lang="ts">
import { ref } from 'vue';
import LayoutView from '@/views/LayoutView.vue';

const title = ref('Absences View');
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
        <h3>Absences View</h3>
        <p>This is the absences view</p>
      </div>
    </template>

  </LayoutView>
</template>

<style scoped>
</style>