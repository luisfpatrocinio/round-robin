export class Option {
    public text: string;
    public callback: () => void;
    public condition: () => boolean;

    constructor(text: string, callback: () => void, condition: () => boolean) {
        this.text = text;
        this.callback = callback;
        this.condition = condition;
    }
}