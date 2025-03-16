import request from "@/request/index.js"

export function apiLogin(username, password) {
    return request.post("/user/login", {
        username: username,
        password: password
    })
}