//shallowReactive与reactive 浅劫持和深劫持

//定义一个reactiveHandler处理对象
const reactiveHandler = {
  //获取属性值
  get(target, prop) {
    if (prop === "_is_reactive") return true;
    const result = Reflect.get(target, prop);
    console.log("拦截了读取数据", prop, result);
    return result;
  },
  //修改属性值或者添加属性
  set(target, prop, value) {
    const result = Reflect.set(target, prop, value);
    console.log("拦截了修改数据或者添加属性", prop, value);
    return result;
  },
  //删除某个属性
  deleteProperty(target, prop) {
    const result = Reflect.deleteProperty(target, prop);
    console.log("拦截了删除数据", prop);
    return result;
  },
};
//定义一个shallowReactive函数，传入一个目标对象
function shallowReactive(target) {
  //判断当前的目标对象是不是object类型（对象/数组）
  if (target && typeof target === "object") {
    return new Proxy(target, reactiveHandler);
  }
  //如果传入的数据是基本类型的数据，那么直接返回
  return target;
}

//定义一个reactive函数，传入一个目标对象
function reactive(target) {
  //判断当前的目标对象是不是object类型（对象/数组）
  if (target && typeof target === "object") {
    //对数组或者对象中所有的数据进行reactive的递归处理
    //先判断当前的数据是不是数组
    //再判断当前的数据是不是对象
    if (Array.isArray(target)) {
      target.forEach((item, index) => {
        target[index] = reactive(item);
      });
    } else {
      Object.keys(target).forEach((key) => {
        target[key] = reactive(target[key]);
      });
    }
    return new Proxy(target, reactiveHandler);
  }
  //如果传入的数据是基本类型的数据，那么直接返回
  return target;
}

//定义了一个readonlyHandler处理器
const readonlyHandler = {
  get(target, prop) {
    if (prop === "_is_readonly") return true;
    const result = Reflect.get(target, prop);
    console.log("拦截到了读取数据", prop, result);
  },
  set(target, prop, value) {
    console.warn("只能读取数据，不能修改数据或者添加数据");
    return true;
  },
  deleteProperty(target, prop) {
    console.log("只能读取数据，不能删除数据");
    return true;
  },
};
//定义一个shallowReadonly函数
function shallowReadonly(target) {
  //需要判断当前的数据是不是对象
  if (target && typeof target === "object") {
    return new Proxy(target, readonlyHandler);
  }
}
//定义一个readonly函数
function readonly(target) {
  if (target && typeof target === "object") {
    if (Array.isArray(target)) {
      //遍历数组
      target.forEach((item, index) => {
        target[index] = readonly(item);
      });
    } else {
      //判断target是不是对象
      //遍历对象
      Object.keys(target).forEach((key) => {
        target[key] = readonly(target[key]);
      });
    }
    return new Proxy(target, readonlyHandler);
  }
  //如果不是对象或数组，那么直接返回
  return target;
}

//定义一个shallowRef函数
function shallowRef(target) {
  return {
    //保存target数据保存起来
    _value: target,
    get value() {
      console.log("劫持到了读取数据");
      return this._value;
    },
    set value(val) {
      console.log("劫持到了修改数据，准备更新界面");
      this._value = val;
    },
  };
}
//定义一个ref对象
function ref(target) {
  target = reactive(target);
  return {
    _is_ref: true, //标示当前的对象是ref对象
    //保存target数据保存起来
    _value: target,
    get value() {
      console.log("劫持到了读取数据");
      return this._value;
    },
    set value(val) {
      console.log("劫持到了修改数据，准备更新界面");
      this._value = val;
    },
  };
}

//定义一个函数isRef，判断当前的对象是不是ref对象
function isRef(obj) {
  return obj && obj._is_ref;
}
//定义一个函数isReactive，判断当前的对象是不是reactive对象
function isReactive(obj) {
  return obj && obj._is_reactive;
}
//定义一个函数isProxy，判断当前的对象是不是reactiv对象或者readonly对象
function isProxy(obj) {
  return isReactive(obj) || isReadonly(obj);
}
//定义一个函数isReadonly,判断当前的对象是不是readonly对象
function isReadonly(obj) {
  return obj && obj._is_readonly;
}
