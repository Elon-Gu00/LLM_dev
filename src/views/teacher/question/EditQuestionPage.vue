<script setup>
    import {router} from "@/router/index.js"
    import Choice from "@/components/question/ChoiceEditor.vue"
    import PageHeader from "@/components/PageHeader.vue"
    import {defineEmits, ref, onMounted, onBeforeMount, watch} from 'vue'
    import {questionTypeToChinese} from "@/utils/index.js"
    import {apiRemoveQuestion, apiUpdateQuestion} from "@/apis/questionApis.js"
    import {ElMessage} from "element-plus"
    import {useQuestionRefreshStore} from "@/stores/index.js";
    import FillBlank from "@/components/question/FillBlankEditor.vue";
    import Essay from "@/components/question/EssayEditor.vue";

    const type = ref(router.currentRoute.value.params['type'])
    const refresh = useQuestionRefreshStore()
    const submit = async (content, answer, questionId) => {
        const data = {
            questionId: questionId,
            content: content,
            answer: answer,
            questionType: type.value
        }
        const result = await apiUpdateQuestion(data)
        if (result.code === 1) {
            ElMessage.success("已保存")
            refresh.changeStatus()
        }
        else {
            ElMessage.warning(result.message)
        }
    }
    const del = async (questionId) => {
        const result = await apiRemoveQuestion(questionId)
        if (result.code === 1) {
            ElMessage.success("已删除")
            refresh.changeStatus()
            await router.replace('/teacher/question')
        }
        else {
            ElMessage.warning(result.message)
        }
    }
    watch(router.currentRoute, (value, oldValue, onCleanup) => {
        if (value.params['type']) {
            type.value = value.params['type']
        }
    })

</script>

<template>
    <page-header :content="'编辑题目 - ' + questionTypeToChinese(type)" />
    <div class="height-level-3">
        <el-scrollbar>
            <div v-if="type === 'choice'">
                <choice @save="submit" @delete="del" />
            </div>
            <div v-if="type === 'fill-blank'">
                <fill-blank @save="submit" @delete="del" />
            </div>
            <div v-if="type === 'essay'">
                <essay @save="submit" @delete="del" />
            </div>
            <div v-if="type === 'programming'">
                编程题
            </div>
        </el-scrollbar>
    </div>
</template>

<style scoped>

</style>