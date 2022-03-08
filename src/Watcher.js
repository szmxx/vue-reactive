/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2022-03-02 22:04:17
 * @LastEditTime: 2022-03-03 00:42:14
 */
import Dep from "./Dep";
import { traverse } from "./utils/traverse";
const regexp = /[^\w.$]/;
function parsePath(expression) {
  if (regexp.test(expression)) return;
  const segments = expression.split(".");
  return function (obj) {
    if (!obj) return;
    for (let i = 0; i < segments.length; i++) {
      obj = obj[segments[i]];
    }
    return obj;
  };
}
export default class Watcher {
  constructor(vm, expression, cb, options = {}) {
    const { immediate = false, deep = false } = options;
    this.deep = deep;
    this.vm = vm;
    this.cb = cb;
    // 管理 watcher 加入的依赖，用来 teardown
    this.deps = [];
    this.depIds = new Set();

    this.getter =
      typeof expression === "function" ? expression : parsePath(expression);
    this.value = this.get();

    if (immediate) {
      cb.call(vm, this.value);
    }
  }
  addDep(dep) {
    if (dep && !this.depIds.has(dep.id)) {
      this.depIds.add(dep.id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
  get() {
    Dep.target = this;
    // 调用 getter 进行依赖收集，getter 里面涉及变量都依赖这个 watcher
    const value = this.getter.call(this.vm, this.vm);
    if (this.deep) {
      traverse(value);
    }
    Dep.target = undefined;
    return value;
  }
  update() {
    const oldVal = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldVal);
  }
  teardown() {
    for (let i = this.deps.length - 1; i >= 0; i--) {
      this.deps[i].removeSub(this);
    }
  }
}
