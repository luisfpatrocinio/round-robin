"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
class Option {
    constructor(text, callback, condition) {
        this.text = text;
        this.callback = callback;
        this.condition = condition;
    }
}
exports.Option = Option;
