<script setup lang="ts">
import { ref } from 'vue';
import { useEmployee } from '../stores/employees.js';
const store = useEmployee();

const emit = defineEmits('eBusqueda');
const txtSearch = ref('');

const search = () => {
    if (txtSearch.value.length > 0) {
        store.searchEmployee(txtSearch.value).then((res) => {
            if (res) {
                emit('eBusqueda', txtSearch.value);
            }
        });
    } else {
        emit('eBusqueda', '');
    }
}
</script>

<template>
    <div>
        <input type="text" placeholder="Buscar por nombre" name="searcher" @keyup.enter="search()" v-model="txtSearch">
    </div>
</template>

<style scoped>
    input{
        width: 15rem;
        height: 2rem;
        border-radius: 0.5rem;
        outline: none;
        border: 1px solid #37464E;
        padding-left: 0.5rem;
    }
</style>