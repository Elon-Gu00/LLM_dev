<script setup>
import MainBody from "@/components/MainBody.vue"
const identity = localStorage.getItem('identity')
const nickname = localStorage.getItem('nickname')
</script>

<template>
    <main-body :identity="identity" :nickname="nickname">
        <el-scrollbar>
            <router-view></router-view>
        </el-scrollbar>
    </main-body>
</template>

<style scoped>

</style>