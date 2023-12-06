export class AppError extends Error {
    constructor(message: string = "ERRO DE APLICAÇÃO") {
        super(message);
        this.name = "AppError";
    }
}

export class InvalidInputError extends AppError {
    constructor(message: string = "ERRO DE ENTRADA DE DADOS") {
        super(message);
        this.name = "InvalidInputError";
    }
}