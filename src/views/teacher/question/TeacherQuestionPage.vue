<script setup>
import {ref, onMounted, watch} from "vue"
    import SearchBar from "@/components/SearchBar.vue"
    import {ChatDotRound, Cpu, Operation, Plus, Refresh, Tickets} from "@element-plus/icons-vue"
    import {router} from "@/router/index.js";
    import {apiGetQuestion} from "@/apis/questionApis.js";
    import {ElMessage} from "element-plus";
import {useQuestionRefreshStore} from "@/stores/index.js";
    const questionList = ref({
        choice: [],
        fillBlank: [],
        essay: [],
        programming: []
    })
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
    const setQuestionList = async () => {
        const result = await apiGetQuestion(teacherId)
        if (result.code === 1) {
            Object.values(questionList.value).forEach(list => {
                list.splice(0, list.length)
            })
            const data = result.data[teacherId]
            data.forEach(item => {
                item.content = JSON.parse(item.content)
                item.answer = JSON.parse(item.answer)
                if (item.questionType === 'choice') {
                    questionList.value.choice.push(item)
                }
                if (item.questionType === 'fill-blank') {
                    questionList.value.choice.push(item)
                }
                if (item.questionType === 'essay') {
                    questionList.value.choice.push(item)
                }
                if (item.questionType === 'programming') {
                    questionList.value.choice.push(item)
                }
            })
        }
        else {
            ElMessage.warning(result.message)
        }
    }
    onMounted(() => {
        setQuestionList()
    })
    const refresh = useQuestionRefreshStore()
    watch(refresh, () => {
        setQuestionList()
    })
</script>

<template>
    <el-container>
        <el-aside class="aside-list">
            <div class="aside-list-top border-bottom">
                <div class="aside-title">
                    <span>题库</span>
                </div>
                <div class="aside-search-area">
                    <search-bar size="default" placeholder="查找题目" />
                    <div class="refresh-button" @click="setQuestionList">
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
                                <span>选择题</span>
                            </template>
                            <el-menu-item @click="goto('/add/choice')">
                                <el-icon><Plus /></el-icon>
                                <span>添加选择题</span>
                            </el-menu-item>
                            <el-menu-item v-for="(item) in questionList.choice" :index="item.questionId" @click="goto('/edit/choice/' + item.questionId)">
                                <el-text truncated>{{ item.content.title }}</el-text>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="fill-blank">
                            <template #title>
                                <el-icon><Tickets /></el-icon>
                                <span>填空题</span>
                            </template>
                            <el-menu-item @click="goto('/add/fill-blank')">
                                <el-icon><Plus /></el-icon>
                                <span>添加填空题</span>
                            </el-menu-item>
                            <el-menu-item v-for="(item) in questionList.fillBlank" :index="item.questionId" @click="goto('/edit/fill-blank/' + item.questionId)">
                                <el-text truncated>{{ item.content.title }}</el-text>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="essay">
                            <template #title>
                                <el-icon><ChatDotRound /></el-icon>
                                <span>问答题</span>
                            </template>
                            <el-menu-item @click="goto('/add/essay')">
                                <el-icon><Plus /></el-icon>
                                <span>添加问答题</span>
                            </el-menu-item>
                            <el-menu-item v-for="(item) in questionList.essay" :index="item.questionId" @click="goto('/edit/essay/' + item.questionId)">
                                <el-text truncated>{{ item.content.title }}</el-text>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="programming">
                            <template #title>
                                <el-icon><Cpu /></el-icon>
                                <span>编程题</span>
                            </template>
                            <el-menu-item @click="goto('/add/programming')">
                                <el-icon><Plus /></el-icon>
                                <span>添加编程题</span>
                            </el-menu-item>
                            <el-menu-item v-for="(item) in questionList.programming" :index="item.questionId" @click="goto('/edit/programming/' + item.questionId)">
                                <el-text truncated>{{ item.content.title }}</el-text>
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
        padding: 0 10px 10px 10px;
    }
    .aside-title {
        padding: 0 12px;
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: bold;
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
    .aside-list-body:deep(.el-sub-menu__title) {
        border-radius: 12px;
        font-size: 15px;
        font-weight: bold;
    }
    .el-main {
        padding: 0;
    }
</style>