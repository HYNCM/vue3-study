<template>
  <h2>AsyncAddress组件</h2>
  <h3>{{ data }}</h3>
</template>
<script lang="ts">
//引入axios
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  name: "AsyncAddress",
  setup() {
    return axios.get("/data/address.json").then((response) => {
      return {
        data: response.data,
      };
    });
  },
});
</script>
