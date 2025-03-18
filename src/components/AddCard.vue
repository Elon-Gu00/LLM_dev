<script setup>
import {Plus} from "@element-plus/icons-vue";
const props = defineProps({
    title: {
        type: String,
        required: false
    }
})
</script>

<template>
    <el-card class="card">
        <div class="icon">
            <el-icon size="32"><Plus /></el-icon>
        </div>
        <div class="font">
            <span>{{ title }}</span>
        </div>
    </el-card>
</template>

<style scoped>
.card {
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--el-transition-duration);
    cursor: pointer;
}

.card:hover {
    box-shadow: 0 6px 12px var(--el-color-primary-light-8),
                -6px 0 12px var(--el-color-primary-light-8),
                0 -6px 12px var(--el-color-primary-light-8),
                6px 0 12px var(--el-color-primary-light-8),
                inset 0 2px 4px var(--el-color-primary-light-8),
                inset -2px 0 4px var(--el-color-primary-light-8),
                inset 0 -2px 4px var(--el-color-primary-light-8),
                inset 2px 0 4px var(--el-color-primary-light-8);
}

.icon {
    color: var(--el-color-info);
    text-align: center;
}

.font {
    color: var(--el-color-info);
    font-size: 20px;
}
</style>