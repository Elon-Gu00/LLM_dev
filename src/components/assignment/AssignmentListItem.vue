<script setup>

    const emits = defineEmits(['remove'])

</script>

<template>
    <div class="assignment-list-item">
        <div class="index">
            <slot name="index" />
        </div>
        <div class="content">
            <slot name="default" />
        </div>
        <div class="remove-button" @click="emits('remove')">
            <span>移除</span>
        </div>
    </div>
</template>

<style scoped>
    .assignment-list-item {
        padding-right: 10px;
        display: flex;
        flex: auto;
        justify-content: space-between;
        align-items: center;
        border-radius: 6px;
        border: 1px solid var(--el-border-color-light);
    }
    .index {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
        width: 40px;
        height: 40px;
        border-right: 1px solid var(--el-border-color-light);
        color: var(--el-color-info-dark-2)
    }
    .content {
        padding: 0 10px;
        display: flex;
        flex: auto;
        justify-content: left;
        align-items: center;
    }
    .remove-button {
        height: 20px;
        width: 40px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        border: 1px solid var(--el-color-danger-light-3);
        background-color: var(--el-color-danger-light-7);
        color: var(--el-color-info-dark-2);
        cursor: default;
        transition: 0.3s;
    }
    .remove-button:hover {
        background-color: var(--el-color-danger-light-3);
        color: var(--el-color-white);
        cursor: pointer;
    }
</style>