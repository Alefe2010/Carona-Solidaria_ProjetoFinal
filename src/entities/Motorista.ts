import { Usuario } from "./Usuario.ts"
import { Veiculo } from "./Veiculo.ts";

export class Motorista extends Usuario{
    private _CNH: String;
    private _veiculo: Veiculo
    constructor(CPF: string, nome: string, telefone: string, dataNasc: string, email: string, CNH:string, veiculo: Veiculo){
        super(CPF, nome, telefone, dataNasc, email);
        this._CNH = CNH;
        this._veiculo = veiculo
    };

    public get CNH(){return this._CNH};
    public get veiculo(){return this._veiculo}

}