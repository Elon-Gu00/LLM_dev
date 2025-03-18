<script setup>
    import MainBody from "@/components/MainBody.vue"
    import {ref, onBeforeMount, onMounted} from "vue"
    import {router} from "@/router/index.js";
    import {ElMessage} from "element-plus";
    const identity = ref("")
    const nickname = ref("")
    onMounted(() => {
        if (localStorage.getItem("token") !== null) {
            identity.value = localStorage.getItem("identity")
            nickname.value = localStorage.getItem("nickname")
        }
        else {
            router.replace('/')
        }
    })
</script>

<template>
    <main-body :identity="identity" :nickname="nickname">
        <router-view></router-view>
    </main-body>
</template>

<style scoped>

</style>