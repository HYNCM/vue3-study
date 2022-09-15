<template>
  <h2>reactive和ref的细节问题</h2>
  <h3>m1:{{m1}}</h3>
  <h3>m2:{{m2}}</h3>
  <h3>m3:{{m3}}</h3>
  <hr>
  <button @click="update">更新数据</button>
</template>>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  name: 'App',

  setup() {
    const m1 = ref('abc')
    const m2 = reactive({
      name: "ming",
      girlfriend: {
        name: "hong"
      }
    })
    const m3 = ref({
      name: "ming",
      girlfriend: {
        name: "hong"
      }
    })

    const update = () => {
      //ref如果传入的是对象，那么是经过reactive处理的
      console.log(m3)
      m1.value += '==='
      m2.name += '==='
      m2.girlfriend.name += '==='
      m3.value.girlfriend.name += '==='
    }
    return {
      m1,
      m2,
      m3,
      update
    }
  }
})
</script>