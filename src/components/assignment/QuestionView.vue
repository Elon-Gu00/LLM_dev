<script setup>
    import {numberToLetter} from "@/utils/index.js"
    import {ref, defineProps} from "vue";

    const props = defineProps({
        index: {
            type: Number,
            required: true
        },
        question: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        collect: {
            type: Function,
            required: true
        }
    })
    const answer = ref("")
    const setAnswer = (isFillBlank, ans) => {
        if (!isFillBlank) {
            answer.value = ans
        }
        else {
            const blanks = props.question.description.split(') ____').length - 1
            ans = ""
            for (let i = 0; i < blanks; i++) {
                const v = fillBlanks.value[i] === undefined ? "" : fillBlanks.value[i]
                if (i !== blanks - 1) {
                    ans += (v + '|')
                }
                else {
                    ans += v
                }
            }
            props.collect(props.index, ans)
        }
    }
    const fillBlanks = ref(Array(props.question.description.split(') ____').length - 1))
</script>

<template>
    <div class="question-view" v-if="type === 'choice'">
        <div class="preview-item">
            <div v-for="(p) in question.description.split('\n')">
                {{ p }}
            </div>
        </div>
        <div class="preview-item">
            <div class="preview-option" v-for="(op, index) in question.option">
                <div class="option-index" :class="{ 'is-select': numberToLetter(index) === answer }" @click="setAnswer(false, numberToLetter(index))">
                    <span>{{ numberToLetter(index) }}</span>
                </div>
                <div class="option-info">
                    <span>{{ op }}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="question-view" v-if="type === 'fill-blank'">
        <div class="preview-item">
            <div v-for="(p) in question.description.split('\n')">
                {{ p }}
            </div>
        </div>
        <div class="preview-item">
            <el-input class="input-gap"
                      v-for="(item, ind) in question.description.split(') ____').length - 1"
                      v-model="fillBlanks[ind]"
                      :placeholder="'请输入第 (' + (ind + 1) + ') 空'"
                      @blur="setAnswer(true, fillBlanks[ind])"/>
        </div>
    </div>
    <div class="question-view" v-if="type === 'essay'">
        <div class="preview-item">
            <div v-for="(p) in question.description.split('\n')">
                {{ p }}
            </div>
        </div>
        <div class="preview-item">
            <el-input type="textarea" v-model="answer" placeholder="请输入回答" @blur="setAnswer(false, answer)"/>
        </div>
    </div>
</template>

<style scoped>
    .question-view {
        width: 100%;
    }
    .preview-item {
        margin: 10px;
    }
    .preview-option {
        display: flex;
        justify-content: left;
        align-items: center;
        gap: 5px;
    }
    .option-info {
        font-size: 17px;
    }
    .option-index {
        font-size: 18px;
        color: var(--el-color-info-dark-2);
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        width: 30px;
        border: 1px solid var(--el-border-color-light);
        border-radius: 8px;
        cursor: pointer;
        transition: 0.3s;
    }
    .option-index:hover {
        border: 1px solid var(--el-color-primary-light-3);
        color: var(--el-color-primary);
    }
    .is-select {
        border: 1px solid var(--el-color-primary-light-3);
        color: var(--el-color-primary);
    }
    .input-gap {
        margin: 5px 0;
    }
</style>