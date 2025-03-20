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