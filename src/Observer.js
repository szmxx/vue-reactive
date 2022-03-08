/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2022-03-02 22:03:49
 * @LastEditTime: 2022-03-03 12:05:53
 */

import { arrayMethods } from "./utils/array";
import { isPlainObject } from "./utils/traverse";
// 获取那 7 个方法
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);
import Dep from "./Dep";

// 浏览器是否存在原型
const isProto = "__proto__" in {};
// 定义不可枚举属性
export function def(obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    configurable: true,
    writable: true,
    enumerable: !!enumerable,
    value: value,
  });
}
// 原型方式处理
function protoMethod(value, arrayMethods) {
  value.__proto__ = arrayMethods;
}
// 赋值方式处理
function copyMethod(value, arrayMethods, arrayKeys) {
  for (let i = 0; i < arrayKeys.length; i++) {
    const key = arrayKeys[i];
    def(value, key, arrayMethods[key]);
  }
}
export default class Observer {
  constructor(value) {
    this.value = value;
    // 收集数组的依赖
    this.dep = new Dep();
    // 标识响应式和数组获取 Observer 实例
    def(value, "__ob__", this);
    if (isPlainObject(value)) {
      if (Array.isArray(value)) {
        const proto = isProto ? protoMethod : copyMethod;
        // 修改数组的原型或定义数组方法
        proto(value, arrayMethods, arrayKeys);
        // 遍历数组，递归监测其中的对象子项
        this.observeArray(value);
      } else {
        // 递归监测普通对象
        this.walk(value);
      }
    }
  }
  walk(value) {
    const keys = Object.keys(value);
    keys.forEach((key) => {
      defineReactive(value, key, value[key]);
    });
  }
  observeArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      observe(arr[i]);
    }
  }
}
function observe(value) {
  if (!isPlainObject(value)) return;
  const ob = value.hasOwnProperty("__ob__") ? value.__ob__ : null;
  if (ob && ob instanceof Observer) {
    return ob;
  } else {
    return new Observer(value);
  }
}
function defineReactive(obj, key, value) {
  // 值是对象，递归下一层转成响应式
  let childOb = observe(value);
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      dep.depend();
      if (childOb) {
        childOb.dep.depend();
        if (Array.isArray(value)) dependArray(value);
      }
      console.log("get key:" + key, "value:" + value);
      return value;
    },
    set(val) {
      if (val === value) return;
      value = val;
      childOb = observe(value);
      console.log("set key:" + key, "value:" + value);
      dep.notify();
    },
  });
}

function dependArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    item.hasOwnProperty("__ob__") &&
      item.__ob__.dep &&
      item.__ob__.dep.depend();
    if (Array.isArray(item)) dependArray(item);
  }
}
