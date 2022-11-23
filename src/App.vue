<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo" />
      <Footer
        :todos="todos"
        :checkAll="checkAll"
        :clearAllCompletedTodos="clearAllCompletedTodos"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
//引入直接子级组件
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";
//引入接口
import { Todo } from "./types/todo";
import { saveTodos, readTodos } from "./utils/localStorageUtils";

export default defineComponent({
  name: "App",
  components: {
    Header,
    List,
    Footer,
  },
  //数组中的数据是对象，对象中的数据是键值对（id,title,isCompleted）
  setup() {
    //定义数据
    // const state = reactive<{ todos: Todo[] }>({
    //   todos: [
    //     { id: 1, title: "吃饭", isCompleted: false },
    //     { id: 2, title: "睡觉", isCompleted: false },
    //     { id: 3, title: "写代码", isCompleted: true },
    //   ],
    // });
    const state = reactive<{ todos: Todo[] }>({
      todos: [],
    });
    //界面加载时，从本地存储中读取数据
    onMounted(() => {
      state.todos = readTodos();
    });
    //添加数据的方法
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo);
    };
    //删除数据的方法
    const deleteTodo = (index: number) => {
      state.todos.splice(index, 1);
    };
    //修改todo的状态
    const updateTodo = (todo: Todo, isCompleted: boolean) => {
      todo.isCompleted = isCompleted;
      console.log(todo);
    };
    //全选的方法
    const checkAll = (isCompleted: boolean) => {
      state.todos.forEach((todo) => {
        todo.isCompleted = isCompleted;
      });
    };
    //清理选中的数据
    const clearAllCompletedTodos = () => {
      state.todos = state.todos.filter((todo) => !todo.isCompleted);
    };
    //监视：当todos中的数据发生变化，就会触发这个函数，将todos中的数据存储到浏览器的缓存中
    watch(() => state.todos, saveTodos, { deep: true });

    return {
      ...toRefs(state),
      addTodo,
      deleteTodo,
      updateTodo,
      checkAll,
      clearAllCompletedTodos,
    };
  },
});
</script>
<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
}
</style>
