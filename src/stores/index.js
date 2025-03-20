import {defineStore} from "pinia";
import {ref} from "vue";

export const useSearchResultStore = defineStore('searchResult', () => {
    const courseInfo = ref([])
    function setCourseInfo(data) {
        courseInfo.value = data
    }
    return {courseInfo, setCourseInfo}
})

export const useQuestionRefreshStore = defineStore('questionRefresh', () => {
    const status = ref(true)
    function changeStatus() {
        status.value = !status.value
    }
    return {status, changeStatus}
})

export const useAssignmentRefreshStore = defineStore('assignmentRefresh', () => {
    const status = ref(true)
    function changeStatus() {
        status.value = !status.value
    }
    return {status, changeStatus}
})