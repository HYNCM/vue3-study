<template>
  <div>
    <h2>toRaw和markRaw</h2>
    <h3>state:{{state}}</h3>
    <hr>
    <button @click="testToRaw">测试toRaw</button>
    <button @click="testMarkRaw">测试markRaw</button>
  </div>
</template>
<script lang='ts'>
import { defineComponent, markRaw, reactive, toRaw } from 'vue';
interface UserInfo {
  name: string
  age: number
  hobbies?: string[]
}
export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive<UserInfo>({
      name: 'ming',
      age: 20
    })
    const testToRaw = () => {
      //把代理对象变成了普通对象，数据变化，界面不变化（非响应式数据）
      // console.log('ceshi')
      const user = toRaw(state)
      user.name += '=='
      console.log('**')
    }
    const testMarkRaw = () => {
      // console.log('测试')
      // state.hobbies = ['吃', '喝', '玩', '乐']
      // console.log(state)
      const hobbies = ['吃', '喝', '玩', '乐']
      //markRaw标记的对象数据，从此以后都不能再成为代理对象了
      state.hobbies = markRaw(hobbies)
      setInterval(() => {
        if (state.hobbies) {
          state.hobbies[0] += '=='
          console.log('这是定时器')
        }

      }, 1000)

    }
    return {
      state,
      testToRaw,
      testMarkRaw
    }
  }
});
</script>