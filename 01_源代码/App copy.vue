<template>
  <h2>reactive的使用</h2>
  <h3>名字：{{user.name}}</h3>
  <h3>年龄：{{user.age}}</h3>
  <h3>性别：{{user.gender}}</h3>
  <h3>女朋友：{{user.girlfriend}}</h3>
  <hr>
  <button @click="updateUser">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "App",
  //需求：显示用户的相关信息，点击数据，可以更新用户的相关信息数据
  setup() {
    //const obj: any = { //为了在使用 obj.gender='man'的时候不出现报错
    const obj = {
      name: 'Ming',
      age: 23,
      girlfriend: {
        name: "huyinong",
        age: 21,
        hobbies: ["reading", "writing", "swimming"]
      }
    }
    //把数据变成响应式数据
    //返回的是一个Proxy的代理对象，被代理者就是reactive中传入的对象
    //user是代理对象，obj是目标对象
    //user的类型是Proxy
    const user = reactive<any>(obj)
    //查看user的属性
    console.log(user)
    const updateUser = () => {
      //直接使用目标对象的方式来更新目标对象中的成员的值，是不可以的，只能使用代理对象的方式来更新数据（响应式数据）
      // user.name += "=="
      // user.age += 2
      // user.girlfriend.name += '++'
      // //user对象或者obj对象添加一个新的对象，哪一种方式会影响界面的更新
      //obj.gender = "man"//这种方式没有更新渲染
      //user.gender = "man"//这种方式，界面可以更新渲染，而且这个数据最终也添加到了obj对象
      //user对象挥着obj对象中移除一个已经存在的属性，哪一种方式会影响界面的更新
      //delete user.age;

      //如果操作代理对象，目标对象中的数据也会随之变化，同时如果想要在操作数据的时候，界面也要跟着重新渲染，那么也是操作代理对象。
      //通过当前的代理对象，找到该对象中的目标对象，然后在目标对象中操作数据，界面也会跟着重新渲染
      //user.girlfriend.hobbies[1] = "coding"
      //通过当前的代理对象，给目标对象中的某个数组属性增加数据
      user.girlfriend.hobbies.push("coding")

    }
    return {
      user,
      updateUser
    }
  }
});
</script>
