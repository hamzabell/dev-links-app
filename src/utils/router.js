import {  createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/HomePage.vue';
import SignUp from '../pages/CreateAccount.vue';
import Dashboard from '../pages/AppDashboard.vue';
import UserProfile from '../pages/UserProfile.vue';
import PreviewProfile from '@/pages/PreviewProfile.vue';


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requireAuth: false }
    },
    {
        path: '/create-account',
        name: 'signup',
        component: SignUp,
        meta: { requireAuth: false }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { requireAuth: true }
    },
    {
        name: 'profile',
        path: '/profile',
        component: UserProfile,
        meta: { requireAuth: true }
    },
    { 
        name: 'preview',
        path: '/preview',
        component: PreviewProfile,
        meta:{ requireAuth: true }

    }

]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router;