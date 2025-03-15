import {createRouter, createWebHistory} from "vue-router";
import FirstPage from "@/views/FirstPage.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: FirstPage
        }
    ]
})