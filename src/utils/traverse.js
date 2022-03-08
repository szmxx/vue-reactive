/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2022-03-02 23:58:07
 * @LastEditTime: 2022-03-03 12:05:22
 */
// 判断是否是普通对象 [] || {}
export function isPlainObject(obj) {
  return typeof obj === "object" && obj !== null;
}
const seenObjects = new Set();
export function traverse(val) {
  function _traverse(value, seen) {
    let keys;
    const isA = Array.isArray(value);
    if (!isA || !isPlainObject(value) || Object.isFrozen(value)) return;
    if (value.hasOwnProperty("__ob__")) {
      const id = value.__ob__.dep.id;
      if (seen.has(id)) return;
      seen.add(id);
    }
    if (isA) {
      for (let i = value.length - 1; i >= 0; i--) {
        _traverse(value[i], seen);
      }
    } else {
      keys = Object.keys(value);
      for (let i = keys.length - 1; i >= 0; i--) {
        _traverse(value[keys[i]], seen);
      }
    }
  }
  _traverse(val, seenObjects);
  seenObjects.clear();
}
