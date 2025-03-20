<script setup>
    import PageHeader from "@/components/PageHeader.vue"
    import {ref, onMounted} from "vue";
    import SearchBar from "@/components/SearchBar.vue";
    import {ChatDotRound, Cpu, Operation, Plus, Tickets} from "@element-plus/icons-vue";
    import {apiGetQuestion} from "@/apis/questionApis.js";
    import {ElMessage} from "element-plus";
    import AssignmentListItem from "@/components/assignment/AssignmentListItem.vue";
    import QuestionExplorer from "@/components/assignment/QuestionExplorer.vue";
    import AssignmentView from "@/components/assignment/AssignmentView.vue";
    import {apiAddAssignment, apiAddAssignmentQuestion} from "@/apis/assignmentApis.js";
    import {useAssignmentRefreshStore} from "@/stores/index.js";
    const assignmentName = ref("")
    const assignmentDescription = ref("")
    const questionExplorerShow = ref(false)
    const questionList = ref({
        choice: [],
        fillBlank: [],
        essay: [],
        programming: []
    })
    const teacherId = localStorage.getItem('teacherId')
    const setQuestionList = async () => {
        const result = await apiGetQuestion(teacherId)
        if (result.code === 1) {
            Object.values(questionList.value).forEach(list => {
                list.splice(0, list.length)
            })
            const data = result.data[teacherId]
            data.forEach(item => {
                item.content = JSON.parse(item.content)
                item.answer = JSON.parse(item.answer)
                if (item.questionType === 'choice') {
                    questionList.value.choice.push(item)
                }
                if (item.questionType === 'fill-blank') {
                    questionList.value.fillBlank.push(item)
                }
                if (item.questionType === 'essay') {
                    questionList.value.essay.push(item)
                }
                if (item.questionType === 'programming') {
                    questionList.value.programming.push(item)
                }
            })
        }
        else {
            ElMessage.warning(result.message)
        }
    }
    onMounted(() => {
        setQuestionList()
    })
    const selected = ref([])
    const scores = ref([])
    const addQuestion = (question) => {
        selected.value.push(question)
        scores.value.push(0)
        questionExplorerShow.value = !questionExplorerShow.value
    }
    const setScore = (ind, score) => {
        scores.value[ind] = score
    }
    const removeQuestion = (ind) => {
        selected.value.splice(ind, 1)
        scores.value.splice(ind, 1)
    }
    const check = () => {
        if (assignmentName.value === '') {
            ElMessage.warning('请设置作业名称')
            return false
        }
        if (selected.value.length === 0) {
            ElMessage.warning('请添加题目')
            return false
        }
        return true
    }
    const addAssignment = async () => {
        if (!check()) return
        let result = await apiAddAssignment({
            teacherId: teacherId,
            title: assignmentName.value,
            description: assignmentDescription.value
        })
        if (result.code === 1) {
            useAssignmentRefreshStore().changeStatus()
            ElMessage.success('作业模版已创建，正在添加题目...')
            const assignmentId = result.data
            const list = []
            for (let i = 0; i < selected.value.length; i++) {
                list.push({
                    questionId: selected.value[i].questionId,
                    score: scores.value[i],
                    sortOrder: i + 1
                })
            }
            result = await apiAddAssignmentQuestion(assignmentId, list)
            if (result.code === 1) {
                ElMessage.success('已保存')
            }
            else {
                ElMessage.warning('添加题目遇到问题 >_<')
            }
        }
        else {
            ElMessage.warning(result.message)
        }
    }
</script>

<template>
    <page-header content="添加作业模版"/>
    <el-container class="height-level-3">
        <el-aside class="edit-assignment-left">
            <div class="height-level-3 border-right">
                <div class="edit-assignment-header border-bottom">
                    <div class="input-bar-title">
                        <span>作业名</span>
                    </div>
                    <el-input v-model="assignmentName" maxlength="30" show-word-limit/>
                    <div class="edit-assignment-button save" @click="addAssignment">
                        <span>保存</span>
                    </div>
                </div>
                <div class="height-level-4">
                    <el-scrollbar>
                        <div class="edit-assignment-main">
                            <div class="input-bar-title margin-bottom-10">
                                <span>作业描述</span>
                            </div>
                            <el-input v-model="assignmentDescription" type="textarea" maxlength="300" show-word-limit />
                        </div>
                        <div class="edit-assignment-main">
                            <div class="input-bar-title margin-bottom-10">
                                <span>题目编排</span>
                            </div>
                            <div class="question-selector">
                                <div class="question-selector-header question-item-margin">
                                    <search-bar size="default" placeholder="搜索题目" :disable="true" />
                                </div>
                                <assignment-list-item v-for="(q, ind) in selected" class="question-item-margin" :ind="ind" @remove="removeQuestion(ind)" @score="setScore">
                                    <template #index>{{ ind + 1 }}</template>
                                    <span>{{ q.content.title }}</span>
                                </assignment-list-item>
                                <div class="question-selector-header question-item-margin add" @click="questionExplorerShow = !questionExplorerShow">
                                    <el-icon><Plus /></el-icon>
                                    <span>添加题目</span>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </el-aside>
        <el-aside class="edit-assignment-right">
            <div class="height-level-3 border-right">
                <div class="edit-assignment-header border-bottom">
                    <div class="input-bar-title">
                        <span>作业预览</span>
                    </div>
                </div>
                <div class="height-level-4">
                    <el-scrollbar>
                        <assignment-view :question-list="selected" :scores="scores" :show-submit="false"/>
                    </el-scrollbar>
                </div>
            </div>
        </el-aside>
    </el-container>
    <el-dialog v-model="questionExplorerShow" width="300" title="选择题目" draggable>
        <question-explorer :question-list="questionList" @select="addQuestion" />
    </el-dialog>
</template>

<style scoped>
    .edit-assignment-left {
        width: 40%;
    }
    .edit-assignment-right {
        width: 60%;
    }
    .edit-assignment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        padding: 0 10px;
        gap: 10px;
    }
    .edit-assignment-main {
        padding: 10px;
    }
    .margin-bottom-10 {
        margin-bottom: 10px;
    }
    .input-bar-title {
        width: 66px;
        font-weight: bold;
        font-size: 16px;
        color: var(--el-color-info);
    }
    .edit-assignment-button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        width: 60px;
        height: 30px;
        border: 1px solid var(--el-border-color-light);
        border-radius: 8px;
        cursor: default;
        transition: 0.3s;
    }
    .save {
        color: var(--el-color-info-dark-2);
        font-size: 14px;
        background-color: var(--el-color-primary-light-7);
        border: 1px solid var(--el-color-primary-light-3);
    }
    .remove {
        width: 40px;
        height: 20px;
        color: var(--el-color-info-dark-2);
        font-size: 12px;
        background-color: var(--el-color-danger-light-7);
        border: 1px solid var(--el-color-danger-light-3);
    }
    .save:hover {
        background-color: var(--el-color-primary-light-3);
        color: var(--el-color-white);
    }
    .remove:hover {
        background-color: var(--el-color-danger-light-3);
        color: var(--el-color-white);
    }
    .question-selector {
        border-radius: 4px;
        border: 1px solid var(--el-border-color-light);
    }
    .question-selector-header {
        flex: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .question-selected {
        padding: 10px;
        height: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid var(--el-border-color-light);
        border-radius: 20px;
    }
    .question-item-margin {
        margin: 10px;
    }
    .add {
        cursor: default;
        font-weight: bold;
        height: 30px;
        border-radius: 15px;
        border: 1px solid var(--el-color-primary-light-3);
        color: var(--el-color-info-dark-2);
        background-color: var(--el-color-primary-light-7);
        transition: 0.3s;
    }
    .add:hover {
        color: var(--el-color-white);
        background-color: var(--el-color-primary-light-3);
        border: 1px solid var(--el-color-primary-light-3);
    }
</style>