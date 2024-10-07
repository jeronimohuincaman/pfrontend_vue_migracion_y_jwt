<script setup lang="ts">
import { useAuthStore } from '@/stores/userStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useAuthStore();
const router = useRouter();

// Verificar si el usuario está logueado al montar el componente
onMounted(() => {
  if (!userStore.usuario) {
    // Redirigir al login si el usuario no está logueado
    router.push({ name: 'login' });
  }
});
</script>

<template>
  <div class="wrapper" v-if="userStore.usuario">
    <h1>Bienvenido, {{ userStore.usuario.username }}!</h1>
    <p>¡Has iniciado sesión correctamente!</p>
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
