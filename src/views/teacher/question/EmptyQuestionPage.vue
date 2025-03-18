<script setup>

import AddCard from "@/components/AddCard.vue";
import {router} from "@/router/index.js";
import PageHeader from "@/components/PageHeader.vue";
</script>

<template>
    <page-header content="题目管理" />
    <div class="empty-all">
        <div class="empty-text">
            打开一个题目
        </div>
        <div class="empty-text">
            或
        </div>
        <div class="empty-option">
            <add-card title="选择题" @click="router.push(router.currentRoute.value.path + '/add/choice')" />
            <add-card title="填空题" @click="router.push(router.currentRoute.value.path + '/add/fill-blank')" />
            <add-card title="问答题" @click="router.push(router.currentRoute.value.path + '/add/essay')" />
            <add-card title="编程题" @click="router.push(router.currentRoute.value.path + '/add/programming')" />
        </div>
    </div>
</template>

<style scoped>
    .empty-all {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 111px);
        gap: 20px;
    }
    .empty-text {
        font-size: 26px;
        font-weight: bold;
        color: var(--el-color-info-dark-2)
    }
    .empty-option {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
    }
</style>