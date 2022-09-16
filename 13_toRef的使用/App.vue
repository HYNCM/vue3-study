<template>
  <div>
    <h2>toRef的使用和特点</h2>
    <h3>state:{{ state }}</h3>
    <h3>age:{{ age }}</h3>
    <h3>money:{{ money }}</h3>
    <hr />
    <button @click="update">更新数据</button>

    <hr />
    <Child :age="age" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRef, ref } from "vue";
import Child from "./components/Child.vue";
export default defineComponent({
  name: "App",
  components: {
    Child,
  },
  setup() {
    const state = reactive({
      age: 5,
      money: 100,
    });
    //把响应式数据state对象中的某个属性age变成了ref对象
    const age = toRef(state, "age");
    //把响应式对象中的某个属性使用ref进行包装，变成一个ref对象
    const money = ref(state.money); //原理：拷贝对象，与原数据无关（不改变原数据）
    console.log(age);
    console.log(money);
    const update = () => {
      //更新数据
      // console.log('ceshi')
      state.age += 3;
      //age.value+=2
      // money.value += 10
    };
    return {
      state,
      age,
      money,
      update,
    };
  },
});
</script>
