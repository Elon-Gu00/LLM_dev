import apiClient from "@/services/api.js";

export const getCourse = async (id)=>{
    return apiClient.get(`/course/student/list?id=${id}`,{
        headers:{Authorization:localStorage.getItem('token')}
    });
}

export const joinCourse = async (id,courseId)=>{
    return apiClient.get(`/course/student/join?id=${id}&courseId=${courseId}`,{
        headers:{Authorization:localStorage.getItem('token')}
    })
}

