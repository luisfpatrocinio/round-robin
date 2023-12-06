"use strict";
/**
 * # Algoritmo Circular (RR) #
 * Criar um aplicativo que receberá do usuário propriedades de tarefas específicas que o sistema deverá processar.
 * O programa também deverá saber qual o valor do quantum, que é o tempo máximo de processamento de uma tarefa por vez.
 * As tarefas devem ser organizadas por fila: na ordem FIFO.
 * Ao encerrar o quantum, a tarefa deverá portanto voltar para o fim da fila, e inicializar outra tarefa.
 * Troca de Contexto: É o tempo planejado para o sistema iniciar outra tarefa.
 *
 * O programa deverá calcular o tempo médio de vida, e o tempo médio de espera.
 * Além de representar graficamente a sequência de execução das tarefas.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const option_1 = require("./classes/option");
const pilha_1 = require("./classes/pilha");
const tarefa_1 = require("./classes/tarefa");
const exceptions_1 = require("./exceptions/exceptions");
const ioUtils_1 = require("./utils/ioUtils");
const menuUtils_1 = require("./utils/menuUtils");
const viewUtils_1 = require("./utils/viewUtils");
class App {
    constructor() {
        this.opcoes = new Array;
        this.totalOptions = [
            new option_1.Option("Criar Tarefa", this.criarTarefa, () => true),
            new option_1.Option("Definir Tempo de Quantum", this.definirQuantum, () => true),
            new option_1.Option("Definir Tempo de Troca de Contexto", this.definirContexto, () => true),
            new option_1.Option("Executar", this.rodarPrograma, () => { return this.totalOptions.length > 0; }),
        ];
        this.viewStack = new pilha_1.Pilha;
        this.opcaoSelecionada = -1;
        this.filaDeTarefas = new Array();
        this.quantum = 15;
        this.tempoTrocaDeContexto = 4;
    }
    cabecalho(texto) {
        // limparTela();
        (0, viewUtils_1.drawBackground)();
        (0, ioUtils_1.exibirTextoCentralizado)(texto);
    }
    obterOpcoes() {
        let opcoesPossiveis = new Array;
        opcoesPossiveis = this.totalOptions.filter((o) => {
            return o.condition();
        });
        return opcoesPossiveis;
    }
    exibirTarefas() {
        // this.cabecalho("Tarefas");
        if (this.filaDeTarefas.length == 0) {
            (0, ioUtils_1.exibirTextoCentralizado)("Nenhuma tarefa criada.");
            return;
        }
        let tarefasHeader = "";
        for (let _ind = 0; _ind < this.filaDeTarefas.length; _ind++) {
            tarefasHeader += `T${_ind + 1}`;
            if (_ind < this.filaDeTarefas.length - 1) {
                tarefasHeader += " | ";
            }
        }
        (0, ioUtils_1.cursorTo)((0, viewUtils_1.obterLarguraTerminal)() / 2);
        process.stdout.write(tarefasHeader + "\n");
        // exibirTextoCentralizado(tarefasHeader);
        let header;
        // Duração das Tarefas
        header = "Duração: ";
        let tarefasDuration = header;
        for (let _ind = 0; _ind < this.filaDeTarefas.length; _ind++) {
            const tarefa = this.filaDeTarefas[_ind];
            tarefasDuration += `${tarefa.duracao.toString().padStart(2, "0")}`;
            if (_ind < this.filaDeTarefas.length - 1) {
                tarefasDuration += " | ";
            }
        }
        (0, ioUtils_1.cursorTo)((0, viewUtils_1.obterLarguraTerminal)() / 2 - header.length);
        process.stdout.write(tarefasDuration + "\n");
        // exibirTextoCentralizado(tarefasDuration);
        // Tempos de Entrada das Tarefas
        header = "Ingresso: ";
        let tarefasEntryTimer = header;
        for (let _ind = 0; _ind < this.filaDeTarefas.length; _ind++) {
            const tarefa = this.filaDeTarefas[_ind];
            tarefasEntryTimer += `${tarefa.tempoDeIngresso.toString().padStart(2, "0")}`;
            if (_ind < this.filaDeTarefas.length - 1) {
                tarefasEntryTimer += " | ";
            }
        }
        (0, ioUtils_1.cursorTo)((0, viewUtils_1.obterLarguraTerminal)() / 2 - header.length);
        process.stdout.write(tarefasEntryTimer + "\n");
        // exibirTextoCentralizado(tarefasEntryTimer);
    }
    exibirInformacoes() {
        (0, ioUtils_1.cursorTo)(3, 1);
        process.stdout.write(`Troca de Contexto: ${this.tempoTrocaDeContexto} u.t.`);
        (0, ioUtils_1.cursorTo)(3, 2);
        process.stdout.write(`Quantum: ${this.quantum} u.t.`);
    }
    exibirMenu() {
        (0, ioUtils_1.cursorTo)(0, 6);
        this.opcoes = this.obterOpcoes();
        for (let i = 0; i < this.opcoes.length; i++) {
            (0, ioUtils_1.exibirTexto)(`${i + 1} - ${this.opcoes[i].text}`);
        }
        (0, ioUtils_1.exibirTexto)(`0 - Sair`);
    }
    menuPrincipal() {
        // Background
        (0, viewUtils_1.drawBackground)();
        // Mostrar Tarefas
        this.exibirTarefas();
        // Mostrar Tempo de Troca de Contexto
        this.exibirInformacoes();
        // Mostrar Menu
        this.exibirMenu();
        // Obter opção
        let opcao = this.obterOpcaoDoUsuario();
        // Executar opção
        if (opcao == 0) {
            this.viewStack.pop();
        }
        else {
            this.viewStack.push(this.opcoes[opcao - 1].callback);
        }
    }
    obterOpcaoDoUsuario() {
        let opcao = -1;
        opcao = (0, ioUtils_1.obterNumeroInteiro)("Escolha uma opcao: ");
        if (opcao < 0 || opcao > this.opcoes.length) {
            throw new exceptions_1.InvalidInputError("Opção inválida.");
        }
        return opcao;
    }
    // Métodos de Execução:
    criarTarefa() {
        this.cabecalho("Criar Tarefa");
        // Obter dados da tarefa pelo usuario:
        let duracao = 0;
        try {
            duracao = (0, ioUtils_1.obterNumeroInteiro)("Digite o tempo de processamento da tarefa: ");
        }
        catch (_e) {
            this.viewStack.pop();
            throw new exceptions_1.InvalidInputError("O tempo de processamento deve ser um número inteiro.");
        }
        let ingresso = 0;
        try {
            ingresso = (0, ioUtils_1.obterNumeroInteiro)("Digite o tempo de ingresso da tarefa: ");
        }
        catch (_e) {
            this.viewStack.pop();
            throw new exceptions_1.InvalidInputError("O tempo de ingresso deve ser um número inteiro.");
        }
        // Criar a tarefa:
        let tarefa = new tarefa_1.Tarefa(duracao, ingresso);
        tarefa.nome = `T${this.filaDeTarefas.length + 1}`;
        // Adicionar a tarefa na fila:
        this.filaDeTarefas.push(tarefa);
        (0, ioUtils_1.exibirTextoCentralizado)("Tarefa criada com sucesso!");
        this.viewStack.pop();
    }
    definirQuantum() {
        this.cabecalho("Definir Quantum");
        let quantum = (0, ioUtils_1.obterNumeroInteiro)("Digite o valor do quantum: ");
        if (quantum <= 0) {
            throw new exceptions_1.InvalidInputError("O valor do quantum deve ser maior que zero.");
        }
        this.quantum = quantum;
        (0, ioUtils_1.exibirTextoCentralizado)("Quantum definido com sucesso!");
        this.viewStack.pop();
    }
    definirContexto() {
        this.cabecalho("Definir Tempo de Troca de Contexto");
        let tempo = (0, ioUtils_1.obterNumeroInteiro)("Digite o tempo de troca de contexto: ");
        if (tempo <= 0) {
            throw new exceptions_1.InvalidInputError("O tempo de troca de contexto deve ser maior que zero.");
        }
        this.tempoTrocaDeContexto = tempo;
        (0, ioUtils_1.exibirTextoCentralizado)("Tempo de troca de contexto definido com sucesso!");
        this.viewStack.pop();
    }
    rodarPrograma() {
        let tempoAtual = 0;
        let tempoTotal = 0;
        let tempoVidaTotal = 0;
        let tempoEsperaTotal = 0;
        let filaProcessos = this.filaDeTarefas;
        let processoAtual = filaProcessos.shift();
        while (processoAtual !== undefined) {
            let _duracao = Math.min(this.quantum, processoAtual.duracao);
            console.log(`Executando ${processoAtual.nome} de ${tempoAtual} até ${tempoAtual + _duracao}`);
            const tempoExecutado = _duracao;
            tempoAtual += tempoExecutado;
            processoAtual.tempoRestante -= tempoExecutado;
            tempoTotal += tempoExecutado;
            processoAtual.tempoVida += tempoExecutado;
            filaProcessos.forEach((processo) => {
                if (processo !== processoAtual) {
                    processo.tempoEspera += tempoExecutado;
                }
            });
            if (processoAtual.tempoRestante > 0) {
                filaProcessos.push(processoAtual);
            }
            else {
                console.log(`${processoAtual.nome} concluído.`);
                tempoVidaTotal += processoAtual.tempoVida;
                tempoEsperaTotal += processoAtual.tempoEspera;
            }
            if (filaProcessos.length > 0) {
                if (this.tempoTrocaDeContexto > 0) {
                    console.log(`Troca de contexto de ${tempoAtual} até ${tempoAtual + this.tempoTrocaDeContexto}`);
                    tempoAtual += this.tempoTrocaDeContexto;
                }
                processoAtual = filaProcessos.shift();
            }
            else {
                processoAtual = undefined;
            }
        }
        console.log(`Tempo total de execução: ${tempoTotal}`);
        const numeroProcessos = filaProcessos.length + 1; // Considerando os processos concluídos
        const tempoMedioVida = tempoVidaTotal / numeroProcessos;
        const tempoMedioEspera = tempoEsperaTotal / numeroProcessos;
        console.log(`Tempo médio de vida dos processos: ${tempoMedioVida}`);
        console.log(`Tempo médio de espera dos processos: ${tempoMedioEspera}`);
    }
    executar() {
        this.viewStack.push(this.menuPrincipal);
        do {
            this.opcaoSelecionada = -1;
            try {
                (0, viewUtils_1.limparTela)();
                let actualView = this.viewStack.peek();
                if (actualView != undefined) {
                    actualView.call(this);
                }
            }
            catch (_e) {
                (0, viewUtils_1.showError)(_e);
            }
            // Essa checagem garante que o EnterToContinue só aconteça a partir de telas que não envolvam seleção de opções do usuário.
            if (this.opcaoSelecionada == -1) {
                (0, menuUtils_1.enterToContinue)();
            }
        } while (!this.viewStack.isEmpty());
        (0, ioUtils_1.exibirTextoCentralizado)("Fim");
    }
}
function main() {
    let app = new App;
    app.executar();
}
main();
