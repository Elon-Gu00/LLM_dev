<script setup>

    import {ref} from "vue"
    import {ArrowLeft, ArrowRight, Menu, Search, Setting, User} from "@element-plus/icons-vue"
    import SearchBar from "@/components/SearchBar.vue";
    import {apiSearchCourse} from "@/apis/courseApis.js";
    import {useSearchResultStore} from "@/stores/index.js";
    import {router} from "@/router/index.js";
    import {identityToChinese} from "../utils/index.js";

    const isCollapse = ref(true)
    const props = defineProps({
        identity: {
            required: true,
            type: String
        },
        nickname: {
            required: true,
            type: String
        }
    })
    const search = async (keyword) => {
        const result = await apiSearchCourse(keyword)
        if (result.code === 1) {
            const courseStore = useSearchResultStore()
            courseStore.setCourseInfo(result.data)
            await router.push(router.currentRoute.value.path + '/course/search')
        }
    }

</script>

<template>
    <el-container class="main-container">
        <el-header  class="page-header">
            <div class="logo" @click="router.push('/')">
                <span>Logo</span>
            </div>
            <div class="search-area">
                <search-bar placeholder="搜索课程" @search="search"/>
            </div>
            <div class="info-area">
                <el-tag>{{ identityToChinese(identity) }}</el-tag>
                <el-avatar :size="32"><User /></el-avatar>
            </div>
        </el-header>
        <el-container>
            <el-aside v-show="isCollapse" width="60" class="main-aside">
                <el-menu v-if="identity === 'teacher'" router>
<!--                    <div class="collapse-button" @click="isCollapse = !isCollapse">-->
<!--                        <el-icon v-if="isCollapse"><Menu /></el-icon>-->
<!--                        <span v-if="!isCollapse">Logo</span>-->
<!--                    </div>-->
                    <el-menu-item index="/teacher">
                        <el-icon><Menu /></el-icon>
                        <template #title><span>主页</span></template>
                    </el-menu-item>
                    <el-menu-item index="/teacher/course">
                        <el-icon><Menu /></el-icon>
                        <template #title><span>课程</span></template>
                    </el-menu-item>
                    <el-menu-item index="/teacher/question">
                        <el-icon><Menu /></el-icon>
                        <template #title><span>题库</span></template>
                    </el-menu-item>
                    <el-menu-item index="/teacher/assignment">
                        <el-icon><Menu /></el-icon>
                        <template #title><span>作业模版</span></template>
                    </el-menu-item>
                    <el-menu-item index="/teacher/correct">
                        <el-icon><Menu /></el-icon>
                        <template #title><span>批改作业</span></template>
                    </el-menu-item>
                </el-menu>
                <el-menu v-if="identity === 'student'" :collapse="isCollapse" router >
                    <el-menu-item index="/student">
                        <el-icon><Menu /></el-icon>
                        <template #title><span>主页</span></template>
                    </el-menu-item>
                    <el-menu-item index="/student/course">
                        <el-icon><Menu /></el-icon>
                        <template #title><span>课程</span></template>
                    </el-menu-item>
                    <el-menu-item index="/teacher/assignment">
                        <el-icon><Menu /></el-icon>
                        <template #title><span>作业</span></template>
                    </el-menu-item>
                </el-menu>
                <el-menu v-if="identity === 'administrator'" :collapse="isCollapse" router >
                    <el-menu-item index="/administrator">
                        <el-icon><Menu /></el-icon>
                        <template #title><span>主页</span></template>
                    </el-menu-item>
                    <el-menu-item index="/administrator/course">
                        <el-icon><Menu /></el-icon>
                        <template #title><span>课程</span></template>
                    </el-menu-item>
                    <el-menu-item index="/administrator/class">
                        <el-icon><Menu /></el-icon>
                        <template #title><span>班级</span></template>
                    </el-menu-item>
                    <el-menu-item index="/administrator/question">
                        <el-icon><Menu /></el-icon>
                        <template #title><span>题库</span></template>
                    </el-menu-item>
                    <el-menu-item index="/administrator/assignment">
                        <el-icon><Menu /></el-icon>
                        <template #title><span>作业</span></template>
                    </el-menu-item>
                </el-menu>
                <el-menu router :collapse-transition="false">
                    <el-menu-item :index="router.currentRoute.value.path + '/settings'">
                        <el-icon><Setting /></el-icon>
                        <template #title>设置</template>
                    </el-menu-item>
                    <el-menu-item :index="router.currentRoute.value.path + '/info'">
                        <el-icon><User/></el-icon>
                        <template #title>个人信息</template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-aside width="12" class="collapse-aside">
                <div class="collapse-button" @click="isCollapse = !isCollapse">
                    <el-icon v-if="isCollapse"><ArrowLeft /></el-icon>
                    <el-icon v-if="!isCollapse"><ArrowRight /></el-icon>
                </div>
            </el-aside>
            <el-main class="main-body">
                <slot name="default"/>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
    .el-menu {
        border-right: none;
        background-color: transparent;
    }
    .el-menu-item {
        margin: 8px 0 8px 12px;
        border-radius: 12px;
    }
    .main-container {
        height: calc(100vh);
        width: calc(100vw);
    }
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--el-border-color-light);
        cursor: default;
    }
    .logo {
        font-size: 30px;
        font-weight: bolder;
    }
    .search-area {
        width: 600px;
    }
    .info-area {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
    }
    .nickname {
        font-size: 18px;
    }
    .collapse-aside {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-right: 1px solid var(--el-border-color-light);
    }
    .collapse-button {
        cursor: pointer;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
    }
    .collapse-button:hover {
        background-color: var(--el-color-primary-light-9);
    }
    .main-aside {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .main-body {
        padding: 0;
        height: calc(100vh - 60px);
    }
</style>