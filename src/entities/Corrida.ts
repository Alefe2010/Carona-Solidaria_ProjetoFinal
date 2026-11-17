import { OfertaCarona } from "./OfertaCarona.ts";
import { SolicitacaoCarona } from "./SolicitacaoCarona.ts";

export class Corrida{
    private _idCarona : number
    private _dataHoraFinal : string
    private _situacaoCorrida: string
    private _solicitacoes: SolicitacaoCarona[]

    constructor(idCarona: number, dataHoraFinal: string, situacaoCorrida: string = "EM PROCESSO"){
        this._idCarona = idCarona;
        this._dataHoraFinal = dataHoraFinal;
        this._situacaoCorrida  = situacaoCorrida;
        this._solicitacoes = []
    }

    public get idCarona(){return this._idCarona}
    public get situacaoCorrida(){return this._situacaoCorrida}
    public get dataHoraFinal(){return this._dataHoraFinal}
    public get solicitacoes(){return this._solicitacoes}
    
    public iniciarCorrida(){this._situacaoCorrida = "INICIADA"}
    public finalizarCorrida(){this._situacaoCorrida = "FINALIZADA"}
    public adicionarSolicitacao(solicitacao: SolicitacaoCarona){
        if (!solicitacao){
            throw new Error("Não há solicitação para adicionar")
        }
        this._solicitacoes.push(solicitacao)
    }
    public removerSolicitacao(idSolicitacao: number){
        if(!idSolicitacao){throw new Error("Não há nenhum id para remover")}
        
        let indexSolicitacao: number = this._solicitacoes.findIndex(solicitacao => solicitacao.idSolicitacao == idSolicitacao)

        if(indexSolicitacao === -1){
            throw new Error("Não existe essa solicitacao")
        }

        this._solicitacoes.splice(indexSolicitacao, 1)
    }
}