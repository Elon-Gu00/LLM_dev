<script setup>
    import {ref, onMounted} from "vue";
    import {apiGetCourseInfo, apiGetTeacherCourse} from "@/apis/courseApis.js";
    import TeacherCourseCard from "@/components/course/TeacherCourseCard.vue";
    import {ElMessage} from "element-plus";
    import {dateToSemester, statusToChinese} from "../../../utils/index.js";
    import PageHeader from "@/components/PageHeader.vue";
    import {Plus} from "@element-plus/icons-vue";
    import {router} from "@/router/index.js";

    const teacherId = localStorage.getItem('teacherId')
    const getCourseList = async () => {
        let result = await apiGetTeacherCourse(teacherId)
        if (result.code === 1) {
            result = await apiGetCourseInfo(result.data[teacherId])
            if (result.code === 1) {
                courseList.value = result.data
            }
            else {
                ElMessage.warning(result.message)
            }
        }
        else {
            ElMessage.warning(result.message)
        }
    }
    onMounted(() => {
        getCourseList()
    })
    const courseList = ref([])

</script>

<template>
    <div class="height-level-2">
        <page-header content="我教的课" />
        <div class="height-level-3">
            <el-scrollbar>
                <div>
                    <div class="course-card-area">
                        <teacher-course-card v-for="(cour, ind) in courseList" :state="cour.state" 
                                             @click="router.push(router.currentRoute.value.path + `/info/${cour.courseId}`)">
                            <template #name>{{ cour.courseName }}</template>
                            <template #date>{{ dateToSemester(cour.createAt) }}</template>
                        </teacher-course-card>
                    </div>
                </div>
                <div class="add-course-button" @click="router.push(router.currentRoute.value.path + '/add')">
                    <el-icon><Plus /></el-icon>
                    <span>创建课程</span>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<style scoped>
    .course-card-area {
        padding: 20px;
        display: flex;
        gap: 30px;
        flex-wrap: wrap;
    }
    .add-course-button {
        margin: 10px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 6px 10px;
        gap: 10px;
        transition: 0.3s;
        cursor: default;
        border-radius: 8px;
        font-weight: bold;
        height: 120px;
        font-size: 30px;
        color: var(--el-color-info-dark-2);
        box-shadow: var(--el-box-shadow);
    }
    .add-course-button:hover {
        cursor: pointer;
        color: var(--el-color-primary);
        box-shadow: 0 12px 32px 4px var(--el-color-primary-light-7),
        0 8px 20px var(--el-color-primary-light-7)
    }
</style>