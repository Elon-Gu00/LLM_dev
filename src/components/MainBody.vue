<script setup>

    import {ref, onMounted} from "vue"
    import {
        ArrowLeft,
        ArrowLeftBold,
        ArrowRight,
        ArrowRightBold,
        Menu,
        Search,
        Setting, SwitchButton,
        User
    } from "@element-plus/icons-vue"
    import SearchBar from "@/components/SearchBar.vue";
    import {apiSearchCourse} from "@/apis/courseApis.js";
    import {useSearchResultStore} from "@/stores/index.js";
    import {router} from "@/router/index.js";
    import {identityToChinese} from "../utils/index.js";

    const isCollapse = ref(false)
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
            await router.push('/' + props.identity + '/course/search')
        }
    }
    const logout = async () => {
        localStorage.clear()
        await router.replace('/')
    }

</script>

<template>
    <el-container class="main-container">
        <el-header  class="page-header">
            <div class="logo" @click="router.push('/')">
                <span>Logo</span>
            </div>
            <div class="search-area">
                <search-bar placeholder="搜索课程" size="large" @search="search"/>
            </div>
            <div class="info-area">
                <el-tag>{{ identityToChinese(identity) }}</el-tag>
                <el-avatar :size="32"><User /></el-avatar>
            </div>
        </el-header>
        <el-container>
            <el-aside v-show="!isCollapse" width="60">
                <el-scrollbar>
                    <div class="main-aside height-level-2">
                        <el-menu v-if="identity === 'teacher'" router :default-active="router.currentRoute.value.path">
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
                        <el-menu v-if="identity === 'student'" router :default-active="router.currentRoute.value.path">
                            <el-menu-item index="/student">
                                <el-icon><Menu /></el-icon>
                                <template #title><span>主页</span></template>
                            </el-menu-item>
                            <el-menu-item index="/student/course">
                                <el-icon><Menu /></el-icon>
                                <template #title><span>课程</span></template>
                            </el-menu-item>
                            <el-menu-item index="/student/assignment">
                                <el-icon><Menu /></el-icon>
                                <template #title><span>作业</span></template>
                            </el-menu-item>
                        </el-menu>
                        <el-menu v-if="identity === 'administrator'" router :default-active="router.currentRoute.value.path">
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
                        <el-menu router>
                            <el-dropdown trigger="click">
                                <el-menu-item>
                                    <el-icon><User/></el-icon>
                                    <template #title>个人信息</template>
                                </el-menu-item>
                                <template #dropdown>
                                    <div class="dropdown-item nickname">
                                        <span>{{ nickname }}</span>
                                    </div>
                                    <div class="dropdown-item">
                                        <el-icon><Setting /></el-icon>
                                        <span>设置</span>
                                    </div>
                                    <div class="dropdown-item" @click="logout">
                                        <el-icon><SwitchButton /></el-icon>
                                        <span>退出登录</span>
                                    </div>
                                </template>
                            </el-dropdown>
                        </el-menu>
                    </div>
                </el-scrollbar>
            </el-aside>
            <el-aside width="12" class="collapse-aside collapse-aside-border" v-show="!isCollapse">
                <div class="collapse-button left-radius" @click="isCollapse = !isCollapse">
                    <el-icon v-if="!isCollapse"><ArrowLeftBold /></el-icon>
                </div>
            </el-aside>
            <el-aside width="12" class="collapse-aside" v-show="isCollapse" >
                <div class="collapse-button right-radius" @click="isCollapse = !isCollapse">
                    <el-icon v-if="isCollapse"><ArrowRightBold /></el-icon>
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
        --el-menu-text-color: var(--el-color-info-dark-2);
        --el-menu-active-color: var(--el-color-primary-dark-2);
    }
    .el-menu-item {
        margin: 8px 2px 8px 18px;
        border-radius: 12px;
        transition: 0.3s;
        font-size: 16px;
        font-weight: bolder;
    }
    .el-menu-item:hover {
        color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
    }
    .main-container {
        height: calc(100vh);
        width: calc(100vw);
    }
    .page-header {
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--el-border-color-light);
        cursor: default;
        background-color: var(--el-fill-color-extra-light);
    }
    .logo {
        font-size: 30px;
        font-weight: bolder;
    }
    .search-area {
        width: 40%;
    }
    .info-area {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
    }
    .collapse-aside {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--el-fill-color-extra-light);
    }
    .collapse-aside-border {
        border-right: 1px solid var(--el-border-color-light);
    }
    .collapse-button {
        cursor: pointer;
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: var(--el-color-info-dark-2);
        background-color: var(--el-color-info-light-9);
        transition: 0.3s;
    }
    .left-radius {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }
    .right-radius {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
    }
    .collapse-button:hover {
        color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
    }
    .main-aside {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: calc(100vh - 60px);
        background-color: var(--el-fill-color-extra-light);
    }
    .main-body {
        padding: 0;
        height: calc(100vh - 60px);
    }
    .dropdown-item {
        cursor: pointer;
        height: 40px;
        width: 80px;
        padding: 0 20px;
        margin: 4px 8px;
        display: flex;
        justify-content: left;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: bolder;
        color: var(--el-color-info-dark-2);
        transition: 0.3s;
        border-radius: 8px;
    }
    .dropdown-item:hover {
        color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
    }
    .nickname {
        justify-content: center;
        color: var(--el-color-black);
        cursor: default;
        font-size: 16px;
        font-weight: bolder;
        border-bottom: 1px solid var(--el-border-color-light);
    }
    .dropdown-item.nickname:hover {
        color: var(--el-color-black);
        background-color: transparent;
    }
</style>