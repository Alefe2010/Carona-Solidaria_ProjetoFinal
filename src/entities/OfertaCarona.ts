import { Motorista } from "./Motorista.ts" 

export class OfertaCarona{
    private _idOferta: number;
    private _numeroVagas: number;
    private _origem: string;
    private _destino: string;
    private _motorista: Motorista;

    constructor(idOferta: number, numeroVagas: number, origem: string, destino: string, motorista: Motorista){
        this._idOferta = idOferta;
        this._numeroVagas = numeroVagas;
        this._origem = origem;
        this._destino = destino;
        this._motorista = motorista
    }
    public get idOferta(){return this._idOferta}
    public get numeroVagas(){return this._numeroVagas}
    public get origem(){return this._origem}
    public get destino(){return this._destino}
    public get motorista(){return this._motorista}

}