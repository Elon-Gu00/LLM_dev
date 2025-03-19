<script setup>
    import {ref, defineProps, onBeforeMount, onMounted, onUpdated, watch} from "vue"
    import {numberToLetter} from "@/utils/index.js"
    import {Minus, Plus} from "@element-plus/icons-vue"
    import {ElMessage} from "element-plus"
    import {apiGetQuestionInfo} from "@/apis/questionApis.js"
    import {router} from "@/router/index.js"
    const questionData = ref({
        title: "",
        description: "",
        answer: ""
    })
    const emits = defineEmits(['save', 'delete'])
    const save = (el) => {
        if (!el) return
        el.validate((valid) => {
            if (valid) {
                const content = JSON.stringify({
                    title: questionData.value.title,
                    description: questionData.value.description
                })
                const answer = JSON.stringify({
                    answer: questionData.value.answer
                })
                console.log(content)
                emits('save', content, answer, questionId.value)
            }
        })
    }
    const matchBlankAndAnswer = (rule, value, callback) => {
        const blanks = questionData.value.description.split(') ____').length - 1
        let answers = questionData.value.answer.split('|').length
        if (questionData.value.answer !== '' && answers !== '') {
            answers = 1
        }
        if (blanks !== answers) {
            callback(Error("空与答案个数不匹配"))
        }
        else {
            callback()
        }
    }
    const fromRef = ref()
    const rules = {
        title: [
            { required: true, message: "请输入名称", trigger: 'blur' }
        ],
        description: [
            { required: true, message: "请输入题目描述", trigger: 'blur' }
        ],
        answer: [
            { required: true, validator: matchBlankAndAnswer, trigger: 'blur' }
        ]
    }
    const getQuestionInfo = async () => {
        if (questionId.value) {
            const result = await apiGetQuestionInfo(questionId.value)
            if (result.code === 1) {
                if (result.data.length > 0) {
                    const data = result.data[0]
                    const content = JSON.parse(data.content)
                    questionData.value.title = content.title
                    questionData.value.description = content.description
                    questionData.value.answer = JSON.parse(data.answer).answer
                }
                else {
                    if (router.currentRoute.value.fullPath.indexOf('/add') === -1) {
                        await router.replace('/teacher/question')
                    }
                }
            }
        }
    }
    const questionId = ref(router.currentRoute.value.params['questionId'])
    onMounted(() => {
        getQuestionInfo()
    })
    watch(router.currentRoute, (value, oldValue, onCleanup) => {
        if (value.params['questionId']) {
            questionId.value = value.params['questionId']
            getQuestionInfo()
        }
    })
    const del = () => {
        emits('delete', questionId.value)
    }
    const addBlank = () => {
        const ind = questionData.value.description.split(') ____').length
        questionData.value.description += ('(' + ind + ') ____ ')
    }
    const addSplit = () => {
        const blanks = questionData.value.description.split(') ____').length - 1
        const answers = questionData.value.answer.split('|').length
        if (blanks > answers) {
            questionData.value.answer += '|'
        }
        else {
            ElMessage.warning("答案比空多啦 >_<")
        }
    }
</script>

<template>
    <el-container>
        <el-aside class="edit-fill-blank border-right">
            <el-form :model="questionData" label-position="top" ref="fromRef" :rules="rules" hide-required-asterisk>
                <div class="edit-top">
                    <div class="option-button save" @click="save(fromRef)">
                        <span>保存</span>
                    </div>
                    <div class="option-button delete" v-if="questionId" @click="del">
                        <span>删除</span>
                    </div>
                </div>
                <el-form-item prop="title">
                    <template #label>
                        <div class="from-label">
                            <span>题目名称</span>
                        </div>
                    </template>
                    <el-input v-model="questionData.title" placeholder="题目名称" maxlength="30" show-word-limit clearable/>
                </el-form-item>
                <el-form-item prop="description">
                    <template #label>
                        <div class="from-label">
                            <span>题目描述</span>
                            <div class="option-button add" @click="addBlank">
                                <el-icon><Plus /></el-icon>
                                <span>待填空</span>
                            </div>
                        </div>
                    </template>
                    <el-input v-model="questionData.description" type="textarea" :rows="questionData.description.split('\n').length + 1" placeholder="题目描述" maxlength="300" show-word-limit resize="none"/>
                </el-form-item>
                <el-form-item prop="answer">
                    <template #label>
                        <div class="from-label">
                            <span>答案</span>
                            <div class="option-button add" @click="addSplit">
                                <el-icon><Plus /></el-icon>
                                <span>分隔</span>
                            </div>
                        </div>
                    </template>
                    <div class="options">
                        <el-input v-model="questionData.answer" type="text" placeholder="答案" />
                    </div>
                </el-form-item>
            </el-form>
        </el-aside>
        <el-aside class="preview-choice">
            <div class="preview-item preview-title">
                <span>题目预览</span>
            </div>
            <div class="preview-item" v-if="questionData.title !== ''">
                <div class="from-label">
                    <span>题目名称</span>
                </div>
                <div>
                    <span>{{ questionData.title }}</span>
                </div>
            </div>
            <div class="preview-item" v-if="questionData.description !== ''">
                <div class="from-label">
                    <span>题目描述</span>
                </div>
                <div v-for="(p) in questionData.description.split('\n')">
                    {{ p }}
                </div>
            </div>
            <div class="preview-item" v-if="questionData.answer !== ''">
                <div class="from-label">
                    <span>答案</span>
                </div>
                <div class="options">
                    <div v-for="(ans, index) in questionData.answer.split('|')" class="option">
                        <div class="option-index">
                            <span>({{ index + 1 }})</span>
                        </div>
                        <div>
                            <span>{{ ans }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-aside>
    </el-container>
</template>

<style scoped>
    .edit-fill-blank {
        padding: 10px;
        width: 50%;
    }
    .edit-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .border-right {
        border-right: 1px solid var(--el-border-color-light);
    }
    .from-label {
        font-size: 17px;
        font-weight: bold;
        color: var(--el-color-info-dark-2);
        margin-bottom: 5px;
        display: flex;
        justify-content: left;
        align-items: center;
        gap: 10px;
    }
    .options {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }
    .option {
        display: flex;
        justify-content: left;
        align-items: center;
        gap: 10px;
    }
    .option-index {
        font-size: 16px;
        color: var(--el-color-info-dark-2);
        font-weight: bold;
        text-align: center;
        display: inline-block;
        height: 30px;
        width: 20px;
        line-height: 30px;
    }
    .option-button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        border: 1px solid var(--el-border-color-light);
        gap: 3px;
        cursor: default;
        border-radius: 8px;
        width: 60px;
        transition: 0.3s;
        font-size: 13px;
    }
    .option-button.add:hover {
        border: 1px solid var(--el-color-primary);
        color: var(--el-color-primary);
    }
    .option-button.remove:hover {
        border: 1px solid var(--el-color-danger);
        color: var(--el-color-danger);
    }
    .save {
        font-size: 14px;
        background-color: var(--el-color-primary-light-7);
        border: 1px solid var(--el-color-primary-light-3);
    }
    .option-button.save:hover {
        background-color: var(--el-color-primary-light-3);
        color: var(--el-color-white);
    }
    .delete {
        font-size: 14px;
        background-color: var(--el-color-danger-light-7);
        border: 1px solid var(--el-color-danger-light-3);
    }
    .option-button.delete:hover {
        background-color: var(--el-color-danger-light-3);
        color: var(--el-color-white);
    }
    .answer {
        width: 120px;
    }
    .preview-choice {
        width: 50%;
    }
    .preview-item {
        margin: 15px;
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
    .preview-title {
        font-size: 20px;
        font-weight: bold;
    }
    .hint {
        color: var(--el-color-info);
    }
</style>