import {createRouter, createWebHistory} from 'vue-router'
import stdmainPage from "@/deprecated/view/student/stdmainPage.vue";
import techmainPage from "@/deprecated/view/teacher/techmainPage.vue";
import login from "@/deprecated/view/login.vue";
import adminPage from "@/deprecated/view/administrator/adminPage.vue";
import studentClass from "@/deprecated/components/student/studentClass.vue";
import studentHomework from "@/deprecated/components/student/studentHomework.vue";
import {ElMessage} from "element-plus";
import TeachClass from "@/deprecated/components/teacher/teachClass.vue";
import CourseDetail from "@/deprecated/components/courseDetail.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            redirect:'/login',
            meta:{requiresAuth: false}
        },
        {
            path:'/login',
            component: login,
            meta:{requiresAuth: false}
        },
        {
            path:'/stdmainpage',
            component:stdmainPage,
            meta:{requiresAuth: true},
            children:[
                {
                    path:'myClass',
                    component:studentClass,
                    meta:{requiresAuth: true},
                },
                {
                    path:'myHomework',
                    component:studentHomework,
                    meta:{requiresAuth: true},
                },
                {
                    path: 'ClassDetail/:courseId',
                    name:'CourseDetail',
                    component: CourseDetail,
                    meta: {requiresAuth: true},
                }
            ]
        },
        {
            path:'/techmainpage',
            component:techmainPage,
            meta:{requiresAuth: true},
            children:[
                {
                    path:'myTeachClass',
                    component:TeachClass,
                    meta:{requiresAuth: true},
                }
            ]

        },
        {
            path:'/adminPage',
            component:adminPage,
            meta:{requiresAuth: true},
        }

    ]

})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.meta && to.meta.requiresAuth;
    const isAuthenticated = !!localStorage.getItem('token');
    if (requiresAuth && !isAuthenticated) {
        ElMessage.error("请先登录!")
        next('/login');
    } else {
        next();
    }
});


export default router;
