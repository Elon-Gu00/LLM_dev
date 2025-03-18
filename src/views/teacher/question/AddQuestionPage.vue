<script setup>
    import {router} from "@/router/index.js";
    import Choice from "@/components/question/Choice.vue";
    import PageHeader from "@/components/PageHeader.vue";
    import {apiAddQuestion} from "@/apis/questionApis.js";
    import {ElMessage} from "element-plus";
    import {defineEmits, ref} from 'vue'
    import {questionTypeToChinese} from "@/utils/index.js";
    import {onBeforeRouteLeave, onBeforeRouteUpdate} from "vue-router";
    import {useQuestionRefreshStore} from "@/stores/index.js";

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
</script>

<template>
    <page-header :content="'添加题目 - ' + questionTypeToChinese(type)" />
    <div class="height-level-3">
        <el-scrollbar>
            <div v-if="type === 'choice'">
                <Choice mode="edit" @save="submit"/>
            </div>
            <div v-if="type === 'fill-blank'">
                填空题
            </div>
            <div v-if="type === 'essay'">
                问答题
            </div>
            <div v-if="type === 'programming'">
                编程题
            </div>
        </el-scrollbar>
    </div>
</template>

<style scoped>

</style>