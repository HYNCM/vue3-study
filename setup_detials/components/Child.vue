
<template>
    <div>
        <h1>Child子级组件</h1>
        <h2>msg:{{msg}}</h2>
        <button @click="emitxxx">分发事件</button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Child",
    props: ['msg'],
    //setup细节问题
    //setup在beforeCreate生命周期之前执行
    //数据初始化的生命周期回调函数
    //setup在执行的时候，当前的组件还没有创建出来，也就意味着组件实例this根本就没有
    //setup中的属性和data函数中的属性都可以被HTML模板使用
    //setup中的对象属性，会被合并到组件实例上
    //在vue3中尽量不要混合使用data和setup


    //setup return an obj,used in template
    // beforeCreate() {
    //     console.log("Child组件的beforeCreate生命周期函数执行了");
    // },
    // //界面渲染完毕
    // mounted() {
    //     console.log("Child组件的mounted生命周期函数执行了");
    // },
    setup(props, context) {
        //props是一个对象，里面是父级组件向子级组件传递的数据，并且是在子级组件中使用的
        // console.log(props);
        // console.log(context.attrs);
        // console.log(context.emit);
        //context参数，是一个对象，里面有两个属性，attrs和emit
        //emit方法（分发是件的），attrs是一个对象，里面是父级组件向子级组件传递的数据，并且是在子级组件中使用的
        console.log(context.attrs.msg2);
        console.log('setup执行了', this);

        function emitxxx() {
            context.emit('xxx', '===xxx===');
        }
        const showmsg1 = () => {
            console.log("showmsg1执行了");
        }
        return {
            showmsg1,
            emitxxx,
            //setup中的数据不会被渲染
            //返回一个对象，可以在模板中直接使用
        }
    },
    // data() {
    //     return {
    //         count: 0,
    //     }
    // },
    // //界面渲染后的生命周期回调
    // mounted() {
    //     console.log(this);
    // },
    // methods: {
    //     showmsg() {
    //         console.log('methods中的showmsg执行了');
    //     }
    // }
})
</script>

