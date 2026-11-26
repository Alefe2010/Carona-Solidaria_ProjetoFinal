import { Usuario } from "./Usuario.ts"

export class Motorista extends Usuario{
    private _CNH: String;
    constructor(idUsuario: number,CPF: string, nome: string, telefone: string, dataNasc: string, email: string, CNH:string,){
        super(idUsuario,CPF, nome, telefone, dataNasc, email);
        this._CNH = CNH;
    };

    public get CNH(){return this._CNH};
    
}