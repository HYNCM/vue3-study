<template>
  <div>
    <h2>readonly和shallowReadonly</h2>
    <h3>state:{{state2}}</h3>
    <hr>
    <button @click="update">更新数据</button>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, readonly, shallowReadonly } from 'vue';
export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      name: 'ming',
      age: 20,
      girlfriend: {
        name: 'HYN',
        age: 19
      }
    })
    //只读的数据----深度也只读
    //const state2=readonly(state)
    //只读的数据----浅只读
    const state2 = shallowReadonly(state)
    const update = () => {
      // console.log('测试')
      //state2.name+='==' //只读属性不允许修改
      // state2.girlfriend.name+='**' //只读数据不允许修改
      // state2.name+='=='
      state2.girlfriend.name += '**'

    }
    return {
      state2,
      update
    }
  }
});
</script>