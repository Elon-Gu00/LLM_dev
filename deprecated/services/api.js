import axios from "axios";
import router from "@/deprecated/router/index.js";

const apiClient = axios.create({
    baseURL:"/api",
    timeout:1000,
    headers:{
        'Content-Type':'application/json'
    }
})
    // apiClient.interceptors.request.use(
    // (config) => {
    //      const token = localStorage.getItem('token');
    //      if (token) {
    //          config.headers.Authorization = `Bearer ${token}`;
    //     }
    //      return config;
    //  },
    // (error) => {
    //      return Promise.reject(error);
    //  });

    apiClient.interceptors.response.use(result=>{
            if(result.status === 200){
                return result.data
            }else{
                return Promise.reject(result)
            }
        },
    async error => {
        if (error.status === 401) {
            console.error('Token 已过期或无效，请重新登录');
            // router.push('/login')
        }
        return Promise.reject(error);
    }
);

export default apiClient;