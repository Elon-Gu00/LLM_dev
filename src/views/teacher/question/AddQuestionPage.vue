<script setup>
    import {router} from "@/router/index.js";
    import Choice from "@/components/question/Choice.vue";
    import PageHeader from "@/components/PageHeader.vue";
    import {apiAddQuestion} from "@/apis/questionApis.js";
    import {ElMessage} from "element-plus";
    import {defineEmits, ref, watch} from 'vue'
    import {questionTypeToChinese} from "@/utils/index.js";
    import {onBeforeRouteLeave, onBeforeRouteUpdate} from "vue-router";
    import {useQuestionRefreshStore} from "@/stores/index.js";
    import FillBlank from "@/components/question/FillBlank.vue";
    import Essay from "@/components/question/Essay.vue";

    const type = ref(router.currentRoute.value.params['type'])
    const refresh = useQuestionRefreshStore()
    const submit = async (content, answer) => {
        const data = {
            teacherId: localStorage.getItem("teacherId"),
            content: content,
            answer: answer,
            questionType: type.value
        }
        const result = await apiAddQuestion(data)
        if (result.code === 1) {
            ElMessage.success("已保存")
            refresh.changeStatus()
        }
        else {
            ElMessage.warning(result.message)
        }
    }
    onBeforeRouteUpdate((to, from, next) => {
        const toType = to.params['type']
        if (toType !== null) {
            if (toType !== type.value) {
                type.value = toType
            }
        }
        next()
    })
    watch(router.currentRoute, (value, oldValue, onCleanup) => {
        if (value.params['type']) {
            type.value = value.params['type']
        }
    })
</script>

<template>
    <page-header :content="'添加题目 - ' + questionTypeToChinese(type)" />
    <div class="height-level-3">
        <el-scrollbar>
            <div v-if="type === 'choice'">
                <choice @save="submit" />
            </div>
            <div v-if="type === 'fill-blank'">
                <fill-blank @save="submit" />
            </div>
            <div v-if="type === 'essay'">
                <essay @save="submit" />
            </div>
            <div v-if="type === 'programming'">
                编程题
            </div>
        </el-scrollbar>
    </div>
</template>

<style scoped>

</style>