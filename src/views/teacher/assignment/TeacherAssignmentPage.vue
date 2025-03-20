<script setup>
import {ref, onMounted, watch} from "vue"
    import SearchBar from "@/components/SearchBar.vue"
    import {ChatDotRound, Cpu, Operation, Plus, Refresh, Tickets} from "@element-plus/icons-vue"
    import {router} from "@/router/index.js";
    import {apiGetQuestion} from "@/apis/questionApis.js";
    import {ElMessage} from "element-plus";
    import {useAssignmentRefreshStore, useQuestionRefreshStore} from "@/stores/index.js";
    import {apiAssignmentOfTeacher} from "@/apis/assignmentApis.js";
    const assignmentList = ref([])
    const goto = (path) => {
        const item = router.currentRoute.value.path.split('/')
        if (item.length > 3) {
            router.push('/' + item[1] + '/' + item[2] + path)
        }
        else {
            router.push(router.currentRoute.value.path + path)
        }
    }
    const teacherId = localStorage.getItem("teacherId")
    const setAssignmentList = async () => {
        const result = await apiAssignmentOfTeacher(teacherId)
        if (result.code === 1) {
            assignmentList.value = result.data[teacherId]
        }
        else {
            ElMessage.warning(result.message)
        }
    }
    const refresh = useAssignmentRefreshStore()
    watch(refresh, () => {
        setAssignmentList()
    })
</script>

<template>
    <el-container>
        <el-aside class="aside-list">
            <div class="aside-list-top border-bottom">
                <div class="aside-title">
                    <span>作业模版库</span>
                </div>
                <div class="aside-search-area">
                    <search-bar size="default" placeholder="查找作业" />
                    <div class="refresh-button" @click="setAssignmentList">
                        <el-icon><Refresh /></el-icon>
                    </div>
                </div>
            </div>
            <div class="height-level-4">
                <el-scrollbar>
                    <el-menu>
                        <el-sub-menu index="choice">
                            <template #title>
                                <el-icon><Operation /></el-icon>
                                <span>作业模版</span>
                            </template>
                            <el-menu-item @click="goto('/add')">
                                <el-icon><Plus /></el-icon>
                                <span>添加模版</span>
                            </el-menu-item>
                            <el-menu-item v-for="(item) in assignmentList" :index="item.assignmentId" @click="goto('/edit/' + item.assignmentId)">
                                <el-text truncated>{{ item.title }}</el-text>
                            </el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </el-scrollbar>
            </div>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<style scoped>
    .aside-list {
        height: calc(100vh - 60px);
        width: 240px;
        border-right: 1px solid var(--el-border-color-light);
        cursor: default;
    }
    .aside-list-top {
        padding: 0 10px 0 10px;
        height: 101px;
    }
    .aside-title {
        padding: 0 12px;
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: bolder;
        height: 50px;
        line-height: 50px;
        display: inline-block;
        color: var(--el-color-black);
    }
    .aside-search-area {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 5px;
    }
    .refresh-button {
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        width: 30px;
        transition: 0.3s;
    }
    .refresh-button:hover {
        color: var(--el-color-primary);
    }

    .el-menu {
        --el-menu-item-height: 40px;
        --el-menu-sub-item-height: 30px;
        margin: 4px 8px;
        border-right: none;
    }
    .el-menu-item {
        border-radius: 12px;
    }
    :deep(.el-sub-menu__title) {
        border-radius: 12px;
        font-size: 15px;
        font-weight: bold;
    }
    .el-main {
        padding: 0;
    }
</style>