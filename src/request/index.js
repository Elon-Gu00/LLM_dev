import axios from "axios"
import {ElMessage} from "element-plus"
import {router} from "@/router/index.js"

const baseURL = "/api"
const instance = axios.create({ baseURL })

instance.interceptors.request.use(
    config => {
        if (!config.url.includes("/user/login")) {
            config.headers.Authorization = localStorage.getItem("token")
        }
        console.log(config.data)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            console.log(response.data)
            return response.data
        } else {
            ElMessage.error(response.data.message ? response.data.message : "SERVER_ERROR")
            return Promise.reject(response)
        }
    },
    async error => {
        if (error.status === 401) {
            ElMessage.warning("登录过期，请重新登录")
            await router.replace("/")
        }
        else {
            ElMessage.error("SERVER_ERROR")
        }
        return Promise.reject(error)
    })

export default instance