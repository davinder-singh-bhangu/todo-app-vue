<script>
import Vue from 'vue';
import store from '../store/index';
import ToDoListView from './ToDoListView.vue';
export default Vue.extend({
  name:'HomeView',
  components:{
    ToDoListView
  },
  data:()=>{
    return {
      todo:""
    }
  },
  methods:{
    addToDo(e){
      e.preventDefault();
      let todo={id:new Date().getTime(),todoMsg:this.todo,completed:false}
      store.dispatch('addTodoListAC',todo);
      this.$nextTick(()=>{
        this.todo="";
      })
    }
  },
  computed:{
    todoList:()=> store.getters.todoList,
    count:()=>store.getters.todoList.length
  }
})

</script>

<template>
 <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Todo App</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    
     <div class="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 pt-5">
    <form class="flex" @submit="addToDo">
          <input
              type="text"
              v-model="todo"
              placeholder="Write Todo..."
              class="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 py-1.5"
          />
          <button type="submit" class="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
              Add
          </button>
      </form>
     </div>
     <div class="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 pt-5">
      <div class="flex">
        <p class="w-full rounded-l-lg px-3 outline-none duration-150 py-1.5">Todo Count: {{count}}</p>
        <button type="submit" class="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
          View All
        </button>
      </div>
     </div>
     <div v-for="todo in todoList"
      :key="todo.id">
      <to-do-list-view :todo="todo"/>
      </div>
  </div>
</div>
</template>
