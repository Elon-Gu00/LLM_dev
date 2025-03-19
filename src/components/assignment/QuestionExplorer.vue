<script setup>
    import {ChatDotRound, Cpu, Operation, Tickets} from "@element-plus/icons-vue"
    import {ref} from "vue";
    const props = defineProps({
        questionList: {
            type: Object,
            required: true
        }
    })
    const emits = defineEmits(['select'])
</script>

<template>
    <el-scrollbar>
        <el-menu>
            <el-sub-menu index="choice">
                <template #title>
                    <el-icon><Operation /></el-icon>
                    <span>选择题</span>
                </template>
                <el-menu-item v-for="(item) in questionList.choice" :index="item.questionId" @click="emits('select', item)">
                    <el-text truncated>{{ item.content.title }}</el-text>
                </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="fill-blank">
                <template #title>
                    <el-icon><Tickets /></el-icon>
                    <span>填空题</span>
                </template>
                <el-menu-item v-for="(item) in questionList.fillBlank" :index="item.questionId" @click="emits('select', item)">
                    <el-text truncated>{{ item.content.title }}</el-text>
                </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="essay">
                <template #title>
                    <el-icon><ChatDotRound /></el-icon>
                    <span>问答题</span>
                </template>
                <el-menu-item v-for="(item) in questionList.essay" :index="item.questionId" @click="emits('select', item)">
                    <el-text truncated>{{ item.content.title }}</el-text>
                </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="programming">
                <template #title>
                    <el-icon><Cpu /></el-icon>
                    <span>编程题</span>
                </template>
                <el-menu-item v-for="(item) in questionList.programming" :index="item.questionId" @click="emits('select', item)">
                    <el-text truncated>{{ item.content.title }}</el-text>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-scrollbar>
</template>

<style scoped>
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