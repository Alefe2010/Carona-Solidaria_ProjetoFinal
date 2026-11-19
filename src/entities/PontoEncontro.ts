export class PontoEncontro{
    private readonly _idPontoEncontro: number;
    private _bairro: string;
    private _rua: string;
    private _pontoReferencia: string;

    constructor(idPontoEncontro: number, bairro: string, rua: string, pontoReferencia: string){
        this._idPontoEncontro = idPontoEncontro;
        this._bairro = bairro;
        this._rua = rua
        this._pontoReferencia = pontoReferencia;
    }

    public get idPontoEncontro(){return this._idPontoEncontro}
    public get bairro(){return this._bairro}
    public get pontoReferencia(){return this._pontoReferencia}
    public get rua(){return this._rua}

}