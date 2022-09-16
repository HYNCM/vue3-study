<template>
  <div>
    <h2>provide和inject</h2>
    <p>当前的颜色:{{ color }}</p>
    <button @click="color = 'red'">红色</button>
    <button @click="color = 'green'">绿色</button>
    <button @click="color = 'blue'">蓝色</button>
    <hr />
    <Son />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, provide } from "vue";
import Son from "./components/Son.vue";
export default defineComponent({
  name: "App",
  components: {
    Son,
  },
  setup() {
    //响应式数据
    const color = ref("red");
    //提供数据
    provide("color", color);
    return {
      color,
    };
  },
});
</script>
