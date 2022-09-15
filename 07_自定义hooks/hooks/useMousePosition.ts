import { onBeforeUnmount, onMounted, ref } from "vue";
export default function useMousePosition() {
  const x = ref(0);
  const y = ref(0);
  const clickHandler = (event: MouseEvent) => {
    x.value = event.pageX;
    y.value = event.pageY;
  };
  //页面加载完毕，再进行点击操作
  //页面加载完毕的生命周期
  onMounted(() => {
    window.addEventListener("click", clickHandler);
  });
  //页面卸载的生命周期
  onBeforeUnmount(() => {
    window.removeEventListener("click", clickHandler);
  });
  return {
    x,
    y,
  };
}
