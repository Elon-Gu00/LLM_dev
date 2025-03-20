<script setup>
import {onMounted, ref, watch, nextTick} from "vue";
import {useSearchResultStore} from "@/stores/index.js";
import {apiGetCourseTechId, apiGetCourseTechName, apiGetStudentCourse} from "@/apis/courseApis.js";
import {getLinkedCourseInfo} from "@/utils/index.js";
import CourseCard from "@/components/student/CourseCard.vue";

let store = useSearchResultStore()
let My_courseList = ref([])
let SearchCourseInfo = ref([])

watch(store, async (newStore) => {
    let searchResult = newStore.courseInfo
    let searchCourseList = []
    for (const i in searchResult) {
        searchCourseList.push(searchResult[i].courseId)
    }
    let transform_searchResult = searchResult.reduce((acc, course) => {
        acc[course.courseId] = {
            courseId: course.courseId,
            courseName: course.courseName,
            description: course.description,
            createAt: course.createAt,
            fileAt: course.fileAt,
            state: course.state,
            updateAt: course.updateAt
        };
        return acc;
    }, {})
    let Course_res = await apiGetStudentCourse(localStorage.getItem('studentId'))
    My_courseList.value = Course_res.data[localStorage.getItem('studentId')]
    let TeacherId = await apiGetCourseTechId(searchCourseList)
    let techId = []
    for (const key in TeacherId.data) {
        if (TeacherId.data.hasOwnProperty(key)) {
            techId = techId.concat(TeacherId.data[key]);
        }
    }
    let TeacherName = await apiGetCourseTechName(techId)
    SearchCourseInfo.value = getLinkedCourseInfo(transform_searchResult, TeacherName.data, TeacherId.data)
    console.log("搜索最终合并结果", SearchCourseInfo)
}, {immediate: true})

</script>

<template>
    <div class="container">
        <el-empty v-if="SearchCourseInfo.length === 0" description="没找到这个课程哦！>_< ?"
                  style="width: 100%;height: 100%"
        ></el-empty>
        <CourseCard v-for="(course,key) in SearchCourseInfo"
                    :key="key"
                    :my_course-list="My_courseList"
                    :course-id="course.courseId" :teacher="course.teacherName"
                    :course-name="course.courseName"/>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    padding-left: 30px;
    padding-bottom: 120px;
}
</style>