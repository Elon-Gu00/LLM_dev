<script setup>
    import PageHeader from "@/components/PageHeader.vue"
    import {ref} from "vue";
    import {Minus, Plus} from "@element-plus/icons-vue";
    import {ElMessage} from "element-plus";
    import {apiAddClass, apiAddCourse, apiAddTeach} from "@/apis/courseApis.js";

    const courseName = ref('')
    const courseDescription = ref('')
    const classInfo = ref([])

    const teacherId = localStorage.getItem('teacherId')
    const showSkipClassDialog = ref(false)
    const check = () => {
        if (courseName.value === '') {
            ElMessage.warning('请设置课程名称')
            return
        }
        if (courseDescription.value === '') {
            ElMessage.warning('请设置课程介绍')
            return
        }
        if (classInfo.value.length === 0) {
            showSkipClassDialog.value = !showSkipClassDialog.value
        }
        else {
            complete()
        }
    }
    const complete = async () => {
        const addCourseResult = await apiAddCourse({
            teacherId: teacherId,
            courseName: courseName.value,
            description: courseDescription.value
        })
        if (addCourseResult.code === 1) {
            const courseId = addCourseResult.data
            const addTeachResult = await apiAddTeach(teacherId, courseId)
            if (addTeachResult.code === 1) {
                let counter = 0
                for (const info of classInfo.value) {
                    const addClassResult = await apiAddClass({
                        courseId: courseId,
                        className: info
                    })
                    if (addClassResult.code === 1) {
                        counter += 1
                    }
                }
                ElMessage.success('课程已创建')
                ElMessage.success(`已成功添加 ${counter} 个班级`)
            }
            else {
                ElMessage.warning(addTeachResult.message)
            }
        }
        else {
            ElMessage.warning(addTeachResult.message)
        }
    }

</script>

<template>
    <div class="height-level-2">
        <page-header content="创建课程">
            <template #last>
                <div class="complete-button" @click="check">
                    <span>完成</span>
                </div>
            </template>
        </page-header>
        <el-container>
            <el-aside class="height-level-3 add-course-page-left border-right">
                <el-scrollbar>
                    <div class="add-course-page">
                        <div class="add-course-page-item">
                            <div class="item-title">
                                <span>课程名</span>
                            </div>
                            <el-input v-model="courseName" size="large" maxlength="30" show-word-limit clearable placeholder="课程名"/>
                        </div>
                        <div class="add-course-page-item">
                            <div class="item-title">
                                <span>课程介绍</span>
                            </div>
                            <el-input v-model="courseDescription" :rows="15" type="textarea" size="large" maxlength="500" show-word-limit clearable placeholder="课程介绍"/>
                        </div>
                    </div>
                </el-scrollbar>
            </el-aside>
            <el-aside class="height-level-3 add-course-page-right">
                <el-scrollbar>
                    <div class="add-course-page">
                        <div class="add-course-page-item">
                            <div class="item-title">
                                <span>创建班级</span>
                            </div>
                        </div>
                        <div class="class-card" v-for="(cl, ind) in classInfo">
                            <el-input v-model="classInfo[ind]" placeholder="班级名称">
                                <template #prepend>
                                    <div class="class-card-index">
                                        <span>{{ ind + 1 }}</span>
                                    </div>
                                </template>
                            </el-input>
                            <div class="class-card-remove-button" @click="classInfo.splice(ind, 1)">
                                <el-icon><Minus /></el-icon>
                                <span>移除</span>
                            </div>
                        </div>
                        <div class="add-class-button" @click="classInfo.push('')">
                            <el-icon><Plus /></el-icon>
                            <span>添加班级</span>
                        </div>
                    </div>
                </el-scrollbar>
            </el-aside>
        </el-container>
    </div>
    <el-dialog title="提示" width="300" v-model="showSkipClassDialog">
        <div class="check-dialog">
            <div class="check-dialog-content">
                <span>您尚未添加班级，是否跳过？</span>
            </div>
            <div class="check-dialog-bottom">
                <el-button type="info" @click="showSkipClassDialog = !showSkipClassDialog">取消</el-button>
                <el-button type="primary" @click="showSkipClassDialog = !showSkipClassDialog; complete()">跳过</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<style scoped>
    .add-course-page-left {
        width: 60%;
    }
    .add-course-page-right {
        width: 40%;
    }
    .add-course-page {
        height: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .add-course-page-item {
        display: flex;
        flex-direction: column;
        gap: 10px;
        flex: auto;
    }
    .item-title {
        font-size: 16px;
        color: var(--el-color-info-dark-2);
        font-weight: bold;
    }
    .complete-button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 6px 10px;
        width: 60px;
        border-radius: 4px;
        background-color: var(--el-color-primary);
        cursor: default;
        color: var(--el-color-white);
        transition: 0.3s;
    }
    .complete-button:hover {
        background-color: var(--el-color-primary-light-3);
        cursor: pointer;
    }
    .add-class-button {
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--el-border-color);
        border-radius: 4px;
        gap: 4px;
        cursor: default;
        transition: 0.3s;
    }
    .add-class-button:hover {
        border: 1px solid var(--el-color-primary-light-5);
        color: var(--el-color-primary);
        cursor: pointer;
    }
    .class-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }
    .class-card-index {
        font-weight: bold;
    }
    .class-card-remove-button {
        padding: 0 8px;
        font-size: 14px;
        width: 60px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--el-border-color);
        border-radius: 4px;
        gap: 4px;
        cursor: default;
        transition: 0.3s;
    }
    .class-card-remove-button:hover {
        border: 1px solid var(--el-color-danger-light-5);
        color: var(--el-color-danger);
        cursor: pointer;
    }
    .check-dialog {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 20px;
    }
    .check-dialog-content {
        font-size: 16px;
    }
    .check-dialog-bottom {
        display: flex;
        justify-content: right;
        align-items: center;
    }
</style>