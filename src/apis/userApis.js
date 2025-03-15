import request from "@/request/index.js"

export const apiLogin = (username, password) => {
    return request.post("/user/login", {
        username: username,
        password: password
    })
}