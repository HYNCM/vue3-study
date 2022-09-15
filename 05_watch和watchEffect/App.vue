<template>
  <h2>计算属性和监视</h2>
  <fieldset>
    <legend>姓名操作</legend>
    姓氏：<input type="text" placeholder="请输入姓氏" v-model="user.firstName" /><br>
    名字：<input type="text" placeholder="请输入名字" v-model="user.lastName" /><br>
  </fieldset>
  <fieldset>
    <legend>计算属性和监视的演示</legend>
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName1" /><br>
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName2" /><br>
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName3" /><br>

  </fieldset>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive, watchEffect } from 'vue';
export default defineComponent({
  name: 'App',
  setup() {
    const user = reactive({
      firstName: "独孤",
      lastName: "求败",
    })
    //通过计算属性的方式，实现第一个姓名的显示
    //vue3中的计算属性
    //如果计算属性中的函数只传入一个回调函数，表示的是get方法
    const fullName1 = computed(() => {
      return user.firstName + '_' + user.lastName;
    })
    // //返回ref对象
    // console.log(fullName1)
    const fullName2 = computed({
      get() {
        return user.firstName + '_' + user.lastName;
      },
      set(val: string) {
        const names = val.split('_');
        user.firstName = names[0];
        user.lastName = names[1];
      }
    })
    //监视-----监视指定的数据，当数据发生变化时，执行回调函数
    //watch(监视的数据，回调函数)
    const fullName3 = ref('')

    watch(user, ({ firstName, lastName }) => {
      fullName3.value = firstName + '_' + lastName;
    }, { immediate: true, deep: true })
    // immediate: true,表示立即执行回调函数
    // deep: true,表示深度监视，如果监视的数据是对象，那么会监视对象中的所有属性
    // watchEffect(() => {
    //   fullName3.value = user.firstName + '_' + user.lastName;
    // })
    //watchEffect() 监视的是响应式数据，当响应式数据发生变化时，会立即执行回调函数

    //监视fullName3的变化，当fullName3发生变化时，会执行回调函数
    watchEffect(() => {
      const names = fullName3.value.split('_');
      user.firstName = names[0];
      user.lastName = names[1];
    })
    //watch 可以监视多个数据
    //watch监视非响应式的数据，需要采用回调的写法
    watch([() => user.firstName, () => user.lastName, fullName3], () => {
      console.log('===')
    })
    return {
      user,
      fullName1,
      fullName2,
      fullName3,
    }
  },
})
</script>