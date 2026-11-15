export class Veiculo{
    private _placa : string;
    private _cor : string;
    private _modelo : string;
    private _qntdAcentos : number;

    constructor(placa:string, cor:string, modelo: string, qntdAcentos: number){
        this._placa = placa;
        this._cor = cor;
        this._modelo = modelo;
        this._qntdAcentos = qntdAcentos;
    }

    public get placa(){return this._placa}
    public get cor(){return this._cor}
    public get modelo(){return this._modelo}
    public get qntdAcentos(){return this._qntdAcentos}

    toString(){
        return `Placa: ${this._placa}. Cor: ${this._cor}. Modelo: ${this._modelo}. qntdAcentos: ${this.qntdAcentos}.`
    }

}