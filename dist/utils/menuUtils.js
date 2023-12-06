"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterToContinue = void 0;
const readline_sync_1 = require("readline-sync");
const ioUtils_1 = require("./ioUtils");
function enterToContinue() {
    (0, ioUtils_1.exibirTextoCentralizado)("[ENTER]");
    (0, readline_sync_1.question)("");
}
exports.enterToContinue = enterToContinue;
