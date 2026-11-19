import {OfertaCarona} from "./OfertaCarona.ts"
import { PontoEncontro } from "./PontoEncontro.ts";

export class SolicitacaoCarona{
    private readonly _idSolicitacao: number;
    private _situacao: string;
    private _horario: string;
    private readonly _idOferta: number;
    private _pontoEncontro: PontoEncontro
    
    constructor(idSolicitacao: number, situacao:string = "PENDENTE", horario: string, idOferta: number, pontoEncontro: PontoEncontro){
        this._idSolicitacao = idSolicitacao
        this._situacao = situacao
        this._horario = horario
        this._idOferta = idOferta
        this._pontoEncontro = pontoEncontro
    }
    
    public get idSolicitacao(){return this._idSolicitacao}
    public get situacao(){return this._situacao}
    public get horario(){return this._horario}
    public get ofertaCarona(){return this._idOferta}
    public get pontoEncontro(){return this._pontoEncontro}
    
    public situacaoAceita(){this._situacao = "ACEITA"}
    public situacaoNegada(){this._situacao = "NEGADA"}

}