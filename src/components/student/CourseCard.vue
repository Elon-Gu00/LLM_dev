<script setup>
import {ref} from "vue";
import {MoreFilled} from "@element-plus/icons-vue";
import {router} from "@/router/index.js";
import {apiStudentJoinCourse} from "@/apis/courseApis.js";
import {ElMessage} from "element-plus";

const props = defineProps({
    courseName: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    my_courseList: { //用于判断是否在这个课程里
        type: Array,
        required: true
    }
})

let my_courseList = ref(props.my_courseList)
let dialogVisible = ref(false)

const gotoCourseDetail = (courseId) => {
    router.push({name: 'CourseDetail', params: {courseId}})
}

const isCourseInMyClassList = (courseId) => {
    return my_courseList.value.includes(courseId);
};

const handleJoinCourse = (event) => {
    event.stopPropagation()
    dialogVisible.value = true
}

const successMsg = () => {
    ElMessage({
        type: "success",
        message: "加入成功!"
    })
}

const errorMsg = () => {
    ElMessage({
        type: "error",
        message: "加入失败!"
    })
}

const ConfirmJoinCourse = async (courseId) => {
    let JoinRes = await apiStudentJoinCourse(localStorage.getItem('studentId'), courseId)
    if (JoinRes.code === 1) {
        my_courseList.value.push(courseId)
        successMsg()
    } else {
        errorMsg()
    }
    dialogVisible.value = false
}
</script>

<template>
    <el-card shadow="never" @click="gotoCourseDetail(courseId)" class="item">
        <div class="card-header">
            <el-text size="large">{{ courseName }}</el-text>
            <el-dropdown>
                <el-icon size="large">
                    <MoreFilled/>
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>归档</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="foot-pattern">
            <el-text size="large" class="text-color">{{ teacher }}</el-text>
            <el-button round v-show="!isCourseInMyClassList(courseId)" @click="handleJoinCourse">加入课程</el-button>
        </div>
    </el-card>
    <el-dialog v-model="dialogVisible" width="500">
        <template #header>是否加入课程？</template>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="ConfirmJoinCourse(courseId)">确认</el-button>
        </template>
    </el-dialog>
</template>

<style scoped>
.foot-pattern {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 65px;
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.item {
    width: 460px;
    height: 150px;
    border-radius: 4px;
    margin: 30px 10px 10px 10px;
    background-color: var(--el-color-primary-light-7);
    flex-direction: column;
    justify-content: space-between;
}

.item:hover {
    box-shadow: 0 4px 7px var(--el-color-info-light-5);
}
</style>