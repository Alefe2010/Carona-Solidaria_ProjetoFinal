import { Motorista } from "./Motorista.ts" 

export class OfertaCarona{
    private _idOferta: number;
    private _numeroVagas: number;
    private _horario: string;
    private _origem: string;
    private _destino: string;
    private _idMotorista: number;

    constructor(idOferta: number, numeroVagas: number, origem: string, destino: string, horario: string, idMotorista: number){
        this._idOferta = idOferta;
        this._numeroVagas = numeroVagas;
        this._horario = horario
        this._origem = origem;
        this._destino = destino;
        this._idMotorista = idMotorista
    }
    public get idOferta(){return this._idOferta}
    public get numeroVagas(){return this._numeroVagas}
    public get horario(){return this._horario}
    public get origem(){return this._origem}
    public get destino(){return this._destino}
    public get idMotorista(){return this._idMotorista}

}