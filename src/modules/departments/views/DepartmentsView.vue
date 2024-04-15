<script setup lang="ts">
import { ref } from 'vue';
import LayoutView from '@/views/LayoutView.vue';

const title = ref('Departments View');
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
      <h1 class="page-title">Departments</h1>
      
      <form @submit.prevent="">
        <div class="container-placeholder">
          <input placeholder="Nombre del departamento" class="input-departments-class" name="departmentName" type="text">
          <input placeholder="Descripción" class="input-departments-class" name="description" type="text">
          <button type="submit" class="btn-departments">Agregar</button>          
        </div>
      </form>

      <div>
        <div class="search-container">
          <label for="search" class="search-label">Buscar:</label>
          <input placeholder="Nombre" class="input-search-class" name="departmentName" type="text">
        </div>

        <table class="departments-table">
          <thead>
            <tr>
              <th class="text-center">N°</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Empleados</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">1</td>
              <td>Departamento</td>
              <td>Descripción</td>
              <td>Empleados</td>
              <td>
                <button class="action-button">
                  Edit
                </button>

                <button class="action-button">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    
  </LayoutView>
</template>

<style scoped>

.page-title {
  text-align: center;
  color: #354E5A;
  margin-top: 1rem;
  font-size: 1.7rem;
  font-weight: bold;
}


.container-placeholder {
  display: flex; 
  padding: 1rem 2.5rem 2.5rem 2.5rem;
}
.input-departments-class {
  padding: 0.1rem;
  margin-bottom: 0.9rem;
  margin-right: 1rem; 
  width: 32rem;
  border-radius: 0.5rem;
  border: 1;
  display: block; 
  text-indent: 0.5rem; 
}
.btn-departments {
  transition: all 0.3s ease-in-out;
  width: 14.4rem; 
  height: 2rem; 
  border-radius: 1rem; 
  background: #354E5A;
  outline: none;
  cursor: pointer;
  border: none;
  font-size: 1rem; 
  color: white;
}


.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-left: 2rem
}

.search-label {
  margin-right: 1rem;
  font-size: 1.2rem; /* Tamaño más grande */
  font-weight: bold; /* Negrita */
  color: #354E5A; /* Color de los títulos en la tabla */
}

.input-search-class{
  padding: 0.1rem;
  margin-right: 1rem; 
  width: 20rem;
  border-radius: 0.5rem;
  border: 1;
  display: block; 
  text-indent: 0.5rem; 
}


.departments-table {
  width: 100%;
  border-collapse: collapse;
}

.departments-table th,
.departments-table td {
  border-radius: 0.5rem;
  padding: 8px;
  text-align: center;
}

.departments-table th {
  background-color: #354E5A;
  color: white;
}

.departments-table button {
  margin-right: 5px;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
}

</style>