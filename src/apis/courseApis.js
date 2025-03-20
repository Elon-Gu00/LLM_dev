import request from "@/request/index.js"

export function apiSearchCourse(keyword) {
    return request.get("/course/search?courseName=" + keyword)
}

export function apiGetStudentCourse(studentId){
    return request.get("/course/student/list?id=" + studentId)
}

export function  apiGetCourseInfo(CourseId){
    return request.get('/course/info?courseId=' + CourseId)
}

export function apiGetCourseTechId(CourseId){
    return request.get("/course/teachers?courseId=" + CourseId)
}

export function  apiGetCourseTechName(techId){
    return request.get("/user/info?userId="+"&studentId"+"&teacherId=" + techId + "&administratorId=" )
}

export function apiStudentJoinCourse(id,CourseId){
    return request.get("/course/student/join?id=" + id +"&courseId=" + CourseId)
}

export function apiGetCourseClass(CourseId){
    return request.get("/class/list?courseId=" + CourseId)
}

export function apiGetTeacherCourse(teacherId) {
    return request.get(`/course/teacher/list?id=${teacherId}`)
}

export function apiAddCourse(data) {
    return request.post('/course/add', data)
}

export function apiAddClass(data) {
    return request.post('/class/add', data)
}

export function apiAddTeach(teacherId, courseId) {
    return request.get(`/course/teacher/join?id=${teacherId}&courseId=${courseId}`)
}

export function apiChangeState(courseId, state) {
    return request.patch(`/course/state?courseId=${courseId}&state=${state}`)
}

export function apiFileCourse(courseId) {
    return request.patch(`/course/file?courseId=${courseId}`)
}