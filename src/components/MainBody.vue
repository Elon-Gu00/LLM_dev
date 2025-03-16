<script setup>

    import {ref} from "vue"
    import {Menu, Search} from "@element-plus/icons-vue"
    import SearchBar from "@/components/SearchBar.vue";
    import {apiSearchCourse} from "@/apis/courseApis.js";
    import {useSearchResultStore} from "@/stores/index.js";
    import {router} from "@/router/index.js";

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
            console.log(await courseStore.courseInfo)
            await router.push(router.currentRoute.value.path + '/course/search')
        }
    }

</script>

<template>
    <el-container class="main-container">
        <el-header  class="page-header">
            <div class="logo">
                <span>Logo</span>
            </div>
            <div class="search-area">
                <search-bar placeholder="搜索课程" @search="search"/>
            </div>
            <div class="info-area">
                <span>{{ nickname }}</span>
            </div>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse ? '64': '300'" class="main-aside">
                <el-menu v-if="identity === 'teacher'" :collapse="isCollapse" router :collapse-transition="false">
                    <div class="collapse-button" @click="isCollapse = !isCollapse">
                        <el-icon v-if="isCollapse"><Menu /></el-icon>
                        <span v-if="!isCollapse">Logo</span>
                    </div>
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
            </el-aside>
            <el-main>
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
    .el-menu--vertical {
        --el-menu-vertival-width: 64px;
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
    }
    .logo {
        font-size: 30px;
        font-weight: bolder;
    }
    .search-area {
        width: 600px;
    }
    .collapse-button {
        cursor: pointer;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .main-aside {
        border-right: 1px solid var(--el-border-color-light);
    }
</style>