<script setup>
import MainBody from "@/components/MainBody.vue"
const identity = localStorage.getItem('identity')
const nickname = localStorage.getItem('nickname')
</script>

<template>
    <main-body :identity="identity" :nickname="nickname">
        <div>
            teacher
        </div>
        <router-view></router-view>
    </main-body>
</template>

<style scoped>

</style>