<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Swal from 'sweetalert2';
  import { useLogin } from '../stores/login.js';

  const router = useRouter();
  const store = useLogin();
  
  const credentials = ref( localStorage.getItem('credentials') ? JSON.parse(localStorage.getItem('credentials')) : { user: '', password: '', adminID: 0 });
  
  if (credentials.value.adminID && credentials.value.adminID > 0) {
    Swal.fire({
      icon: 'info',
      title: 'Ya has iniciado sesión',
      text: 'Serás redirigido al dashboard',
      timer: 1000,
    });
    router.push({ name: 'dashboard' });
  }

  const tryLogin = () => {
    if (!letLogin.value) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La contraseña y el usuario deben tener al menos 5 caracteres',
      });
    }else{
      store.login(credentials.value).then((res) => {
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido: ' + res.user,
            text: 'Has iniciado sesión correctamente',
            timer: 1000,
          });
          credentials.value = res;
          router.push({ name: 'dashboard' });
        }
      });
    }
    
    cleanFrm();
  }
  const cleanFrm = () => {
      credentials.value.user = '';
      credentials.value.password = '';
  }

  const letLogin = computed(() => {
    return (credentials.value.user.length >= 5 && credentials.value.password.length >= 5) ? true : false;
  });
onMounted( () => {
  
});
</script>

<template>
  <div class="fondo">
    <div class="loginContainer">
      <h1>Login</h1>

      <div class="formulario">
        <input type="email" placeholder="Usuario" v-model="credentials.user">
        <input name="password" type="password" placeholder="Password" v-model="credentials.password">

        <button @click="tryLogin">Login</button>
      </div>

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
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0.5rem 0.5rem 2rem #37464E;
  width: 35%;
}
h1{
  text-align: center;
  margin-bottom: 2rem;
  color: #37464E;
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5rem;
  border-bottom: 1px solid #37464E;
  padding-bottom: 1rem;
}

.formulario{
  display: flex;
  flex-direction: column;
  width: 100%;
}

input{
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #fff;
  color: #37464E;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid #37464E;
  outline: none;
}
button{
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: none;
  background-color: #37464E;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1rem;
  width: 80%;
  text-align: center;
  margin: 2rem auto;
  margin-bottom: 0rem;
}
button:hover{
  background-color: rgb(64, 86, 99);
}
</style>