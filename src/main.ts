//程序的主入口文件，ts文件，是main.ts
import { createApp } from "vue";
//引入createApp函数，创建对应的应用，产生应用的实例对象
import App from "./App.vue";
//创建App应用，返回对应的实例对象，调用mount方法进行挂载
createApp(App).mount("#app");
