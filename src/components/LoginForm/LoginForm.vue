<script setup lang="ts">
import { reactive } from 'vue';
import type { IUser } from '@/models/UserModel';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const usuario = reactive<IUser>({
    username: '',
    password: '',
    rememberMe: false
});

const onSubmit = async (e: Event) => {
    e.preventDefault();

    // Validación básica de los campos
    if (!usuario.username || !usuario.password) {
        return alert('Por favor, complete todos los campos');
    }

    try {
        // Llamada a una función del store para iniciar sesión
        const isLoggedIn = await userStore.login(usuario.username, usuario.password, usuario.rememberMe);

        if (isLoggedIn) {
            // Redirigir al usuario a la página deseada después del logueo exitoso
            router.push({ name: 'home' });
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error durante el logueo:', error);
        alert('Hubo un problema con el logueo. Intente nuevamente.');
    }
};

</script>
<template>
    <div class="wrapper">
        <form @submit.prevent="onSubmit" id="loginForm">
            <h1>Login</h1>

            <div class="input-bx">
                <input v-model="usuario.username" type="text" placeholder="Usuario" required />
                <ion-icon class="icon" name="person-circle"></ion-icon>
            </div>

            <div class="input-bx">
                <input v-model="usuario.password" type="password" name="password" placeholder="Contrasena" required />
                <ion-icon class="icon" name="lock-closed"></ion-icon>
            </div>

            <div class="remember-forgot">
                <label>
                    <input v-model="usuario.rememberMe" type="checkbox" />
                    <span>Recuerdame</span>
                </label>
                <a href="#">Olvidaste tu contrasena</a>
            </div>

            <button type="submit" class="btn">Ingresar</button>
        </form>
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

.wrapper h1 {
    font-size: 3em;
    text-align: center;
}

.wrapper .input-bx {
    position: relative;
    width: 100%;
    height: 50px;
    margin: 30px 0;
}

.wrapper .input-bx input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid rgba(255, 255, 255, .2);
    border-radius: 15px;
    color: #fff;
    padding: 20px 45px 20px 20px;
}

.wrapper .input-bx input::placeholder {
    color: #fff;
}

.wrapper .input-bx .icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5em;
}

.wrapper .remember-forgot {
    display: flex;
    justify-content: space-between;
    font-size: 1.2em;
    margin: -15px 0 15px;
}

.wrapper .remember-forgot label input {
    accent-color: #fff;
    margin-right: 3px;
}

.wrapper .remember-forgot a {
    color: #fff;
    text-decoration: none;
}

.wrapper .remember-forgot a:hover {
    text-decoration: underline;
}

.wrapper button {
    width: 100%;
    height: 50px;
    border-radius: 15px;
    border: none;
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    cursor: pointer;
    font-size: 1.2em;
    font-weight: 600;
    color: #333;
}
</style>