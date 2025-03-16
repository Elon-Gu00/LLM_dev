<script setup>
    import Login from "@/views/Login.vue";
    import { ref } from "vue";
    import {ElMessage} from "element-plus";
    import IdentitySelect from "@/views/IdentitySelect.vue";

    const isLoginWindowVisible = ref(true)
    const identity = ref([])
    const isIdentityWindowVisible = ref(false)
    const onSuccess = (ide) => {
        identity.value = ide
        isIdentityWindowVisible.value = (ide.length > 0)
        isLoginWindowVisible.value = !isIdentityWindowVisible.value
    }
</script>

<template>
    <div class="main">
        <div class="main-body">
            <div class="logo">
                <span>客&nbsp观&nbsp化&nbsp评&nbsp价&nbsp系&nbsp统</span>
            </div>
            <div class="login-button" @click="isLoginWindowVisible = !isLoginWindowVisible">
                <span>进入</span>
            </div>
        </div>
        <el-dialog v-model="isLoginWindowVisible" width="488">
            <login @success="onSuccess"
                         @error="ElMessage.warning('用户名或密码错误')"
                         @non-identity="ElMessage.warning('该用户暂无使用权限')"/>
        </el-dialog>
        <el-dialog v-model="isIdentityWindowVisible" width="488">
            <identity-select :identity="identity" />
        </el-dialog>
    </div>
</template>

<style scoped>
    .main {
        width: calc(100vw);
        height: calc(100vh);
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: default;
    }

    .main-body {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .logo {
        font-weight: bolder;
        font-size: 64px;
        margin: 20px;
    }

    .login-button {
        padding: 10px 20px;
        width: 160px;
        gap: 4px;
        cursor: pointer;
        border-radius: 32px;
        background-color: var(--el-fill-color);
        font-size: 26px;
    }

    .login-button:hover {
        opacity: 0.7;
    }
</style>