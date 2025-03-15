<script setup>
import {onMounted, reactive, ref, watch} from "vue"
import {User, Lock, Message, Cellphone, Monitor, Back, View, Hide, Promotion} from '@element-plus/icons-vue'
import router from '../../router/router.js'
import {
    getCaptchaService,
    checkCaptchaService,
    registerService,
    sendEmailCodeService,
    checkEmailCodeService,
    findUserByEmail,
    sendEmailCodeServiceEN
} from "@/api/userApis.js"
import {ElMessage} from 'element-plus'
import {onBeforeRouteUpdate} from "vue-router";

onMounted(() => {
    getCaptcha()
})

const registerData = ref({
    email: "",
    phone: "",
    password: "",
    passwordRepeat: "",
    name: "",
    identity: "0",
    captcha: "",
})

const registerDataRef = ref()

const emailDialogVisible = ref(false)

const emailCode = ref({
    code: ""
})

const emailCodeRef = ref()

const checkAll = async (formRef) => {
    if (!formRef) return
    await formRef.validate((valid, fields) => {
        if (valid) {
            submit()
        }
    })
}

const checkEmailCode = async (codeRef) => {
    if (!codeRef) return
    await codeRef.validate((valid, fields) => {
        if (valid) {
            finish()
        }
    })
}

const submit = async () => {
    let captchaResult = await checkCaptchaService(registerData.value.captcha)
    if (captchaResult.code === 1) {
        let userResult = await findUserByEmail(registerData.value.email)
        if (userResult.code === 1 && userResult.data === null) {
            let sendResult = await sendEmailCodeServiceEN(registerData.value.email)
            if (sendResult.code === 1) {
                emailDialogVisible.value = true
            } else {
                ElMessage.error("The email is not exist")
            }
        } else {
            ElMessage.error("The email is used")
        }
    } else {
        ElMessage.error("Wrong captcha")
    }
    
}

const finish = async () => {
    let checkResult = await checkEmailCodeService(emailCode.value.code)
    if (checkResult.code === 1) {
        let registerResult = await registerService(registerData.value)
        if (registerResult.code === 1) {
            ElMessage.success("Register successfully")
            emailDialogVisible.value = false
        } else {
            ElMessage.error("Register failure")
        }
    } else {
        ElMessage.error("Wrong Captcha")
    }
}


const checkEmail = (rule, value, callback) => {
    // RFC 2822邮箱标准语法
    let reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if (!reg.test(value)) {
        callback(new Error("Please enter a correct email"))
    } else {
        callback()
    }
}

const checkPassword = (rule, value, callback) => {
    let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]*$/
    if (!reg.test(value)) {
        callback(new Error("Password must contain numbers and letters"))
    } else {
        callback()
    }
}

const checkRepeat = (rule, value, callback) => {
    if (value !== registerData.value.password) {
        callback(new Error("The two passwords do not match"))
    } else {
        callback()
    }
}

const rules = {
    identity: [
        {required: true, message: "Please choose your identity", trigger: "blur"}
    ],
    email: [
        {required: true, message: "Please enter an email", trigger: "blur"},
        {min: 1, max: 32, message: "Overlong email address", trigger: "blur"},
        {validator: checkEmail, trigger: "blur"}
    ],
    password: [
        {required: true, message: "Please set your password", trigger: "blur"},
        {min: 8, max: 16, message: "Please set an 8-16 digit password", trigger: "blur"},
        {validator: checkPassword, trigger: "blur"}
    ],
    passwordRepeat: [
        {required: true, message: "Please repeat your password", trigger: "blur"},
        {validator: checkRepeat, trigger: "blur"}
    ],
    name: [
        {required: true, message: "Please set an username", trigger: "blur"},
        {min: 1, max: 16, message: "Please set an 1-16 digit username", trigger: "blur"}
    ],
    captcha: [
        {required: true, message: "Please enter the captcha", trigger: "blur"},
    ]
}

const codeRule = {
    code: [
        {required: true, message: "Check your email and enter the verification code", trigger: "blur"}
    ]
}

const captchaUrl = ref("")

const getCaptcha = async () => {
    let result = await getCaptchaService()
    captchaUrl.value = window.URL.createObjectURL(result)
}

const handelClose = () => {
    registerData.value.captcha = ""
    getCaptcha()
    emailDialogVisible.value = false
}


</script>

<template>
    <div class="register-page">
        <div class="title">
            <span>Sign In</span>
        </div>
        <el-form label-width="auto" label-position="right" v-bind:model="registerData" v-bind:rules="rules" ref="registerDataRef" size="large">
            <el-form-item prop="email">
                <el-input type="text" v-model="registerData.email" placeholder="Email" v-bind:prefix-icon="Message"/>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="registerData.password" placeholder="Password" v-bind:prefix-icon="Lock"/>
            </el-form-item>
            <el-form-item prop="passwordRepeat">
                <el-input type="password" v-model="registerData.passwordRepeat" placeholder="Confirm password" v-bind:prefix-icon="Lock"/>
            </el-form-item>
            <el-form-item prop="name">
                <el-input type="text" v-model="registerData.name" placeholder="Name" v-bind:prefix-icon="User"/>
            </el-form-item>
            <el-form-item prop="captcha">
                <el-input type="text" v-model="registerData.captcha" placeholder="Captcha" v-bind:prefix-icon="Monitor" style="width: 190px; margin-right: 20px"/>
                <img alt="" v-bind:src="captchaUrl" @click="getCaptcha">
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="checkAll(registerDataRef)" style="width: 100%">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
    
    <el-dialog v-model="emailDialogVisible" title="Verify your email" width="500" v-bind:before-close="handelClose">
        <el-form v-bind:model="emailCode" v-bind:rules="codeRule" size="large" ref="emailCodeRef">
            <el-form-item prop="code">
                <el-input v-model="emailCode.code" v-bind:prefix-icon="Promotion" placeholder="Verification code" style="width: 362px"/>
                <el-button type="primary" @click="checkAll" style="margin-left: 24px; width: 80px">Resend</el-button>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="checkEmailCode(emailCodeRef)">Complete</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped>

.register-page {
    padding: 32px 48px;
    background: var(--el-color-white);
    width: 360px;
    border-radius: 12px;
}

.title {
    color: var(--el-color-black);
    font-size: 32px;
    font-weight: bolder;
    margin-bottom: 24px;
    text-align: center;
}


</style>