<template>
  <div>
    <h2>CustomRef的使用</h2>
    <input type="text" v-model="keyword" />
    <p>{{ keyword }}</p>
  </div>
</template>
<script lang="ts">
import { customRef, defineComponent, ref } from "vue";
//自定义hook防抖的函数
//value传入的数据,将来传入的数据类型不能确定,所以用泛型,delay间隔时间,默认200ms
function useDebouncedRef<T>(value: T, delay = 200) {
  let timeoutId: number;
  return customRef((track, trigger) => {
    return {
      //返回数据
      get() {
        //告诉Vue追踪数据
        track();
        return value;
      },
      //设置数据
      set(newValue: T) {
        //清理定时器
        clearTimeout(timeoutId);
        //开启定时器
        timeoutId = setTimeout(() => {
          value = newValue;
          //告诉Vue更新界面
          trigger();
        }, delay);
      },
    };
  });
}
export default defineComponent({
  name: "App",
  setup() {
    //const keyword = ref("abc");
    const keyword = useDebouncedRef("abs", 500);
    return {
      keyword,
    };
  },
});
</script>
