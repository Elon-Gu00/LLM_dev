<script setup>

import AddCard from "@/components/AddCard.vue";
import {router} from "@/router/index.js";
import PageHeader from "@/components/PageHeader.vue";
</script>

<template>
    <page-header content="作业管理" />
    <div class="empty-all">
        <div class="empty-text">
            打开一个作业模版
        </div>
        <div class="empty-text">
            或
        </div>
        <div>
            <add-card title="作业模版" @click="router.push(router.currentRoute.value.path + '/add')" />
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
</style>