import request from "@/request/index.js"

export function apiSearchCourse(keyword) {
    return request.get("/course/search?courseName=" + keyword)
}