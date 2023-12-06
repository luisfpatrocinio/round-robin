"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarefa = void 0;
class Tarefa {
    constructor(duracao, tempoDeIngresso) {
        this._nome = "";
        this._tempoRestante = 0;
        this._tempoVida = 0;
        this._tempoEspera = 0;
        this._duracao = duracao;
        this._tempoDeIngresso = tempoDeIngresso;
        this._tempoRestante = duracao;
    }
    get duracao() {
        return this._duracao;
    }
    get tempoDeIngresso() {
        return this._tempoDeIngresso;
    }
    set nome(nome) {
        this._nome = nome;
    }
    get nome() {
        return this._nome;
    }
    get tempoRestante() {
        return this._tempoRestante;
    }
    set tempoRestante(tempoRestante) {
        this._tempoRestante = tempoRestante;
    }
    get tempoVida() {
        return this._tempoVida;
    }
    set tempoVida(tempoVida) {
        this._tempoVida = tempoVida;
    }
    get tempoEspera() {
        return this._tempoEspera;
    }
    set tempoEspera(tempoEspera) {
        this._tempoEspera = tempoEspera;
    }
}
exports.Tarefa = Tarefa;
