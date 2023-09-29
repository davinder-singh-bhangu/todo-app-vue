import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store=new Vuex.Store({
    state:{
        todoList:[]
    },
    mutations:{
        addTodoList(state,payload){
            state.todoList.push(payload)
        },
        removeTodoList(state,payload){
            state.todoList=state.todoList.filter(list=>list.id!==payload)
        },
        updateTodoList(state,payload){
            state.todoList=state.todoList.map(list=>list.id===payload.id?payload:list)
        }
    },
    actions:{
        addTodoListAC(context,payload){
            context.commit("addTodoList",payload);
        },
        removeTodoListAC(context,payload){
            context.commit("removeTodoList",payload);
        },
        updateTodoListAC(context,payload){
            context.commit("updateTodoList",payload);
        }
    },
    getters:{
        todoList:(state)=>state.todoList
    }
})
export default store;