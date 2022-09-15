<template>
  <h2>toRefs的使用</h2>
  <!-- <ul>
    <li>name:{{state.name}}</li>
    <li>age:{{state.age}}</li>
    <li>address:{{state.address}}</li>
  </ul> -->
  <ul>
    <li>name:{{name}}</li>
    <li>age:{{age}}</li>
    <li>address:{{address}}</li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      name: '张三',
      age: 18,
      address: '北京市'
    })
    //toRefs可以把reactive对象转换成普通对象
    //const state2 = toRefs(state)
    const { name, age, address } = toRefs(state)
    //console.log(state2)
    //定时器，更新数据，如果数据变化，界面随之变化（响应式数据）
    setInterval(() => {
      //state.name += '=='
      //state2.name.value += "=="
      name.value += "=="
    }, 1000)


    return {
      //state
      //...state//...不是响应式的数据---->{name: '张三', age: 18, address: '北京市'}
      //...state2
      name,
      age,
      address
    }
  },
})
</script>