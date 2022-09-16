<template>
  <div>
    <h2>shallowReactive和shallowRef</h2>
    <h3>m1:{{m1}}</h3>
    <h3>m2:{{m2}}</h3>
    <h3>m3:{{m3}}</h3>
    <h3>m4:{{m4}}</h3>
    <hr>
    <button @click="update">更新数据</button>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, ref, shallowReactive, shallowRef } from 'vue';
export default defineComponent({
  name: 'App',
  setup() {
    //reactive对数据进行深度监视（深度劫持）----深度响应式
    const m1 = reactive({
      name: 'ming',
      age: 20,
      girlfriend: {
        name: 'HYN',
        age: 19
      }
    })
    //shallowReactive对数据进行浅劫持（浅监视）----浅响应式
    const m2 = shallowReactive({
      name: 'ming',
      age: 20,
      girlfriend: {
        name: 'HYN',
        age: 19
      }
    })
    const m3 = ref({
      name: 'ming',
      age: 20,
      girlfriend: {
        name: 'HYN',
        age: 19
      }
    })/// <reference path="" /
    const m4 = shallowRef({
      name: 'ming',
      age: 20,
      girlfriend: {
        name: 'HYN',
        age: 19
      }
    })
    const update = () => {
      //更改m1的数据----reactive
      // m1.name += '=='
      // m1.girlfriend.name += '**'
      //更改m2的数据----shallowReactive
      // m2.name += '=='
      // m2.girlfriend.name += '**'
      //更改m3的数据----ref
      // m3.value.name += '=='
      // m3.value.girlfriend.name += '**'
      //更改m4的数据----shallowReactive
      // m4.value.name += '=='
      //m4.value.girlfriend.name += '**'
      console.log(m3)
      console.log(m4)
    }
    return {
      m1,
      m2,
      m3,
      m4,
      update
    }
  }
});
</script>