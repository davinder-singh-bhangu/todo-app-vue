<template>
  <div>
    <div
      :class="`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.completed ? 'bg-[#c6e9a7]' : 'bg-[#ccbed7]'}`"
    >
      <input
        type="checkbox"
        class="cursor-pointer"
        :checked="todo.completed"
        @change="toggleCompleted(todo)"
      />
      <input
        type="text"
        :class="!isTodoEditable?`w-full bg-transparent rounded-lg px-2 ${todo.completed ? 'line-through ' : ''}`:
        `border outline-none w-full bg-transparent rounded-lg border-black/10 px-2 ${todo.completed ? 'line-through' : ''}`"
        @change="(e)=>setTodoMsg(e,todo)"
        :value=todo.todoMsg
        :readonly="!isTodoEditable || todo.completed"
      />
      <button
        class="inline-flex bg-blue rounded-lg px-3 py-1 bg-blue-600 text-white shrink-0 disabled:opacity-50"
        @click="toggleEdit()"
        :disabled="todo.completed"
      >
        {{isTodoEditable ? "Update" : "Edit"}}
      </button>
      <button
        class="inline-flex rounded-lg bg-red-500 px-3 py-1 text-white  hover:bg-red-400 shrink-0"
        @click="toggleDialog(todo.id)"
      >
        Delete
      </button>
    </div>
 <div class="relative z-10" v-show="isOpenDialog" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Delete Todo</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Are you to delete Todo?</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" @click="deleteToDo()" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Yes</button>
          <button type="button" @click="toggleDialog(null)" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">No</button>
        </div>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<style>
</style>
<script>
import store from '../store/index';
export default {
  name: "ToDoListView",
  props:["todo"],
  data: () => {
    return {
      isTodoEditable: false,
      isOpenDialog:false,
      delableId:null
    };
  },
  methods: {
    toggleEdit() {
      this.isTodoEditable=!this.isTodoEditable;
    },
    toggleDialog(id) {
      this.delableId=id;
      this.isOpenDialog=!this.isOpenDialog;
    },
    deleteToDo() {
      store.dispatch('removeTodoListAC',this.delableId);
      this.$nextTick(()=>{
        this.delableId=null;
      })
    },
    setTodoMsg(e,todos){
      let newValu=e.target.value;
      let todo={...todos,...{todoMsg:newValu}};
      store.dispatch('updateTodoListAC',todo)
    },
    toggleCompleted(todo){
     let todos={...todo,...{completed:!todo.completed}};
      store.dispatch('updateTodoListAC',todos)
    }
  },
  
};
</script>