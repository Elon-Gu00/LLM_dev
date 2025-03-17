<script setup>
    import { ref, onBeforeMount } from "vue"
    import { User, Lock } from "@element-plus/icons-vue"
    import { apiLogin } from "@/apis/userApis.js"
    import {toSHA256} from "@/utils/index.js";

    const loginFormRef = ref()
    const loginData = ref({
        username: "",
        password: ""
    })
    const identity = []
    const emit = defineEmits([
        'success', 'error', 'non-identity'
    ])
    const rules = {
        username: [
            { require: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
            { require: true, message: "请输入密码", trigger: "blur" }
        ]
    }
    const checkAll = async (el) => {
        if (!el) return
        await el.validate((valid, fields) => {
            if (valid) {
                login()
            }
        })
    }
    const login = async () => {
        const pwd = loginData.value.password
        const result = await apiLogin(loginData.value.username, await toSHA256(pwd))
        if (result.code === 1) {
            localStorage.setItem("token", result.data.token)
            localStorage.setItem("nickname", result.data.nickname)
            localStorage.setItem("userId", result.data.userId)
            result.data.identity.forEach(i => {
                if (i === "teacher") localStorage.setItem("teacherId", result.data.teacherId)
                if (i === "student") localStorage.setItem("studentId", result.data.studentId)
                if (i === "administrator") localStorage.setItem("administratorId", result.data.administratorId)
                identity.push(i)
            })
            if (identity.length > 0) emit('success', identity)
            else emit('non-identity')
        }
        else emit('error')
    }
    onBeforeMount(() => {
        const token = localStorage.getItem("token")
        const identity = localStorage.getItem("identity")
        if (token !== null && identity !== null) {
            emit('success', [identity])
        }
    })

</script>

<template>
    <div class="login-window">
        <div class="login-title">
            <span>登录</span>
        </div>
        <el-form ref="loginFormRef" :model="loginData" :rules="rules" :hide-required-asterisk="true" size="large">
            <el-form-item prop="username">
                <el-input type="text" v-model="loginData.username" placeholder="用户名" :prefix-icon="User"/>
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="loginData.password" placeholder="密码" :prefix-icon="Lock" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="checkAll(loginFormRef)" style="width: 100%">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
    .login-window {
        padding: 32px 48px;
        width: 360px;
        border-radius: 12px;
    }

    .login-title {
        color: var(--el-color-black);
        font-size: 32px;
        font-weight: bolder;
        margin-bottom: 24px;
        text-align: center;
    }
</style>