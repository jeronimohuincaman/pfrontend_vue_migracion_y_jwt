<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import type { User } from '@/models/UserModel';
import { useUserStore } from '@/stores/userStore';
import { reactive } from 'vue';
import { useSessionStore } from '@/stores/sessionStore';


const authStore = useAuthStore();
const usuario = authStore.auth.data
const sessionStore = useSessionStore();
const userStore = useUserStore();

const usuarios = userStore.users;

console.log(userStore.users)

function logout() {
  authStore.logout();
}
</script>

<template>
  <div class="wrapper">
    <h1>Bienvenido, {{ usuario?.firstname }}!</h1>
    <p>¡Has iniciado sesión correctamente!</p>

    <p>Tiene el rol {{ usuario?.isAdmin === true ? 'Administrador' : 'Usuario Comun' }}</p>

    <h2>Informacion del usuario</h2>
    <p>Payload: {{ sessionStore.data?.token.split(".")[1] }} </p>
    <p>Creado a las: {{ sessionStore.data?.createDate.toLocaleTimeString('en-gb', { hour12: false }) }}</p>
    <p>Expira el: {{ sessionStore.data?.expirationDate.toLocaleTimeString('en-gb', { hour12: false }) }}</p>
    <p>Se refresca a las: {{ sessionStore.data?.refreshDate.toLocaleTimeString('en-gb', { hour12: false }) }}</p>

    <div v-for="user in usuarios" :key="user.id">
      <p>
        <span>{{ user.firstname }} {{ user.lastname }} {{ user.isAdmin === true ? 'Administrador' : 'Usuario comun' }}</span>
      </p>
    </div>

    <button @click="logout">Logout</button>
  </div>
</template>

<style scoped>
.wrapper {
  width: 400px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, .2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  color: #fff;
  padding: 30px 40px;
  border-radius: 15px;
}

.wrapper h1,
p {
  text-align: center;
}
</style>
