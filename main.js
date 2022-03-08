/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2022-03-02 22:03:32
 * @LastEditTime: 2022-03-08 20:43:48
 */
import Observer from "./src/Observer";
import Watcher from "./src/Watcher";

const data = {
  arr: [1, { a: 1 }, [2]],
  obj: {
    a: 1,
    b: { bb: 1 },
    c: [1, 2, 3],
    d: [1, { dd: 1 }],
  },
};

function watch(obj, key, callback, options = {}) {
  const w = new Watcher(obj, key, callback, options);
  return () => {
    w.teardown();
  };
}
new Observer(data);

watch(data, "arr", (newVal, oldVal) => {
  console.log("arr新:" + newVal, "旧:" + oldVal);
});

watch(data, "arr.0", (newVal, oldVal) => {
  console.log("arr.0新:" + newVal, "旧:" + oldVal);
});
console.log(123);
console.log(data);
