
<template>
      <div class="container-wrapper" >
        <el-row :gutter="20" style="background-color: #FAFCFF; min-width: 800px; border-radius: 4px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); padding: 100px;"
        >
          <el-col :span="12" style="display: flex;justify-content: center;align-items: center; ">
            <el-text type="primary" size="large">基于大模型的客观化评价系统</el-text>
          </el-col>
          <el-col :span="12" style="display: flex;justify-content: center;align-items: center; ">
            <el-form :model="userForm"
                     :rules="rules"
                     ref="ruleFormRef"
                     label-width="auto"
                     style="max-width: 600px"
            >
            <el-form-item label="客户端">
              <el-segmented style="width: 400px" v-model="userForm.Identity" :options="IdentityOptions" block/>
            </el-form-item>
            <el-form-item  prop="userID" label="用户名" show-message>
              <el-input v-model="userForm.userID" clearable />
            </el-form-item>
            <el-form-item prop="password" label="密码" show-message>
              <el-input v-model="userForm.password" type="password" clearable/>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 100%;" type="primary" @click="checkAll(ruleFormRef)">登录</el-button>
            </el-form-item>
          </el-form>
          </el-col>
        </el-row>
      </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {ElMessage, ElNotification} from "element-plus";
import {UserLogin} from "@/services/User/LoginApi.js";

const ruleFormRef = ref();
const router = useRouter();
const IdentityOptions = ['学生','教师','管理员']

//sha256
async function sha256(message) {
      const encoder = new TextEncoder();
      const data = encoder.encode(message);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}


const successLog =()=>{
      ElNotification({
            title: '登录成功',
            type: 'success',
      })
}

//自定义校验规则
const validateNoSpace = (rule, value, callback) => {
      if (/\s/.test(value)) {
            callback(new Error('不能包含空格'))
      }else {
            callback();
      }
};

//规则
const rules = {
      identity:[
        {require: true, message: '请选择客户端', trigger: 'blur'}
      ],
      userID:[
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {validator: validateNoSpace, trigger: 'blur'}
      ],
      password:[
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validateNoSpace, trigger: 'blur'}
      ]
}

const toEnglish =(identity)=>{
    switch (identity){
      case '学生': return 'student';
      case '教师': return 'teacher';
      case '管理员': return 'administrator';
    }
}

//登录表单
const userForm = reactive({
      userID: 'user01',
      password: '123456',
      Identity:'学生',
})

const checkAll = async (formRef) => {
    if (!formRef) return
        await formRef.validate((valid, fields) => {
            if (valid) {
                log()
            }
    })
}

const log = async () => {
          let login_res = await UserLogin({
              username: userForm.userID,
              password: await sha256(userForm.password)
          })
          console.log('返回的数据',login_res)
          if(login_res.code === 1){
              let chosen_identity = toEnglish(userForm.Identity)
              if(login_res.data.identity.includes(chosen_identity)){
                    console.log('pass!')
                    localStorage.setItem('token',login_res.data.token)
                    localStorage.setItem('username', login_res.data.username)
                    localStorage.setItem('userId', login_res.data.userID)
                    if(chosen_identity === 'student'){
                        localStorage.setItem('studentId',login_res.data.studentId)
                        await router.push('/stdmainpage/myClass')
                        successLog()
                    }
                    else if(chosen_identity === 'teacher'){
                        localStorage.setItem('teacherId',login_res.data.teacherId)
                        await router.push('/techmainpage')
                        successLog()
                    }
                    else{
                        localStorage.setItem('administratorId',login_res.data.administratorId)
                        await router.push('/adminPage')
                        successLog()
                    }
              }
              else {
                    ElNotification({
                        type:"error",
                        title:"没有访问所选客户端权限!"
                    })
              }
          }else{
            ElNotification({
              type:"error",
              title:"登录失败!"
            })
          }
}
</script>

<style scoped>

.container-wrapper {
  font-family: "Hiragino Sans GB";
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
}
.loginpartten{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1466ec;
  border-radius: 4px;
  border: 4px black;
}
.dialogBtn{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

</style>
