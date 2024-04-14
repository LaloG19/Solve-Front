<script setup lang="ts">

</script>

<template>
  <div class="fondo">
    <div class="loginContainer">
      <h1> We're working on it </h1>
      <h2> Login View </h2>
      <RouterLink :to="{ name: 'dashboard' }">Go to Dashboard</RouterLink>
    </div>
  </div>
</template>

<style scoped>

.fondo{
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, #37464E, #7EA2B4);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loginContainer{
  background-color: #CFD8DD;
  padding: 4rem;
  border-radius: 1rem;
  box-shadow: 0.5rem 0.5rem 2rem #37464E;
}
</style>
