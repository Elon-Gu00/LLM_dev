<script setup>
    import PageHeader from "@/components/PageHeader.vue"
    import {router} from "@/router/index.js";
    import {ref, onMounted} from "vue";
    import {apiChangeState, apiFileCourse, apiGetCourseInfo} from "@/apis/courseApis.js";
    import {statusToChinese} from "@/utils/index.js";
    import {ElMessage} from "element-plus";
    import {Warning} from "@element-plus/icons-vue";

    const courseId = router.currentRoute.value.params['courseId']
    const courseInfo = ref({
        courseName: "",
        description: "",
        state: ""
    })
    const setCourseInfo = async () => {
        const result = await apiGetCourseInfo(courseId)
        if (result.code === 1) {
            courseInfo.value = result.data[courseId]
        }
        else {
            ElMessage.warning(result.message)
        }
    }
    onMounted(() => {
        setCourseInfo()
    })
    const changeState = async (state) => {
        if (state === 'not-started' || state === 'active') {
            const result = await apiChangeState(courseId, state)
            if (result.code === 1) {
                courseInfo.value.state = state
            }
        }
    }
    const file = async () => {
        const result = await apiFileCourse(courseId)
        if (result.code === 1) {
            courseInfo.value.state = 'filed'
        }
    }
    const showFileAlert = ref(false)
</script>

<template>
    <page-header :content="courseInfo.courseName">
        <template #last>
            <el-dropdown trigger="click" :disabled="courseInfo.state === 'filed'">
                <div class="status-tag" :class="{ 'status-tag-active': courseInfo.state === 'active', 'status-tag-not-started': courseInfo.state === 'not-started', 'status-tag-filed': courseInfo.state === 'filed' }">
                    <span>{{ statusToChinese(courseInfo.state) }}</span>
                </div>
                <template #dropdown>
                    <div class="dropdown">
                        <div class="status-tag status-tag-active" v-if="courseInfo.state !== 'active'" @click="changeState('active')">
                            <span>开课</span>
                        </div>
                        <div class="status-tag status-tag-not-started" v-if="courseInfo.state !== 'not-started'" @click="changeState('not-started')">
                            <span>停课</span>
                        </div>
                        <div class="status-tag status-tag-filed" v-if="courseInfo.state !== 'filed'" @click="showFileAlert = !showFileAlert">
                            <span>归档</span>
                        </div>
                    </div>
                </template>
            </el-dropdown>
        </template>
    </page-header>
    <el-container>
        <el-aside>

        </el-aside>
        <el-aside>

        </el-aside>
    </el-container>
    <el-dialog v-model="showFileAlert" width="300">
        <template #title>
            <div class="dialog-title">
                <el-icon><Warning /></el-icon>
                <span>危险操作警告</span>
            </div>
        </template>
        <template #default>
            <div>
                <span>归档后将无法再开课，你确定要归档该课程吗？</span>
            </div>
        </template>
        <template #footer>
            <div>
                <el-button type="info" @click="showFileAlert = !showFileAlert">取消</el-button>
                <el-button type="danger" @click="file">归档</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped>
    .status-tag {
        width: 64px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
        border-radius: 6px;
        cursor: default;
    }
    .status-tag:hover {
        opacity: 0.8;
    }
    .status-tag-active {
        border: 1px solid var(--el-color-success-light-5);
        background-color: var(--el-color-success-light-7);
        color: var(--el-color-success-dark-2);
    }
    .status-tag-not-started {
        border: 1px solid var(--el-color-primary-light-5);
        background-color: var(--el-color-primary-light-7);
        color: var(--el-color-primary-dark-2);
    }
    .status-tag-filed {
        border: 1px solid var(--el-color-info-light-5);
        background-color: var(--el-color-info-light-7);
        color: var(--el-color-info-dark-2);
    }
    .dropdown {
        padding: 5px;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .dialog-title {
        display: flex;
        justify-content: left;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        gap: 5px;
    }
</style>