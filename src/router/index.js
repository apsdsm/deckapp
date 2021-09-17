import { createRouter, createWebHistory } from 'vue-router';
import MainScreen from '../views/MainScreen.vue';
import DeckScreen from '../views/DeckScreen.vue';

const routerHistory = createWebHistory();

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            component: MainScreen,
        },
        {
            path: '/deck',
            component: DeckScreen,
        },
    ],
});

export default router;