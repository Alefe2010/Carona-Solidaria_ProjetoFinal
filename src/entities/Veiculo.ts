export class Veiculo{
    private _placa : string;
    private _cor : string;
    private _modelo : string;
    private _qntdAcentos : number;
    private readonly _idMotorista: number;

    constructor(placa:string, cor:string, modelo: string, qntdAcentos: number, idMotorista:number){
        this._placa = placa;
        this._cor = cor;
        this._modelo = modelo;
        this._qntdAcentos = qntdAcentos;
        this._idMotorista = idMotorista
    }

    public get placa(){return this._placa}
    public get cor(){return this._cor}
    public get modelo(){return this._modelo}
    public get qntdAcentos(){return this._qntdAcentos}
    public get idMotorista(){return this._idMotorista}

    toString(){
        return `Placa: ${this._placa}. Cor: ${this._cor}. Modelo: ${this._modelo}. qntdAcentos: ${this.qntdAcentos}.`
    }

}