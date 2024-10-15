import { defineStore } from "pinia";
import type { SessionState } from "@/models/SessionStateModel";

/**
 * Store que se encargara de manejar la sesion del usuario logueado
 */
export const useSessionStore = defineStore('session', {
    state: (): SessionState => ({
        loading: false,
        data: JSON.parse(localStorage.getItem('session-data') || 'null')
    }),
    actions: {
        update(token?: string) {
            if (!token) {
                return console.error('Error al renovar sesion');
            };

            const current_time = new Date();

            this.data = {
                token,
                createDate: current_time,
                expirationDate: new Date(current_time.getTime() + 3 * 60 * 1000),
                refreshDate: new Date(current_time.getTime() + 1 * 60 * 1000)
            };

            localStorage.setItem('session-data', JSON.stringify(this.data));
        },
        clear() {
            localStorage.removeItem('session-data');
            this.data = null;
            
        }
    },
});