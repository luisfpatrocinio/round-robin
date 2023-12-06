import { question } from "readline-sync";
import { exibirTextoCentralizado } from "./ioUtils";

export function enterToContinue() {
    exibirTextoCentralizado("[ENTER]");
    question("");
}