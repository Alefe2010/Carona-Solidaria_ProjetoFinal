import { Usuario } from "./Usuario.ts"

export class Motorista extends Usuario{
    private _CNH: String;
    constructor(CPF: string, nome: string, telefone: string, dataNasc: string, email: string, CNH:string,){
        super(CPF, nome, telefone, dataNasc, email);
        this._CNH = CNH;
    };

    public get CNH(){return this._CNH};
    
}