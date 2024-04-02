import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTeacherPaperStore = defineStore('teacherPaperStore', () => {

    const teacherPaperList=ref({
        list:[],
        index:[]
    })

    const getTeacherPaperList=()=>{
        return teacherPaperList.value
    }

    const setTeacherPaperList=(index,list)=>{
        teacherPaperList.value.list=list;
        teacherPaperList.value.index=index
    }

    const changeIndex=(index)=>{
        if(index<0||index>=teacherPaperList.value.list.length) return 
        teacherPaperList.value.index=index
    }

    return {
        getTeacherPaperList,
        setTeacherPaperList,
        changeIndex
    }

},{
    persist:{
        enabled:true,
        storage:sessionStorage
    }
})