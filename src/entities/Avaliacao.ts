export class Avaliacao{
    private readonly idAvaliacao: number; 
    private readonly _nota: number;
    private _comentario: string;
    private _tipoAvaliador: string;
    private readonly _idCorrida: number;
    private readonly _cpf: string 

    constructor(idAvaliacao: number, nota: number, comentario: string, tipoAvaliador: string, idCorrida: number, cpf: string){
        this.idAvaliacao = idAvaliacao;
        this._nota = nota;
        this._comentario = comentario;
        this._tipoAvaliador = tipoAvaliador;
        this._idCorrida = idCorrida;
        this._cpf = cpf;
    };

    public get idCorrida(){return this._idCorrida}
    public get nota(){return this._nota}
    public get comentario(){return this._comentario}
    public get cpf(){return this._cpf}
    public get tipoAvaliador(){return this._tipoAvaliador}
    // no service que vai ter verifica_nota_Valida


}