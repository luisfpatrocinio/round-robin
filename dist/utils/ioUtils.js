"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exibirTextoNoCentro = exports.exibirTextoCentralizado = exports.exibirTexto = exports.cursorTo = exports.obterNumeroInteiro = exports.obterTexto = void 0;
const viewUtils_1 = require("./viewUtils");
const readline_1 = __importDefault(require("readline"));
const readline_sync_1 = __importDefault(require("readline-sync"));
readline_sync_1.default.setDefaultOptions({ encoding: 'utf8' });
const BG_COLOR = "#101010";
// Input:
function obterTexto(label) {
    readline_sync_1.default.setDefaultOptions({ encoding: 'utf8' });
    return readline_sync_1.default.question(label);
}
exports.obterTexto = obterTexto;
function obterNumeroInteiro(question) {
    readline_sync_1.default.setDefaultOptions({ encoding: 'utf8' });
    cursorTo(2);
    let num = parseInt(readline_sync_1.default.question(question));
    if (isNaN(num)) {
        throw new Error("O valor informado não é um número.");
    }
    return num;
}
exports.obterNumeroInteiro = obterNumeroInteiro;
function cursorTo(x, y) {
    process.stdout.cursorTo(x, y);
}
exports.cursorTo = cursorTo;
// Output:
function exibirTexto(texto) {
    cursorTo(2);
    process.stdout.write(texto + "\n");
}
exports.exibirTexto = exibirTexto;
function exibirTextoCentralizado(texto) {
    let espacos = (process.stdout.columns - texto.length) / 2;
    console.log(`${" ".repeat(espacos)}${texto}`);
    return;
}
exports.exibirTextoCentralizado = exibirTextoCentralizado;
function exibirTextoNoCentro(texto, inverse = false, color = "#FFFFFF") {
    var _x = Math.floor(((0, viewUtils_1.obterLarguraTerminal)() - texto.length) / 2);
    readline_1.default.cursorTo(process.stdout, _x);
    // if (inverse) {
    //     console.log(chalk.bgHex(BG_COLOR).hex(color).inverse(texto));
    // } else {
    //     console.log(chalk.bgHex(BG_COLOR).hex(color)(texto));
    // }
}
exports.exibirTextoNoCentro = exibirTextoNoCentro;
