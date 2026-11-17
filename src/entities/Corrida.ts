import { OfertaCarona } from "./OfertaCarona.ts";
import { SolicitacaoCarona } from "./SolicitacaoCarona.ts";

export class Corrida{
    private readonly _idCorrida : number
    private _dataHoraFinal : string
    private _situacaoCorrida: string
    private readonly _idOferta: number

    constructor(idCorrida: number, dataHoraFinal: string, situacaoCorrida: string = "EM PROCESSO", idOferta:number){
        this._idCorrida = idCorrida;
        this._dataHoraFinal = dataHoraFinal;
        this._situacaoCorrida  = situacaoCorrida;
        this._idOferta = idOferta
    }

    public get idCorrida(){return this._idCorrida}
    public get situacaoCorrida(){return this._situacaoCorrida}
    public get dataHoraFinal(){return this._dataHoraFinal}
    public get idOferta(){return this._idOferta}
    
    public iniciarCorrida(){this._situacaoCorrida = "INICIADA"}
    public finalizarCorrida(horaFinal:string){
        this._situacaoCorrida = "FINALIZADA"
        this._dataHoraFinal = horaFinal
    }
}