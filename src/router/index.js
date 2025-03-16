import {createRouter, createWebHistory} from "vue-router";
import FirstPage from "@/views/FirstPage.vue";
import HomePage from "@/views/HomePage.vue"
import Login from "@/views/Login.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: FirstPage
        },
        {
            path: '/teacher',
            component: HomePage,
            children: [
                {
                    path: 'course',
                    children: [
                        {
                            path: 'search',
                        }
                    ]
                },
                {
                    path: 'question'
                },
                {
                    path: 'assignment'
                },
                {
                    path: 'correct'
                }
            ]
        },
        {
            path: '/student',
            component: HomePage,
            children: [
                {
                    path: 'course'
                },
                {
                    path: 'assignment'
                },
                {
                    path: 'correct'
                }
            ]
        },
        {
            path: '/administrator',
            component: HomePage,
            children: [
                {
                    path: 'course'
                },
                {
                    path: 'class'
                },
                {
                    path: 'question'
                },
                {
                    path: 'assignment'
                }
            ]
        }
    ]
})