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

</script>

<template>
    <div class="search-bar">
        <el-input v-model="keyword" type="text" size="large" :placeholder="placeholder">
            <template #append>
                <div class="search-button" @click="emits('search', keyword)">
                    <el-icon size="16"><Search /></el-icon>
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
}
.search-button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--el-color-black);
    width: 60px;
}

</style>