<script setup>
    import {Search} from "@element-plus/icons-vue"
    import {ref} from "vue";
    const props = defineProps({
        placeholder: {
            type: String
        },
        size: {
            type: String,
            required: true,
            default: "default"
        },
        disable: {
            type: Boolean,
            default: false
        }
    })
    const keyword = ref("")
    const emits = defineEmits(['search'])
    const checkInput = () => {
        if (keyword.value.trim().length !== 0) {
            emits('search', keyword)
        }
    }
</script>

<template>
    <el-input class="search-bar" v-model="keyword" type="text" :size="size" :placeholder="placeholder" :disabled="disable">
        <template #append>
            <div class="search-button"
                 :class="{'search-button-large': size === 'large', 'search-button-default': size === 'default', 'search-button-small': size === 'small', 'disable': disable}"
                 @click="checkInput">
                <el-icon><Search /></el-icon>
            </div>
        </template>
    </el-input>
</template>

<style scoped>
    .search-bar:deep(.el-input__wrapper) {
        border-top-left-radius: 19px;
        border-bottom-left-radius: 19px;
    }
    .search-bar:deep(.el-input-group__append) {
        padding: 0;
        border-top-right-radius: 19px;
        border-bottom-right-radius: 19px;
        background-color: var(--el-color-primary-light-9);
        transition: 0.3s;
    }
    .search-bar:deep(.el-input-group__append):hover {
        color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-7);
        border: 1px solid var(--el-color-primary);
    }
    .search-button {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: var(--el-color-info-dark-2);
    }
    .search-button-large {
        width: 60px;
        padding-right: 6px;
        font-size: 20px;
    }
    .search-button-default {
        width: 40px;
        padding-right: 4px;
        font-size: 16px;
    }
    .search-button-small {
        width: 20px;
        padding-right: 2px;
        font-size: 12px;
    }
    .disable {
        cursor: not-allowed;
    }
</style>