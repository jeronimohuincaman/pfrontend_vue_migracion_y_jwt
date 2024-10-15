<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import type { User } from '@/models/UserModel';
import { useUserStore } from '@/stores/userStore';
import { useSessionStore } from '@/stores/sessionStore';

// Stores
const authStore = useAuthStore();
const sessionStore = useSessionStore();
const userStore = useUserStore();

// Datos del usuario autenticado
const usuario = authStore.auth.data;

// Lista de usuarios
const usuarios = userStore.users;

// Función para cerrar sesión
function logout() {
  authStore.logout();
}
</script>

<template>
  <div class="wrapper">
    <!-- Cabecera -->
    <header class="header">
      <h1>Bienvenido, {{ usuario?.firstname }}!</h1>
      <p>¡Has iniciado sesión correctamente!</p>
    </header>

    <!-- Rol del usuario -->
    <section class="user-role">
      <p>Rol: {{ usuario?.isAdmin ? 'Administrador' : 'Usuario Común' }}</p>
    </section>

    <!-- Información de la sesión -->
    <section class="session-info">
      <h2>Información de la sesión</h2>
      <p>Payload: {{ sessionStore.data?.token.split(".")[1] }}</p>
      <p>Creado a las: {{ sessionStore.data?.createDate.toLocaleTimeString('en-gb', { hour12: false }) }}</p>
      <p>Expira a las: {{ sessionStore.data?.expirationDate.toLocaleTimeString('en-gb', { hour12: false }) }}</p>
      <p>Se refresca a las: {{ sessionStore.data?.refreshDate.toLocaleTimeString('en-gb', { hour12: false }) }}</p>
    </section>

    <!-- Lista de usuarios -->
    <section class="user-list">
      <h2>Usuarios</h2>
      <div v-for="user in usuarios" :key="user.id" class="user-item">
        <p>
          {{ user.firstname }} {{ user.lastname }} -
          {{ user.isAdmin ? 'Administrador' : 'Usuario Común' }}
        </p>
      </div>
    </section>

    <!-- Acciones -->
    <div class="actions">
      <button v-if="usuario?.isAdmin">Agregar Usuario</button>
      <button @click="logout">Cerrar Sesión</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 30px;
  border-radius: 15px;
}

.header {
  text-align: center;
}

.user-role,
.session-info,
.user-list {
  margin: 20px 0;
  width: 100%;
}

.user-item {
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.actions button {
  flex: 1;
  margin: 0 5px;
  height: 50px;
  border-radius: 15px;
  border: none;
  outline: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 1.2em;
  font-weight: 600;
  color: #333;
}
</style>
