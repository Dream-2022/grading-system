import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/views/home/index.vue";
import Login from "@/views/login/index.vue";
import Register from "@/views/register/index.vue";

//student 模块
import StudentHome from "@/views/student/home/index.vue"
import StudentPapers from "@/views/student/papers/index.vue"
import StudentAI from "@/views/student/ai/index.vue"
import StudentRelationship from "@/views/student/relationship/index.vue"
import StudentAnalysis from "@/views/student/analysis/index.vue"
import StudentHomePaperOn from "@/views/student/home/components/studentPaperOn.vue"
import StudentHomePaperOff from "@/views/student/home/components/studentPaperOff.vue"
import StudentPapersOn from "@/views/student/papers/components/studentPapersOn.vue"
import StudentPapersOff from "@/views/student/papers/components/studentPapersOff.vue"
import StudentPapersMistakes from "@/views/student/papers/components/studentPapersMistakes.vue"
import StudentAiGenerate from "@/views/student/ai/components/studentAiGenerate.vue"
import StudentAiHistory from "@/views/student/ai/components/studentAiHistory.vue"

//parents 模块
import ParentsHome from "@/views/parents/home/index.vue";
import ParentsChildrenPapers from "@/views/parents/childrenPapers/index.vue";
import ParentsRelationship from "@/views/parents/relationship/index.vue";
import ParentsStudyAnalysis from "@/views/parents/studyAnalysis/index.vue";
import ParentsHomeOn from "@/views/parents/home/components/parentsHomeOn.vue"
import ParentsHomeOff from "@/views/parents/home/components/parentsHomeOff.vue"
import ParentsChildrenPapersOn from '@/views/parents/childrenPapers/components/parentsChildrenPapersOn.vue';
import ParentsChildrenPapersOff from '@/views/parents/childrenPapers/components/parentsChildrenPapersOff.vue';


//teacher 模块
import TeacherHome from "@/views/teacher/home/index.vue"
import TeacherMarking from "@/views/teacher/marking/index.vue"
import TeacherExamAnalysis from "@/views/teacher/examAnalysis/index.vue"
import TeacherClassManagement from "@/views/teacher/classManagement/index.vue"
import TeacherHomeOn from "@/views/teacher/home/components/teacherHomeOn.vue"
import TeacherHomeOff from "@/views/teacher/home/components/teacherHomeOff.vue"
import TeacherMarkingAll from "@/views/teacher/marking/components/teacherMarkingAll.vue"
import TeacherMarkingOn from "@/views/teacher/marking/components/teacherMarkingOn.vue"
import TeacherMarkingOff from "@/views/teacher/marking/components/teacherMarkingOff.vue"
import TeacherMarkingDetails from "@/views/teacher/marking/components/teacherMarkingDetails.vue"


//schoolAdmin 模块
import SchoolAdminHome from "@/views/schoolAdmin/home/index.vue";
import SchoolAdminExamAnalysis from "@/views/schoolAdmin/examAnalysis/index.vue";
import SchoolAdminPaperManagement from "@/views/schoolAdmin/papersManagement/index.vue";
import SchoolAdminPeopleManagement from "@/views/schoolAdmin/peopleManagement/index.vue";
import SchoolAdminHomeOn from "@/views/schoolAdmin/home/components/schoolAdminHomeOn.vue"
import SchoolAdminHomeOff from "@/views/schoolAdmin/home/components/schoolAdminHomeOff.vue"
import SchoolAdminHomeWill from "@/views/schoolAdmin/home/components/schoolAdminHomeWill.vue"



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path:'student',
          children:[
            {
              path:'home',
              component:StudentHome,
              redirect:"/student/home/on",
              children:[
                {path:'on',component:StudentHomePaperOn},
                {path:'off',component:StudentHomePaperOff}
              ]
            },
            {
              path:'papers',
              component:StudentPapers,
              redirect:"/student/papers/on",
              children:[
                {path:'on',component:StudentPapersOn},
                {path:'off',component:StudentPapersOff},
                {path:'mistakes',component:StudentPapersMistakes}
              ]
            },
            {
              path:'ai',
              component:StudentAI,
              redirect:"/student/ai/generate",
              children:[
                {path:'generate',component:StudentAiGenerate},
                {path:'history',component:StudentAiHistory}
              ]
            },
            {path:'analysis',component:StudentAnalysis},
            {path:'relationship',component:StudentRelationship}
          ]
        },
        {
          path:'parents',
          children:[
            {
              path:'home',
              component:ParentsHome,
              redirect:'/parents/home/on',
              children:[
                {path:'on',component:ParentsHomeOn},
                {path:'off',component:ParentsHomeOff}
              ]
            },
            {
              path:'papers',
              component:ParentsChildrenPapers,
              redirect:'/parents/papers/on',
              children:[
                {path:'on',component:ParentsChildrenPapersOn},
                {path:'off',component:ParentsChildrenPapersOff}
              ]
            },
            {path:'analysis',component:ParentsStudyAnalysis},
            {path:'relationship',component:ParentsRelationship}
          ]
        },
        {
          path:'/teacher',
          children:[
            {
              path:'home',
              component:TeacherHome,
              redirect:'/teacher/home/on',
              children:[
                {path:'on',component:TeacherHomeOn},
                {path:'off',component:TeacherHomeOff}
              ]
            },
            {
              path:'marking',
              component:TeacherMarking,
              redirect:'/teacher/marking/all',
              children:[
                {path:'all',component:TeacherMarkingAll},
                {path:'on',component:TeacherMarkingOn},
                {path:'off',component:TeacherMarkingOff},
                {path:':id',component:TeacherMarkingDetails}
              ]
            },
            {path:'analysis',component:TeacherExamAnalysis},
            {path:'management',component:TeacherClassManagement}
          ]
        },
        {
          path:'/schoolAdmin',
          children:[
            {
              path:'home',
              component:SchoolAdminHome,
              redirect:'/schoolAdmin/home/on',
              children:[
                {path:'on',component:SchoolAdminHomeOn},
                {path:'off',component:SchoolAdminHomeOff},
                {path:'will',component:SchoolAdminHomeWill}
              ]
            },
            {path:'management',component:SchoolAdminPeopleManagement},
            {path:'analysis',component:SchoolAdminExamAnalysis},
            {path:'papers',component:SchoolAdminPaperManagement}
          ]
        },
        {
          path:'/admin'
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component: Login
    },
    {
      path:'/register',
      name:'register',
      component: Register
    }
  ]
})

export default router
