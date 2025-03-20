<script setup>
import {ArrowLeft} from "@element-plus/icons-vue";
import {useRoute, useRouter} from "vue-router";
import {ref, onMounted, nextTick} from "vue";
import {
    apiGetCourseClass,
    apiGetCourseInfo,
    apiGetCourseTechId,
    apiGetCourseTechName,
    apiGetStudentCourse
} from "@/apis/courseApis.js";

const courseId = ref('')
const router = useRouter()
const route = useRoute()
let MyCourse_list = ref([])


//课程信息
const courseDetail = ref({
    courseName: '',
    teacherName: '',
    className: '',
    description: '',
    state: '',
    createAt: '',
})

courseId.value = route.params.courseId

onMounted(async () => {
    console.log('路由传过来的数据', courseId.value)
    let Course_res = await apiGetStudentCourse(localStorage.getItem('studentId'))
    MyCourse_list.value = Course_res.data[localStorage.getItem('studentId')]
    let courseDetail_res = await apiGetCourseInfo(courseId.value)
    let TeacherId = await apiGetCourseTechId(courseId.value)
    let techId = []
    // let courseClass_res = await apiGetCourseClass(courseId.value)
    for (const key in TeacherId.data) {
        if (TeacherId.data.hasOwnProperty(key)) {
            techId = techId.concat(TeacherId.data[key]);
        }
    }
    const TeacherName = await apiGetCourseTechName(techId)
    const courseData = Object.values(courseDetail_res.data)[0];
    // const classData = Object.values(courseClass_res.data)[0]

    // console.log("课程班级信息",classData)
    courseDetail.value = {
        courseName: courseData.courseName,
        teacherName: TeacherName.data[0].nickname,
        // className: classData[0].className,
        description: courseData.description,
        state: courseData.state,
        createAt: courseData.createAt.split('T')[0],
    }
})

const isCourseInMyClassList = (courseId) => {
    return MyCourse_list.value.includes(courseId);
};

const onBack = () => {
    router.back()
}

</script>

<template>
    <el-page-header :icon="ArrowLeft" @back="onBack" title="返回" style="padding: 20px">
        <template #content>
            <span> 课程详细 </span>
        </template>
    </el-page-header>
    <div class="body">
        <div class="CourseBaseInfo">
            <el-card class="imagePart">
                <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    style="width: 100%;"
                />
            </el-card>
            <el-card class="InfoPart">
                <div class="CourseInfo">
                    <h1>{{ courseDetail.courseName }}</h1>
                </div>
                <div class="CourseInfo">
                    <h2>任课老师:</h2>
                    <h2>&nbsp{{ courseDetail.teacherName }}&nbsp</h2>
                </div>
                <!--                <div class="CourseInfo">-->
                <!--                  <h2>班级:</h2>-->
                <!--                  <h2>&nbsp{{courseDetail.className}}&nbsp</h2>-->
                <!--                </div>-->
                <div class="CourseInfo">
                    <h2>开始时间:</h2>
                    <h2>&nbsp{{ courseDetail.createAt }}&nbsp</h2>
                </div>
                <div class="CourseInfo">
                    <h2>课程状态:</h2>
                    <el-tag v-if="courseDetail.state === 'active' " type="success" class="tagPattern">已开始</el-tag>
                    <el-tag v-else type="danger" class="tagPattern">未开课</el-tag>
                </div>
                <template #footer>
                    <div class="btnPart">
                        <el-button v-if="!isCourseInMyClassList(courseId)" type="primary" round class="btnPart">
                            加入课程
                        </el-button>
                        <el-button v-else type="info" round class="btnPattern" disabled>你已加入该课程</el-button>
                    </div>
                </template>
            </el-card>
        </div>
        <div class="descriptionPart">
            <el-card class="bottomCard">
                <template #header>
                    <h1>课程描述</h1>
                </template>
                <h2>
                    {{ courseDetail.description }}
                </h2>
            </el-card>
        </div>
    </div>
</template>

<style scoped>
.body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.CourseBaseInfo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 95%;
    padding: 0 10px 10px;
}

.imagePart {
    width: 30%;
    margin: 5px;
    height: 437px;
}

.InfoPart {
    width: 70%;
    margin: 5px;
    height: 437px;
}

.btnPart {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
}

.descriptionPart {
    width: 95%;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
}

.bottomCard {
    margin: 0 5px 5px;
}

.CourseInfo {
    display: flex;
    flex-direction: row;
    margin: 15px;
}

.tagPattern {
    width: 80px;
    height: 30px;
    margin: 8px
}

.btnPattern {
    width: 80%;
    height: 50px;
    margin-top: 13px;
}
</style>