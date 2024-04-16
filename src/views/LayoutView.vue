<script setup lang="ts">
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { useLogin } from '@/modules/login/stores/login.js';
const store = useLogin();

const router = useRouter();

const goTo = (id) => {
  switch (id) {
    case 0:
          Swal.fire({
          title: "Cerrar sesión",
          text: "¿Realmente quieres cerrar sesión?",
          icon: "question",
          showDenyButton: true,
          confirmButtonText: "Si, hasta luego",
          denyButtonText: `No, aún no`,
          confirmButtonColor: "#307351",
          denyButtonColor: "#A22522",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem('credentials');
            router.push({ name: 'login' });
          }
        });
      break;
    case 1:
      router.push({ name: 'employeesList' });
      break;
    case 2:
      router.push({ name: 'schedulesList' });
      break;
    case 3:
      router.push({ name: 'absencesList' });
      break;
    case 4:
      router.push({ name: 'departments' });
      break;
    case 5:
      router.push({ name: 'positionsList' });
      break;
    case 6:
      router.push({ name: 'login' });
      break;
    case 7:
      router.push({ name: 'dashboard' });
      break;
    default:
      break;
  }
};
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <img class="logo" src="@/assets/logo.svg" alt="logo" @click="goTo(0)"/>
    </div>
    <div class="sidebar-list">
      <ul>
        <li class="module" @click="goTo(1)">
          <img class="moduleIcon" src="@/assets/layoutIcons/employee.svg" alt="Trabajadores">
          <a class="moduleText" > Trabajadores </a>
        </li>
        <li class="module" @click="goTo(2)">
          <img class="moduleIcon" src="@/assets/layoutIcons/schedules.svg" alt="Horarios">
          <a class="moduleText" > Horarios </a>
        </li>
        <li class="module" @click="goTo(3)">
          <img class="moduleIcon" src="@/assets/layoutIcons/absence.svg" alt="Faltas">
          <a class="moduleText" > Faltas </a>
        </li>
        <li class="module" @click="goTo(4)">
          <img class="moduleIcon" src="@/assets/layoutIcons/department.svg" alt="Áreas">
          <a class="moduleText" > Áreas </a>
        </li>
        <li class="module" @click="goTo(5)">
          <img class="moduleIcon" src="@/assets/layoutIcons/position.svg" alt="Puestos">
          <a class="moduleText" > Puestos </a>
        </li> 
      </ul>
    </div>    
    <div class="logout" @click="goTo(0)">
      <img class="logoutIcon" src="@/assets/layoutIcons/logout.svg" alt="logout" />
      <span class="logoutText"> Logout </span>
    </div>
  </div>
  <div class="containerALL">
    <div class="navbar">
      <h2 class="navbar-Title">
        <slot name="Title"></slot> 
      </h2>
      <span class="navbar-User">
        <slot name="User"></slot>
      </span>
    </div> 

    <div class="mainContainer">
      <slot name="mainContent"></slot>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  margin: 0;
  padding: 0;
  background-color: #1E2B33;
  height: 3rem;
  justify-content: space-between;
  box-shadow: 0.5rem 0.25rem 1rem #000000;
}
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  width: 8rem;
  max-width: 8rem;
  overflow: hidden;
  background-color: #37464e;
  color: #f0f3fd;
  box-shadow: 0.125rem 0.125rem 1rem #000000;
}

.sidebar-header {
  flex: 0 0 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-list {
  margin-top: 50%;
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.logout {
  flex: 0 0 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  cursor: pointer;
  padding: 1rem;
}
.logout:hover {
  background-color: #2f3c42;
}

h2, p {
  margin: 0;
}

.containerALL {
  height: 100%;
  margin-left: 8rem;
  width: calc(100% - 8rem);
  position: fixed;
  top: 0;
}

h2 {
  margin: 0;
  padding: 0;
  line-height: 3rem;
  padding-left: 1rem;
  letter-spacing: 0.5rem;
}

span {
  line-height: 3rem;
  padding-right: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
}

.logo {
  width: 4rem;
  margin: 1rem 1rem;
  cursor: pointer;
}

.logoutIcon {
  width: 1.5rem;
  margin-right: 0.5rem;
}
.logoutText {
  font-size: 1rem;
  font-weight: 700;
}

.module{
  list-style: none;
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.module:not(:last-child){
  margin-bottom: 2.5rem;
}
.module:hover{
  background-color: #2f3c42;
}
ul{
  padding: 0rem;
}
.moduleText{
  color: #f0f3fd;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.125rem;
  padding: 0rem 0.125rem;
}
.moduleIcon{
  width: 2.5rem;
  margin-bottom: 0.5rem;
  margin: auto;
}

.mainContainer {
  margin: 2rem;
  overflow-y: auto;
  height: calc(100% - 7rem);
  background-color: #F0F3FD;
  border-radius: 1rem;
  box-shadow: 0.125rem 0.125rem 1rem #000000;
  padding: 1rem;
}

.navbar-User, .navbar-Title{
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.5rem;
  padding: 0rem 1rem;
}
.navbar-Title{
  font-size: 1rem;
  text-transform: uppercase;
}
.navbar-User{
  font-size: 1rem;
}
</style>