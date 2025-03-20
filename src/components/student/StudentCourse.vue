<script setup>
import {onMounted, ref} from "vue";
import {apiGetCourseInfo, apiGetCourseTechId, apiGetCourseTechName, apiGetStudentCourse} from "@/apis/courseApis.js";
import {getLinkedCourseInfo} from "@/utils/index.js";
import CourseCard from "@/components/student/CourseCard.vue";

let MyCourse_list = ref([])
let CourseInfo = ref([])
let techId = []

onMounted(async () => {
    //获取课程信息
    let Course_res = await apiGetStudentCourse(localStorage.getItem('studentId'))
    MyCourse_list.value = Course_res.data[localStorage.getItem('studentId')]
    if (MyCourse_list.value.length > 0) {
        const CourseDetail_res = await apiGetCourseInfo(MyCourse_list.value)
        const TeacherId = await apiGetCourseTechId(MyCourse_list.value)
        for (const key in TeacherId.data) {
            if (TeacherId.data.hasOwnProperty(key)) {
                techId = techId.concat(TeacherId.data[key]);
            }
        }
        const TeacherName = await apiGetCourseTechName(techId)
        CourseInfo.value = getLinkedCourseInfo(CourseDetail_res.data, TeacherName.data, TeacherId.data)
    }
})
</script>

<template>
    <div class="container">
        <el-empty v-if="CourseInfo.length === 0" description="你还没加入任何课程！" style="width: 100%;height: 100%"
        ></el-empty>
        <CourseCard v-for="(course,key) in CourseInfo" :key="key"
                    :my_course-list="MyCourse_list"
                    :course-id="course.courseId"
                    :teacher="course.teacherName"
                    :course-name="course.courseName"/>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    padding-left: 50px;
    padding-bottom: 100px;
}
</style>