import {createRouter, createWebHistory} from "vue-router"
import FirstPage from "@/views/FirstPage.vue"
import HomePage from "@/views/HomePage.vue"
import Login from "@/views/Login.vue"
import TeacherQuestionPage from "@/views/teacher/question/TeacherQuestionPage.vue"
import EmptyQuestionPage from "@/views/teacher/question/EmptyQuestionPage.vue"
import AddQuestionPage from "@/views/teacher/question/AddQuestionPage.vue"
import EditQuestionPage from "@/views/teacher/question/EditQuestionPage.vue"
import TeacherAssignmentPage from "@/views/teacher/assignment/TeacherAssignmentPage.vue";
import EmptyAssignmentPage from "@/views/teacher/assignment/EmptyAssignmentPage.vue";
import AddAssignmentPage from "@/views/teacher/assignment/AddAssignmentPage.vue";
import EditAssignmentPage from "@/views/teacher/assignment/EditAssignmentPage.vue";
import CourseNavigator from "@/views/teacher/course/CourseNavigator.vue";
import StudentCourse from "@/components/student/StudentCourse.vue";
import CourseDetail from "@/components/student/CourseDetail.vue";
import SearchResult from "@/components/SearchResult.vue";
import AddCoursePage from "@/views/teacher/course/AddCoursePage.vue";
import CourseViewPage from "@/views/teacher/course/CourseViewPage.vue";

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
                    component: CourseNavigator,
                },
                {
                    path: 'course/add',
                    component: AddCoursePage,
                },
                {
                    path: 'course/info/:courseId',
                    component: CourseViewPage
                },
                {
                    path: 'question',
                    component: TeacherQuestionPage,
                    children: [
                        {
                            path: '',
                            component: EmptyQuestionPage
                        },
                        {
                            path: 'add/:type',
                            component: AddQuestionPage
                        },
                        {
                            path: 'edit/:type/:questionId',
                            component: EditQuestionPage
                        }
                    ]
                },
                {
                    path: 'assignment',
                    component: TeacherAssignmentPage,
                    children: [
                        {
                            path: '',
                            component: EmptyAssignmentPage
                        },
                        {
                            path: 'add',
                            component: AddAssignmentPage
                        },
                        {
                            path: 'edit/:assignmentId',
                            component: EditAssignmentPage
                        }
                    ]
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
                    path: 'course',
                    component: StudentCourse,
                },
                {
                    path: 'assignment'
                },
                {
                    path: 'correct'
                },
                {
                    path: 'CourseDetail/:courseId',
                    name:'CourseDetail',
                    component: CourseDetail,
                },
                {
                    path:'search',
                    component:SearchResult,
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