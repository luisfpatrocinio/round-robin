"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterLarguraTerminal = exports.obterAlturaTerminal = exports.drawBackground = exports.showError = exports.limparTela = void 0;
const ioUtils_1 = require("./ioUtils");
// import chalk from 'chalk';
const readline_1 = __importDefault(require("readline"));
const menuUtils_1 = require("./menuUtils");
function limparTela() {
    console.clear();
}
exports.limparTela = limparTela;
function showError(error) {
    (0, ioUtils_1.exibirTextoCentralizado)("-----");
    (0, ioUtils_1.exibirTextoCentralizado)("Ocorreu um erro: " + error.name);
    (0, ioUtils_1.exibirTextoCentralizado)(error.message);
    (0, menuUtils_1.enterToContinue)();
    if (error.stack)
        console.log(error.stack);
    (0, ioUtils_1.exibirTextoCentralizado)("-----");
}
exports.showError = showError;
// export function textCol(texto: string, color: string = "#FFFFFF", bgColor: string = "000000") {
//     if (bgColor === undefined) {
//         bgColor = "#101010";
//     }
//     return chalk.bgHex(bgColor).hex(color)(texto);
// }
function drawBackground() {
    limparTela();
    for (let i = 0; i < obterAlturaTerminal(); i++) {
        const h = (texto) => {
            return texto;
            // return textCol(texto, '#a23e8c', '#1e1d39')
        };
        if (i == 0)
            console.log(h(`${"=".repeat(obterLarguraTerminal())}`));
        if (i > 1 && i < obterAlturaTerminal() - 2)
            console.log(`${h("|")}${h(" ".repeat(obterLarguraTerminal() - 2))}${h("|")}`);
        if (i == obterAlturaTerminal() - 1)
            console.log(`${h("=".repeat(obterLarguraTerminal()))}`);
    }
    // Rodapé
    readline_1.default.cursorTo(process.stdout, 1, obterAlturaTerminal() - 4);
    var _data = new Date;
    var _dataStr = `${_data.toUTCString()}`;
    (0, ioUtils_1.exibirTextoCentralizado)(`${_dataStr}`);
    // Mover cursor para o início da tela:
    readline_1.default.cursorTo(process.stdout, 1, 1);
}
exports.drawBackground = drawBackground;
function obterAlturaTerminal() {
    return process.stdout.rows;
}
exports.obterAlturaTerminal = obterAlturaTerminal;
function obterLarguraTerminal() {
    return process.stdout.columns;
}
exports.obterLarguraTerminal = obterLarguraTerminal;
