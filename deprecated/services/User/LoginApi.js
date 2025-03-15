import axios from "axios";
import apiClient from "@/deprecated/services/api.js";

export const UserLogin = async (data) =>{
        return apiClient.post('/user/login', data);
}