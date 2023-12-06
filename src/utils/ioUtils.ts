import { obterLarguraTerminal } from "./viewUtils";
import readline from 'readline';

import rls from 'readline-sync';
rls.setDefaultOptions({encoding: 'utf8'});

const BG_COLOR = "#101010";

// Input:
export function obterTexto(label: string): string {
    rls.setDefaultOptions({encoding: 'utf8'});
    return rls.question(label);
}

export function obterNumeroInteiro(question: string): number {
    rls.setDefaultOptions({encoding: 'utf8'});
    cursorTo(2);
    let num = parseInt(rls.question(question));
    if (isNaN(num)) {
        throw new Error("O valor informado não é um número.");
    }
    return num;
}

export function cursorTo(x: number, y ?: number) {
    process.stdout.cursorTo(x, y);
}

// Output:
export function exibirTexto(texto: string) {
    cursorTo(2);
    process.stdout.write(texto + "\n");
}

export function exibirTextoCentralizado(texto: string) {
    let espacos = (process.stdout.columns - texto.length) / 2;
    console.log(`${" ".repeat(espacos)}${texto}`);
    return;
}

export function exibirTextoNoCentro(texto: string, inverse: boolean = false, color: string = "#FFFFFF"): void {
    var _x = Math.floor((obterLarguraTerminal() - texto.length) / 2);
    readline.cursorTo(process.stdout, _x);
    // if (inverse) {
    //     console.log(chalk.bgHex(BG_COLOR).hex(color).inverse(texto));
    // } else {
    //     console.log(chalk.bgHex(BG_COLOR).hex(color)(texto));
    // }
}