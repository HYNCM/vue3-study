<template>
  <h2>AsyncComponent子级组件</h2>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AsyncComponent",
  setup() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          msg: "明明就他比较温柔",
        });
      }, 2000);
    });
    //return {};
  },
});
</script>
