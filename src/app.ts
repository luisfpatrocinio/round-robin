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

import { Option } from "./classes/option";
import { Pilha } from "./classes/pilha";
import { Tarefa } from "./classes/tarefa";
import { InvalidInputError } from "./exceptions/exceptions";
import { cursorTo, exibirTexto, exibirTextoCentralizado, obterNumeroInteiro, obterTexto } from "./utils/ioUtils";
import { enterToContinue } from "./utils/menuUtils";
import { drawBackground, limparTela, obterLarguraTerminal, showError } from "./utils/viewUtils";

class App {
    public opcoes: Array<Option> = new Array<Option>;
    public totalOptions: Array<Option> = [
        new Option("Criar Tarefa", this.criarTarefa, () => true),
        new Option("Definir Tempo de Quantum", this.definirQuantum, () => true),
        new Option("Definir Tempo de Troca de Contexto", this.definirContexto, () => true),
        new Option("Executar", this.rodarPrograma, () => {return this.totalOptions.length > 0}),
    ];
    public viewStack: Pilha<() => void> = new Pilha<() => void>;
    private opcaoSelecionada: number = -1;

    public filaDeTarefas: Array<Tarefa> = new Array<Tarefa>();
    public quantum: number = 15;
    public tempoTrocaDeContexto: number = 4;

    cabecalho(texto: string): void {
        // limparTela();
        drawBackground();
        exibirTextoCentralizado(texto);
    }

    obterOpcoes() {
        let opcoesPossiveis: Array<Option> = new Array<Option>;
        opcoesPossiveis = this.totalOptions.filter((o) => {
            return o.condition();
        })
        return opcoesPossiveis;
    }

    exibirTarefas() {
        // this.cabecalho("Tarefas");
        if (this.filaDeTarefas.length == 0) {
            exibirTextoCentralizado("Nenhuma tarefa criada.");
            return;
        }   

        let tarefasHeader = "";
        for (let _ind = 0; _ind < this.filaDeTarefas.length; _ind++) {
            tarefasHeader += `T${_ind + 1}`;
            if (_ind < this.filaDeTarefas.length - 1) {
                tarefasHeader += " | ";
            }
        }
        cursorTo(obterLarguraTerminal() / 2);
        process.stdout.write(tarefasHeader + "\n");
        // exibirTextoCentralizado(tarefasHeader);

        let header: string;

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
        cursorTo(obterLarguraTerminal() / 2 - header.length);
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
        cursorTo(obterLarguraTerminal() / 2 - header.length);
        process.stdout.write(tarefasEntryTimer + "\n");
        // exibirTextoCentralizado(tarefasEntryTimer);
    }

    exibirInformacoes() {
        cursorTo(3, 1);
        process.stdout.write(`Troca de Contexto: ${this.tempoTrocaDeContexto} u.t.`);
        cursorTo(3, 2);
        process.stdout.write(`Quantum: ${this.quantum} u.t.`);
    }

    exibirMenu(): void {
        cursorTo(0, 6);
        this.opcoes = this.obterOpcoes();
        for (let i = 0; i < this.opcoes.length; i++) {
            exibirTexto(`${i + 1} - ${this.opcoes[i].text}`);
        }
        exibirTexto(`0 - Sair`);
    }

    menuPrincipal(): void {
        // Background
        drawBackground();

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
        } else {
            this.viewStack.push(this.opcoes[opcao - 1].callback);
        }

        
    }

    obterOpcaoDoUsuario(): number {
        let opcao: number = -1;
        opcao = obterNumeroInteiro("Escolha uma opcao: ");
        if (opcao < 0 || opcao > this.opcoes.length) {
            throw new InvalidInputError("Opção inválida.");
        }
        return opcao;
    }

    // Métodos de Execução:
    criarTarefa(): void {
        this.cabecalho("Criar Tarefa");
        // Obter dados da tarefa pelo usuario:
        let duracao: number = 0;
        try {
            duracao = obterNumeroInteiro("Digite o tempo de processamento da tarefa: ");
        } catch (_e) {
            this.viewStack.pop();
            throw new InvalidInputError("O tempo de processamento deve ser um número inteiro.");
        }

        let ingresso: number = 0;
        try {
            ingresso = obterNumeroInteiro("Digite o tempo de ingresso da tarefa: ");
        } catch (_e) {
            this.viewStack.pop();
            throw new InvalidInputError("O tempo de ingresso deve ser um número inteiro.");
        }

        // Criar a tarefa:
        let tarefa = new Tarefa(duracao, ingresso);
        tarefa.nome = `T${this.filaDeTarefas.length + 1}`;

        // Adicionar a tarefa na fila:
        this.filaDeTarefas.push(tarefa);

        exibirTextoCentralizado("Tarefa criada com sucesso!");
        this.viewStack.pop();
    }

    definirQuantum(): void {
        this.cabecalho("Definir Quantum");
        let quantum = obterNumeroInteiro("Digite o valor do quantum: ");
        if (quantum <= 0) {
            throw new InvalidInputError("O valor do quantum deve ser maior que zero.");
        }
        this.quantum = quantum;
        exibirTextoCentralizado("Quantum definido com sucesso!");
        this.viewStack.pop();
    }

    definirContexto(): void {
        this.cabecalho("Definir Tempo de Troca de Contexto");
        let tempo = obterNumeroInteiro("Digite o tempo de troca de contexto: ");
        if (tempo <= 0) {
            throw new InvalidInputError("O tempo de troca de contexto deve ser maior que zero.");
        }
        this.tempoTrocaDeContexto = tempo;
        exibirTextoCentralizado("Tempo de troca de contexto definido com sucesso!");
        this.viewStack.pop();
    }

    rodarPrograma() {
        let tempoAtual: number = 0;
        let tempoTotal: number = 0;
        let tempoVidaTotal: number = 0;
        let tempoEsperaTotal: number = 0;

        let filaProcessos: Array<Tarefa> = this.filaDeTarefas;
        let processoAtual: Tarefa | undefined = filaProcessos.shift();
        
        while (processoAtual !== undefined) {
            let _duracao = Math.min(this.quantum, processoAtual.duracao);
            console.log(`Executando ${processoAtual.nome} de ${tempoAtual} até ${tempoAtual + _duracao}`);

            const tempoExecutado: number = _duracao;
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
            } else {
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
            } else {
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
                limparTela();
                let actualView = this.viewStack.peek();
                if (actualView != undefined) {
                    actualView.call(this);
                }
            } catch (_e: any) {
                showError(_e);
            }

            // Essa checagem garante que o EnterToContinue só aconteça a partir de telas que não envolvam seleção de opções do usuário.
            if (this.opcaoSelecionada == -1) {
                enterToContinue();
            }
        } while (!this.viewStack.isEmpty())
        exibirTextoCentralizado("Fim");
    }
}

function main() {
    let app: App = new App;
    app.executar();
}

main();