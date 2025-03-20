import request from "@/request/index.js";

export function apiAssignmentOfTeacher(teacherId) {
    return request.get(`/assignment/list?teacherId=${teacherId}`)
}

export function apiAddAssignment(data) {
    return request.post('/assignment/add', data)
}

export function apiAddAssignmentQuestion(assignmentId, questionList) {
    return request.post(`/assignment/question/add?assignmentId=${assignmentId}`, questionList)
}

export function apiGetAssignmentInfo(assignmentId) {
    return request.get(`/assignment/info?assignmentId=${assignmentId}`)
}

export function apiGetAssignmentQuestion(assignmentId) {
    return request.get(`/assignment/question/list?assignmentId=${assignmentId}`)
}

export function apiRemoveAssignmentQuestion(assignmentQuestionId) {
    return request.delete(`/assignment/question/remove?assignmentQuestionId=${assignmentQuestionId}`)
}

export function apiUpdateAssignment(data) {
    return request.patch('/assignment/modify', data)
}