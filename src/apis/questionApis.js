import request from "@/request/index.js";

export function apiAddQuestion(data) {
    return request.post('/question/add', data)
}

export function apiGetQuestion(teacherId) {
    return request.get(`/question/list?teacherId=${teacherId}`)
}

export function apiGetQuestionInfo(questionId) {
    return request.get(`/question/info?questionId=${questionId}`)
}

export function apiUpdateQuestion(data) {
    return request.patch(`/question/modify`, data)
}

export function apiRemoveQuestion(questionId) {
    return request.delete(`/question/delete?questionId=${questionId}`)
}