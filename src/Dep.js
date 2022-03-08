/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2022-03-02 22:04:03
 * @LastEditTime: 2022-03-02 23:30:44
 */
export default class Dep {
  // Watcher 数组
  subs = [];
  addSub(target) {
    this.subs.push(target);
  }
  removeSub(target) {
    const index = this.subs.indexOf(target);
    if (index !== -1) {
      this.subs.splice(index, 1);
    }
  }
  depend() {
    if (Dep.target) Dep.target.addDep(this);
  }
  notify() {
    const subs = this.subs.slice();
    subs.forEach((sub) => {
      sub.update();
    });
  }
  clear() {
    this.subs = [];
  }
}
