<template>
  <h3>Son子级组件</h3>
  <hr />
  <GrandSon />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import GrandSon from "./GrandSon.vue";
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Son",
  components: {
    GrandSon,
  },
  setup() {
    return {};
  },
});
</script>
