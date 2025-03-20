<script setup>
    import QuestionView from "@/components/assignment/QuestionView.vue";
    import {defineProps} from "vue"

    const props = defineProps({
        questionList: {
            type: Array,
            required: true
        },
        scores: {
            type: Array,
            required: true
        }
    })
    const answers = []
    const collect = (i, ans) => {
        answers[i] = ans
    }
</script>

<template>
    <div class="assignment-view">
        <div v-for="(q, i) in questionList" class="assignment-item border-bottom">
            <div class="assignment-item-index">
                <span>{{ i + 1 }}.</span>
            </div>
            <question-view :question="q.content" :type="q.questionType" :index="i" :collect="collect"/>
            <div class="assignment-item-score">
                <span>{{ scores[i] }} 分</span>
            </div>
        </div>
        <div class="assignment-bottom">
            <div class="submit-assignment-button submit">
                <span>提交</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .assignment-bottom {
        padding: 20px;
        display: flex;
        justify-content: center;
        text-align: center;
    }
    .assignment-item {
        padding: 10px;
        display: flex;
        justify-content: left;
    }
    .assignment-item-index {
        margin-top: 10px;
        font-size: 16px;
        font-weight: bold;
        color: var(--el-color-info-dark-2);
        width: 20px;
    }
    .assignment-item-score {
        margin-top: 10px;
        font-size: 12px;
        font-weight: bold;
        color: var(--el-color-info-dark-2);
        width: 40px;
    }
    .submit-assignment-button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        width: 120px;
        height: 30px;
        border: 1px solid var(--el-border-color-light);
        border-radius: 8px;
        cursor: default;
        transition: 0.3s;
    }
    .submit {
        color: var(--el-color-info-dark-2);
        font-size: 14px;
        background-color: var(--el-color-primary-light-7);
        border: 1px solid var(--el-color-primary-light-3);
    }
    .submit:hover {
        background-color: var(--el-color-primary-light-3);
        color: var(--el-color-white);
    }
</style>