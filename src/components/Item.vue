<!-- eslint-disable vue/no-mutating-props -->
<template>
  <li
    @mouseenter="mouseHandler(true)"
    @mouseleave="mouseHandler(false)"
    :style="{ backgroundColor: bgColor, color: myColor }"
  >
    <label>
      <input type="checkbox" v-model="isComplete" />
      <span>{{ todo!.title }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delTodo">
      删除
    </button>
  </li>
</template>
<script lang="ts">
import { computed } from "@vue/reactivity";
import { defineComponent, ref } from "vue";
import { Todo } from "../types/todo";
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Item",
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    },
    deleteTodo: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updateTodo: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const bgColor = ref("white");
    const myColor = ref("black");
    const isShow = ref(false);
    const mouseHandler = (flag: boolean) => {
      if (flag) {
        // ...
        bgColor.value = "pink";
        myColor.value = "green";
        isShow.value = true;
      } else {
        // ...
        bgColor.value = "white";
        myColor.value = "black";
        isShow.value = false;
      }
    };
    //删除数据的方法
    const delTodo = () => {
      if (window.confirm("是否删除？")) {
        props.deleteTodo(props.index);
      }
    };
    //计算属性的方式，让当前的复选框选中/不选中
    const isComplete = computed({
      get() {
        return props.todo.isCompleted;
      },
      set(val) {
        props.updateTodo(props.todo, val);
      },
    });
    return {
      mouseHandler,
      bgColor,
      myColor,
      isShow,
      delTodo,
      isComplete,
    };
  },
});
</script>
<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}
li label {
  float: left;
  cursor: pointer;
}
li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}
li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}
li:before {
  content: "";
}
li:last-child {
  border-bottom: none;
}
</style>
