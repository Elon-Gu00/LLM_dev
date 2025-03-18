<script setup>
    import {router} from "@/router/index.js"
    import {Back, BottomLeft} from "@element-plus/icons-vue";

    const props = defineProps({
        content: {
            type: String,
            required: true
        }
    })

</script>

<template>
    <div class="page-header">
        <div class="page-header-left" @click="router.back()">
            <el-icon><Back /></el-icon>
            <span>返回</span>
        </div>
        <div class="page-header-content">
            <span>{{ content }}</span>
        </div>
    </div>
</template>

<style scoped>
    .page-header {
        display: flex;
        justify-content: left;
        align-items: center;
        padding: 10px 20px;
        gap: 20px;
        cursor: default;
        height: 30px;
        border-bottom: 1px solid var(--el-border-color-light);
    }
    .page-header-left {
        display: flex;
        justify-content: left;
        align-items: center;
        gap: 5px;
        border-right: 1px solid var(--el-border-color-light);
        padding-right: 20px;
        transition: 0.3s;
    }
    .page-header-left:hover {
        color: var(--el-color-primary);
        cursor: pointer;
    }
    .page-header-content {
        font-size: 18px;
    }
</style>