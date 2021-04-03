"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setKeyValue = exports.getKeyValue = void 0;
const getKeyValue = (obj) => (key) => obj[key];
exports.getKeyValue = getKeyValue;
const setKeyValue = (obj) => (key) => (val) => {
    obj[key] = val;
};
exports.setKeyValue = setKeyValue;
