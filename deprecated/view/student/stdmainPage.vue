<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <span style="color: #303133">基于大模型的客观化评价系统 （学生端） </span>
        <div class="usermsg">
          <el-dropdown>
            <span class="el-dropdown-link">
                <span>{{student_user.username}}</span>
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
<!--                <el-menu-item-group title="Group One">-->
<!--                  <el-menu-item index="1-1">item one</el-menu-item>-->
<!--                  <el-menu-item index="1-2">item two</el-menu-item>-->
<!--                </el-menu-item-group>-->
<!--                <el-menu-item-group title="Group Two">-->
<!--                  <el-menu-item index="1-3">item three</el-menu-item>-->
<!--                </el-menu-item-group>-->
<!--                <el-sub-menu index="1-4">-->
<!--                  <template #title>item four</template>-->
<!--                  <el-menu-item index="1-4-1">item one</el-menu-item>-->
<!--                </el-sub-menu>-->
              <el-menu-item index="1" @click="toMyClass">
                <el-icon><DataLine/></el-icon><span>我的课程</span>
              </el-menu-item>
              <el-menu-item index="2" @click="toMyHomework">
                <el-icon><Reading /></el-icon><span>作业</span>
              </el-menu-item>
<!--              <el-menu-item index="3" disabled>-->
<!--                <el-icon><document /></el-icon>-->
<!--                <span>Navigator Three</span>-->
<!--              </el-menu-item>-->
              <el-menu-item index="4">
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
    student_user.username = localStorage.getItem('username')
    student_user.userId = localStorage.getItem('useId')
    student_user.studentId = localStorage.getItem('studentId')
})

const router = useRouter();

const toMyClass =()=>{
  router.push('/stdmainpage/myClass')
}
const toMyHomework=()=>{
  router.push('/stdmainpage/myHomework')
}

const student_user = reactive({
    username:'',
    userId:'',
    studentId:''
})

const exit =  ()=>{
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
