<template>
  <div class="search-container">
    <el-input
        style="width: 300px; margin-left: 10px;margin-bottom: 5px;"
        size="large"
        placeholder="搜索课程"
        :prefix-icon="Search"
        v-model="SearchCourse_input"
    >
      <template #append>
        <el-button @click="SearchCourse" :icon="Search"/>
      </template>
    </el-input>
    <div class="button-pattern">
      <el-button type="primary" size="large" plain>加入班级</el-button>
      <el-button type="primary" size="large" plain>归档</el-button>
    </div>
  </div>
  <el-scrollbar class="scroll-container">
    <div class="container">
      <el-empty v-if="CourseInfo.length === 0" description="哎呀，这个，这个找不到哦大人！>_< ?" style="width: 100%;height: 100%"
      ></el-empty>
      <el-card v-else v-for="(course,key) in CourseInfo" class="item" :key="key" :style="{backgroundColor: getRandomColor()}"
               @click="gotoCourseDetail(course.courseId)">
          <div class="card-header">
            <el-text size="large" class="text-color">{{course.courseName}}</el-text>
            <el-dropdown>
              <el-icon color="white" size="large"><MoreFilled /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>归档</el-dropdown-item>
                  <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
            <div class="foot-pattern">
              <el-text size="large" class="text-color">任课老师</el-text>
              <el-button round v-show="!isCourseInMyClassList(course.courseId)">加入课程</el-button>
            </div>
      </el-card>
    </div>
  </el-scrollbar>

</template>

<script setup>
import { ElDivider } from 'element-plus'
import {onMounted,ref,onBeforeMount} from "vue";
import {getCourse} from "@/deprecated/services/student/studentCourseApi.js";
import {More, MoreFilled, Right, Search} from "@element-plus/icons-vue";
import {getCourseInfo, searchCourse_in_name} from "@/deprecated/services/course/courseApi.js";
import router from "@/router/index.js";

const studentInfo = []
let MyCourse_list = ref([])
const CourseInfo = ref([])
let SearchCourse_input = ref('')

let colorIndex = ref(0);

onMounted(async ()=>{
      studentInfo.push(localStorage.getItem('studentId'))
      let Course_res = await getCourse(studentInfo)
      MyCourse_list.value = Course_res.data[localStorage.getItem('studentId')]
      console.log("我的课程列表",MyCourse_list)
      if(MyCourse_list.value.length > 0){
          const CourseDetail_res = await getCourseInfo(MyCourse_list.value)
          console.log('返回的课程详细信息',CourseDetail_res)
          CourseInfo.value = CourseDetail_res.data
          console.log('课表详细数组',CourseInfo)
      }
})

const getRandomColor = () => {
    const colors = [
      '#66b1fd', '#74bc52', '#f39696', '#eab571',
    ];
    const color = colors[colorIndex.value];
    colorIndex.value = (colorIndex.value + 1) % colors.length;
    return color;
};

const gotoCourseDetail = (courseId) =>{
    console.log("点击的课程Id",courseId)
    router.push({name:'CourseDetail', params:{courseId}})
}

const isCourseInMyClassList = (courseId) => {
    return MyCourse_list.value.includes(courseId);
};

const SearchCourse = async ()=>{
    if(SearchCourse_input.value ===''){
        return
    }
    let search_res = await searchCourse_in_name(SearchCourse_input.value)
    console.log('搜索返回数据',search_res)
    CourseInfo.value = search_res.data
    console.log('搜索后的课程详细列表',CourseInfo)
}

</script>

<style scoped>
.scroll-container {
  max-height: 800px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  padding-left: 30px;
  padding-bottom: 120px;
}


.item {
  width: 400px;
  height: 150px;
  background-color:#F5F7FA;
  border-radius: 4px;
  margin: 10px;
  transition: box-shadow 0.3s, transform 0.3s;
  flex-direction: column;
  justify-content: space-between;
}
.item:hover{
  box-shadow: 0 4px 7px #94969c;
}
.foot-pattern{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 65px;
}
.search-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
}
.button-pattern{
  margin-right: 85px;
}
.text-color{
  color: white;
}
.card-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>