<script setup>
    import {router} from "@/router/index.js";
    import {identityToChinese} from "../utils/index.js";
    import { onBeforeMount, ref } from "vue"

    const props = defineProps({
        identity: {
            required: true,
            type: Array
        }
    })
    const go = (ide) => {
        localStorage.setItem("identity", ide)
        router.push('/' + ide)
    }
    onBeforeMount(() => {
        if (props.identity.length === 1) {
            go(props.identity[0])
        }
    })
</script>

<template>
    <div class="identity-select-main">
        <div v-for="ide in props.identity" class="identity-select-item" @click="go(ide)">
            <span>{{ identityToChinese(ide) }}</span>
        </div>
    </div>
</template>

<style scoped>
    .identity-select-main {
        padding: 32px 48px;
        border-radius: 12px;
        width: 360px;
    }

    .identity-select-item {
        margin: 20px;
        text-align: center;
        padding: 10px 20px;
        font-size: 24px;
        color: var(--el-color-black);
        background-color: var(--el-fill-color-dark);
    }
</style>