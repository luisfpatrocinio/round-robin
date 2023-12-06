"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidInputError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message = "ERRO DE APLICAÇÃO") {
        super(message);
        this.name = "AppError";
    }
}
exports.AppError = AppError;
class InvalidInputError extends AppError {
    constructor(message = "ERRO DE ENTRADA DE DADOS") {
        super(message);
        this.name = "InvalidInputError";
    }
}
exports.InvalidInputError = InvalidInputError;
