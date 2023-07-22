import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './utils/router';
import 'vue-toast-notification/dist/theme-sugar.css';
import './assets/styles.css'
import useAuthStore from '@/store/useAuthStore';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';




const app  = createApp(App);

const pinia = createPinia();

// Add app plugins
app.use(router);
pinia.use(piniaPluginPersistedState);
app.use(pinia);


router.beforeEach((to) => {
    const store  = useAuthStore();
    console.log(store)

    if(to.meta.requireAuth && !store.isAuthenticated) return '/';
});



app.mount('#app')
