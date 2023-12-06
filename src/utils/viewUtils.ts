import { exibirTextoCentralizado, exibirTextoNoCentro } from "./ioUtils";
// import chalk from 'chalk';
import readline from 'readline';
import { enterToContinue } from "./menuUtils";


export function limparTela() {
    console.clear();
}

export function showError(error: Error) {
    exibirTextoCentralizado("-----");
    exibirTextoCentralizado("Ocorreu um erro: " + error.name);
    exibirTextoCentralizado(error.message);
    enterToContinue();
    if (error.stack) console.log(error.stack);
    exibirTextoCentralizado("-----");
}

// export function textCol(texto: string, color: string = "#FFFFFF", bgColor: string = "000000") {
//     if (bgColor === undefined) {
//         bgColor = "#101010";
//     }
//     return chalk.bgHex(bgColor).hex(color)(texto);
// }

export function drawBackground() {
    limparTela();
    for (let i = 0; i < obterAlturaTerminal(); i++) {
        const h = (texto: string) => {
            return texto;
            // return textCol(texto, '#a23e8c', '#1e1d39')
        };
        if (i == 0) console.log(h(`${"=".repeat(obterLarguraTerminal())}`));
        if (i > 1 && i < obterAlturaTerminal() - 2) console.log(`${h("|")}${h(" ".repeat(obterLarguraTerminal() - 2))}${h("|")}`);
        if (i == obterAlturaTerminal() - 1) console.log(`${h("=".repeat(obterLarguraTerminal()))}`);
    }

    // Rodapé
    readline.cursorTo(process.stdout, 1, obterAlturaTerminal() - 4);
    var _data = new Date;
    var _dataStr = `${_data.toUTCString()}`;
    exibirTextoCentralizado(`${_dataStr}`);


    // Mover cursor para o início da tela:
    readline.cursorTo(process.stdout, 1, 1);   
}

export function obterAlturaTerminal() {
    return process.stdout.rows;
}

export function obterLarguraTerminal() {
    return process.stdout.columns;
}
