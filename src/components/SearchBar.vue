<script setup>
    import {Search} from "@element-plus/icons-vue"
    import {ref} from "vue";
    const props = defineProps({
        placeholder: {
            type: String
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
    <div class="search-bar">
        <el-input v-model="keyword" type="text" size="large" :placeholder="placeholder">
            <template #append>
                <div class="search-button" @click="checkInput">
                    <el-icon size="20"><Search /></el-icon>
                </div>
            </template>
        </el-input>
    </div>
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
    }
    .search-button {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: var(--el-color-info-dark-2);
        width: 60px;
        padding-right: 6px;
    }
</style>