<template>
  <div class="bigBox wow fadeInUp">
    <div class="top">
      <div class="content">
        <el-dropdown @command="handleCommand">
          <span class="name el-dropdown-link">
            {{ titleText }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
        
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in navList" :key="item" :command="item.title" @click="toMarking(item.id)">{{ item.title }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <div>
        </div>
      </div>
    </div>
    <div class="center">
      <el-select class="m-2" placeholder="班级" size="large" style="width: 240px;" ></el-select>
      <el-select class="m-2" placeholder="批改状态" size="large" style="width: 240px;margin-left:30px;" ></el-select>
    </div>
    <div class="bottom">
      <table>
        <thead>
          <tr class="fontWeight">
            <td>学号</td>
            <td>姓名</td>
            <td>分数</td>
            <td class="width1">评语</td>
            <td>批阅状态</td>
            <td class="width1">操作</td>
          </tr>
        </thead>
        <tbody v-if="studentList.length!==0">
          <div v-for="(item,index) in studentList" :key="item.id">
            <tr v-if="item.state==='2'">
              <td>{{ item.studentNumber }}</td>
              <td>{{ item.name }}</td>
              <td class="score">{{ item.score }}</td>
              <td class="width1" :title="item.comment">{{ item.comment }}</td>
              <td style="color:#f56c6c">已批阅</td>
              <td class="width1">
                <!-- <span style="opacity: 0;">批阅</span> -->
                <span @click="toPaper(item.id,index)">查看</span>
              </td>
            </tr>

            <tr v-else>
              <td>{{ item.studentNumber }}</td>
              <td>{{ item.name }}</td>
              <td>---</td>
              <td  class="width1">暂无</td>
              <td style="color:#67c23a">正在批阅</td>
              <td  class="width1" :title="item.comment">
                <span @click="toPaper(item.id,index)">批阅</span>
                <span>查看</span>
              </td>
            </tr>
          </div>
        </tbody>
        <el-empty v-else description="description" />
      </table>
    </div>
  </div>

</template>

<script setup>
import { ArrowLeft,ArrowRight } from '@element-plus/icons-vue';
import { nextTick, ref } from 'vue'
import { useRoute,useRouter } from "vue-router"
import { getALLStudentPaperAPI } from '@/apis/examPaper.js'
import axios from 'axios'
import { ElMessage } from 'element-plus';
import { useTeacherPaperStore } from '@/stores/teacherPaperStore';
import { useExamStore } from '@/stores/examStore.js'

const router=useRouter();
const route = useRoute();
const examStore=useExamStore()
const teacherPaperStore=useTeacherPaperStore()
const titleText=ref('')

const navList=ref([])
const studentList=ref([])

const getExamById=async()=>{
  
  console.log(route.params.id)
  let id=route.params.id;
  const res=await getALLStudentPaperAPI(id)
  
  if(res.data.code===200)
  {
    studentList.value=res.data.data
  }
  else {
    ElMessage.error('网络错误')
  }
  
}

const toMarking=(id)=>{

  router.push('/teacher/marking/'+id)

  nextTick(()=>{
    setNav()
    getExamById()
  })
  
}

const setNav=()=>{
  // navList.value=teacherPaperStore.getTeacherPaperList().list
  // let id=route.params.id

  // const paper = teacherPaperStore.getTeacherPaperList().list.find(item => item.id == id);
  // titleText.value = paper ? paper.title : '';

}


onMounted(()=>{
  setNav()
  getExamById()
})

const toPaper=(id,index)=>{

  examStore.setExamData(studentList.value[index])
  teacherPaperStore.setTeacherPaperList(index,studentList.value)

  
  router.push('/paper/'+id)
}

</script>

<style lang="scss" scoped>
.bigBox{
  margin-top:20px;
  height: 100%;

  .top{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size:19px;
    color:#3a63f3;

    .content{
      display: flex;
      min-width: 420px;
      justify-content: space-between;
      align-items: center;
      // background-color: #ce6509;
    }

    .name{
      text-decoration: underline;
      font-size: 20px;
      color:#3a63f3
    }

    .subject{
      margin-left:30px;
      font-weight: bold;
    }
  }

  .center{
    display: flex;
    margin-top:20px;
    justify-content: left;
  }

  .bottom{
    
    min-height: 200px;
    // background-color: pink;
    margin-top:10px;
    
    table{
      // background-color: #3a63f3;
      width: 100%;
      font-size: 16px;

      .fontWeight{
        font-weight: 600;
      }

      tr{
        display: flex;
        width: 100%;
        height: 60px;
        max-width: 85vw;
        line-height: 60px;
        border-bottom:1px solid rgba(#c4c4c4,0.4);

        td{
          flex:1;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow:ellipsis;
        }

        .score{
          color:#f56c6c;
          font-size: 18px;
        }

        .width1{
          flex: 1.5;
        }

        td:nth-child(6){
          display: flex;
          justify-content: space-evenly;
          cursor: pointer;

          span:nth-child(1){
            color:#3a63f3;
          }
        }
      }

      
    }
    
  }
}

.demo-image__error .image-slot {
  font-size: 30px;
}
 
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
 
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}

</style>