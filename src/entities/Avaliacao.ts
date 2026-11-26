export class Avaliacao{
    private readonly idAvaliacao: number; 
    private readonly _nota: number;
    private _comentario: string;
    private _tipoAvaliador: string;
    private readonly _idCorrida: number;
    private readonly _idUsuario: number 

    constructor(idAvaliacao: number, nota: number, comentario: string, tipoAvaliador: string, idCorrida: number, idUsuario: number){
        this.idAvaliacao = idAvaliacao;
        this._nota = nota;
        this._comentario = comentario;
        this._tipoAvaliador = tipoAvaliador;
        this._idCorrida = idCorrida;
        this._idUsuario = idUsuario;
    };

    public get idCorrida(){return this._idCorrida}
    public get nota(){return this._nota}
    public get comentario(){return this._comentario}
    public get idUsuario(){return this._idUsuario}
    public get tipoAvaliador(){return this._tipoAvaliador}
    // no service que vai ter verifica_nota_Valida


}
