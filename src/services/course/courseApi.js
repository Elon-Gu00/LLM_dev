import apiClient from "@/services/api.js";

export const getCourseInfo = async (courseId)=>{
    return apiClient.get(`/course/info?courseId=${courseId}`,{
        headers:{Authorization:localStorage.getItem('token')}
    });
}

export const searchCourse_in_name = async (courseName)=>{
    return apiClient.get(`/course/search?courseName=${courseName}`,{
        headers:{Authorization:localStorage.getItem('token')}
    })
}

export const getCourseTech = async (courseId)=>{
    return apiClient.get(`/course/teachers?courseId=${courseId}`,{
        headers:{Authorization:localStorage.getItem('token')}
    })
}