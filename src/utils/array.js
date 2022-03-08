/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2022-03-02 22:05:22
 * @LastEditTime: 2022-03-02 23:08:34
 */

import { def } from "../Observer";
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

["shift", "unshift", "push", "pop", "splice", "sort", "reverse"].forEach(
  (method) => {
    const original = arrayProto[method];
    def(arrayMethods, method, function (...args) {
      let inserted = [];
      switch (method) {
        case "unshift":
        case "push":
          inserted = args;
          break;
        case "splice":
          inserted = args.slice(2);
          break;
      }
      const result = original.apply(this, args);
      const ob = this.__ob__;
      if (inserted && inserted.length) ob.observeArray(inserted);
      ob.dep.notify();
      return result;
    });
  }
);
