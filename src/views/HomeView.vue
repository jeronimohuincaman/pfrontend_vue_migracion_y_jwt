<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import type { User } from '@/models/UserModel';
import { useUserStore } from '@/stores/userStore';
import { reactive } from 'vue';


const authStore = useAuthStore();
const usuario = authStore.auth.data

function logout() {
  authStore.logout();
}
</script>

<template>
  <div class="wrapper">
    <h1>Bienvenido, {{ usuario.firstname }}!</h1>
    <p>¡Has iniciado sesión correctamente!</p>

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
