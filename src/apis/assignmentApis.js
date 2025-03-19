import request from "@/request/index.js";

export function apiAssignmentOfTeacher(teacherId) {
    return request.get(`/assignment/list?teacherId=${teacherId}`)
}