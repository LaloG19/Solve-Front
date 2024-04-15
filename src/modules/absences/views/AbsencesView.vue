<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LayoutView from '@/views/LayoutView.vue';
const title = ref('Faltas');
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
      
      <div class="container">
        <form @submit.prevent="">
          <div class="container-employee">
            <input placeholder="Matricula del empleado" class="input-employee" name="employee" type="text">
            <div class="container-placeholder">
              <input placeholder="Id del horario" class="input-employee-class" name="date" type="text">
              <input placeholder="Día" class="input-employee-class" name="day" type="text">
              <button type="submit" class="btn">Agregar</button>  
            </div>
          </div>
        </form>

        <div class="search-container">
          <label for="search" class="search-label">Buscar:</label>
          <input placeholder="Buscador" class="input-search-class" name="absencesSearch" type="text">
        </div>

        <table class="absences-table">
          <thead>
            <tr>
              <th class="text-center">N°</th>
              <th>Matricula</th>
              <th>Horario</th>
              <th>Justificado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">1</td>
              <td>21393192</td>
              <td>190</td>
              <td>Si</td>
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

.container{
  padding: 1rem;
}

.page-title {
  text-align: center;
  color: #354E5A;
  margin-top: 1rem;
  font-size: 1.7git rem;
  font-weight: bold;
}

.container-employee {
  text-align: left;
  padding: 2.5rem;
}

.input-employee {
  padding: 0.2rem;
  margin-bottom: 0.9rem;
  width: 45rem;
  border-radius: 1rem;
  border: 1;
  display: block; 
  text-indent: 0.5rem;
}

.container-placeholder {
  display: flex; 
}

.input-employee-class {
  padding: 0.2rem;
  margin-bottom: 0.9rem;
  width: 15rem;
  margin-right: 1rem; 
  width: 14.4rem;
  border-radius: 1rem;
  border: 1;
  display: block; 
  text-indent: 0.5rem; 
}

.btn {
  transition: all 0.3s ease-in-out;
  width: 14.4rem; 
  padding: 0.2rem;  height: 2.5rem; 
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
}

.search-label {
  margin-right: 1rem;
  font-size: 1.2rem;
  font-weight: bold; 
  color: #354E5A; 
}

.input-search-class{
  padding: 0.1rem;
  margin-right: 1rem; 
  width: 20rem;
  border-radius: 0.5rem;
  border-color: #37464E;
  outline: none;
  display: block; 
  text-indent: 0.5rem; 
}

.btn-absences {
  transition: all 0.3s ease-in-out;
  width: 14.4rem; 
  height: 2rem; 
  font-weight: 600;
  letter-spacing: 0.5rem;
  text-transform: uppercase;
  border-radius: 1rem; 
  background: #354E5A;
  outline: none;
  cursor: pointer;
  border: none;
  font-size: 1rem; 
  color: white;
}

.btn-absences:hover {
  background-color: #2c4250; 
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-absences:active {
  transform: translateY(1px);
}

.absences-table {
  width: 100%;
  border-collapse: collapse;
}

.absences-table th,
.absences-table td {
  border-radius: 0.5rem;
  padding: 8px;
  text-align: center;
}

.absences-table th {
  background-color: #354E5A;
  color: white;
}

.absences-table button {
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
