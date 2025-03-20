export async function toSHA256(str) {
    return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)))).map(byte => byte.toString(16).padStart(2, '0')).join('')
}

export function identityToChinese(str) {
    if (str === "student") return "学生"
    if (str === "teacher") return "教师"
    if (str === "administrator") return "管理员"
    return null
}

export function numberToLetter(number, upper = true) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    if (upper) {
        return letters[number % 26]
    }
    else {
        return letters[number % 26].toLowerCase()
    }
}

export function questionTypeToChinese(type) {
    if (type === 'choice') return "选择题"
    if (type === 'fill-blank') return "填空题"
    if (type === 'essay') return "问答题"
    if (type === 'programming') return "编程题"
    return null
}

export function statusToChinese(status) {
    if (status === 'not-started') return "未开始"
    if (status === 'active') return "开课中"
    if (status === 'filed') return "已归档"
    return null
}

export function dateToSemester(date) {
    const ymd = date.split('T')[0].trim().split('-')
    return (ymd[0] + '年') + (ymd[1] >= '07' ? '秋' : '春')
}

export function getLinkedCourseInfo(CourseDetail,TeacherName,TeacherId){
    //CourseDetail为通过studentId或TeacherId返回的课程详细
    //TeacherName为通过teacherId返回的老师名字
    //TeacherId为通过课程Id获取的老师Id
    const result = []
    const teacherMap = {};
    TeacherName.forEach(teacher => {
        teacherMap[teacher.teacherId] = teacher.nickname;
    });
    for (const courseId in CourseDetail) {
        if (CourseDetail.hasOwnProperty(courseId)) {
            const course = CourseDetail[courseId];
            const teacherIds = TeacherId[courseId] || [];
            const teacherNames = teacherIds.map(teacherId => teacherMap[teacherId]);
            teacherNames.forEach(teacherName => {
                const courseEntry = {
                    teacherName,
                    courseId: course.courseId,
                    courseName: course.courseName,
                    description: course.description,
                    createAt: course.createAt,
                    fileAt: course.fileAt,
                    state: course.state,
                    updateAt: course.updateAt
                };
                result.push(courseEntry);
            });
        }
    }
    return result
}