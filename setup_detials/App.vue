<template>
  <h2>App父级组件</h2>
  <h3>msg:{{msg}}</h3>
  <button @click="msg += '==='">更新数据</button>
  <hr>
  <Child :msg='msg' msg2="nice" @xxx="xxx" />
</template> 
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Child from "./components/Child.vue"
export default defineComponent({
  name: "APP",
  //注册组件
  components: {
    Child,
  },
  setup() {
    //定义一个ref类型的数据
    const msg = ref("Hello Vue3");
    function xxx(txt: string) {
      msg.value += txt;
    }
    return {
      msg,
      xxx,
    }
  },
})
</script>