import {defineStore} from "pinia";
import {ref} from "vue";

export const useSearchResultStore = defineStore('searchResult', () => {
    const courseInfo = ref([])
    function setCourseInfo(data) {
        courseInfo.value = data
    }
    return {courseInfo, setCourseInfo}
})