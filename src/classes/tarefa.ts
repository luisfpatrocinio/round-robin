export class Tarefa {
    private _nome: string = "";
    private _duracao: number;
    private _tempoDeIngresso: number;
    private _tempoRestante: number = 0;
    private _tempoVida: number = 0;
    private _tempoEspera: number = 0;

    constructor(duracao: number, tempoDeIngresso: number) {
        this._duracao = duracao;
        this._tempoDeIngresso = tempoDeIngresso;
        this._tempoRestante = duracao;
    }

    get duracao(): number {
        return this._duracao;
    }

    get tempoDeIngresso(): number {
        return this._tempoDeIngresso;
    }

    set nome(nome: string) {
        this._nome = nome;
    }

    get nome(): string {
        return this._nome;
    }   

    get tempoRestante(): number {
        return this._tempoRestante;
    }

    set tempoRestante(tempoRestante: number) {
        this._tempoRestante = tempoRestante;
    }

    get tempoVida(): number {
        return this._tempoVida;
    }

    set tempoVida(tempoVida: number) {
        this._tempoVida = tempoVida;
    }

    get tempoEspera(): number {
        return this._tempoEspera;
    }

    set tempoEspera(tempoEspera: number) {
        this._tempoEspera = tempoEspera;
    }
    
}