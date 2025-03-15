<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <span style="color: #303133">基于大模型的客观化评价系统 （教师端） </span>
        <div class="usermsg">
          <el-dropdown>
            <span class="el-dropdown-link">
                <span>{{teacher_user.username}}</span>
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click="exit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <el-col :span="25">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
            >
              <el-menu-item index="1" @click="toMyClass">
                <el-icon><DataLine/></el-icon><span>我的课程</span>
              </el-menu-item>
              <el-menu-item>
                <el-icon><setting /></el-icon>
                <span>待添加</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, ArrowDown, DataLine, Reading,
} from '@element-plus/icons-vue'
import {autocompleteEmits} from "element-plus";
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";


onMounted(()=>{
  teacher_user.username = localStorage.getItem('username')
  teacher_user.userId = localStorage.getItem('useId')
  teacher_user.teacherId = localStorage.getItem('teacherId')
})

const router = useRouter();

const toMyClass =()=>{
  router.push('/techmainpage/myTeachClass')
}

const teacher_user = reactive({
  username:'',
  userId:'',
  teacherId:''
})

const exit = ()=>{
  localStorage.clear()
  router.push('/login')
}

</script>

<style scoped>
.common-layout{
  font-family: "Hiragino Sans GB";
}
.el-header{
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1.5px solid #409EFF;
}
.el-aside{
  background-color: white;
  height: 100vh;
}
.el-main{
  background-color: #FAFCFF;
}
.no-underline{
  text-decoration: none;
}
.usermsg{
  display: flex;
  justify-content: center;
  align-items: center;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
