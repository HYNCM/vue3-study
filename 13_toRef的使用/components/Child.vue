<template>
  <div>
    <h2>Child子级组件</h2>
    <h3>age:{{ age }}</h3>
    <h3>length:{{ length }}</h3>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, toRef, computed } from "vue";
function useGetLength(age: Ref) {
  return computed(() => {
    return age.value.toString().length;
  });
}
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Child",
  props: {
    age: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const length = useGetLength(toRef(props, "age"));
    return {
      length,
    };
  },
});
</script>
