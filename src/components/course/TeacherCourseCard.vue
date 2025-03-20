<script setup>
    import {statusToChinese} from "../../utils/index.js";

    const props = defineProps({
        state: {
            type: String,
            required: true
        }
    })
</script>

<template>
    <div class="teacher-course-card">
        <div class="card-top">
            <div class="course-name">
                <span><slot name="name" /></span>
            </div>
            <div class="status-tag" :class="{ 'status-tag-active': state === 'active', 'status-tag-not-started': state === 'not-started', 'status-tag-filed': state === 'filed' }">
                <span>{{ statusToChinese(state) }}</span>
            </div>
        </div>
        <div class="card-bottom">
            <div class="course-date">
                <span><slot name="date" /></span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .teacher-course-card {
        padding: 16px;
        min-width: 360px;
        height: 120px;
        background-color: var(--el-color-warning-light-7);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: default;
        flex: auto;
        box-shadow: var(--el-box-shadow);
        transition: 0.3s;
    }
    .teacher-course-card:hover {
        box-shadow: 0 12px 32px 4px var(--el-color-primary-light-7),
                    0 8px 20px var(--el-color-primary-light-7)
    }
    .card-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }
    .course-name {
        font-size: 24px;
        font-weight: bold;
    }
    .course-date {
        font-size: 16px;
        color: var(--el-color-info-dark-2);
        font-weight: bold;
    }
    .card-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .status-tag {
        padding: 8px 10px;
        font-size: 14px;
        font-weight: bold;
        border-radius: 6px;
    }
    .status-tag-active {
        border: 1px solid var(--el-color-success-light-5);
        background-color: var(--el-color-success-light-7);
        color: var(--el-color-success-dark-2);
    }
    .status-tag-not-started {
        border: 1px solid var(--el-color-primary-light-5);
        background-color: var(--el-color-primary-light-7);
        color: var(--el-color-primary-dark-2);
    }
    .status-tag-filed {
        border: 1px solid var(--el-color-info-light-5);
        background-color: var(--el-color-info-light-7);
        color: var(--el-color-info-dark-2);
    }
</style>