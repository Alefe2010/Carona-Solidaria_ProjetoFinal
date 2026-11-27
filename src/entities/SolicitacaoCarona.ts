import {OfertaCarona} from "./OfertaCarona.ts"
import { PontoEncontro } from "./PontoEncontro.ts";

export class SolicitacaoCarona{
    private readonly _idSolicitacao: number;
    private _situacao: string;
    private _horario: string;
    private readonly _idOferta: number;
    private _idPontoEncontro: number
    private readonly _CPF: string
    
    constructor(idSolicitacao: number, situacao:string = "PENDENTE", horario: string, idOferta: number, idPontoEncontro: number, idPassageiro: string){
        this._idSolicitacao = idSolicitacao
        this._situacao = situacao
        this._horario = horario
        this._idOferta = idOferta
        this._idPontoEncontro = idPontoEncontro
        this._CPF = idPassageiro
    }
    
    public get CPF(){return this._CPF}
    public get idSolicitacao(){return this._idSolicitacao}
    public get situacao(){return this._situacao}
    public get horario(){return this._horario}
    public get ofertaCarona(){return this._idOferta}
    public get idPontoEncontro(){return this._idPontoEncontro}
    
    public situacaoAceita(){this._situacao = "ACEITA"}
    public situacaoNegada(){this._situacao = "NEGADA"}

}

export default SolicitacaoCarona;