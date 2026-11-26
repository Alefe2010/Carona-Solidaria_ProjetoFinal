export class Usuario{
    private readonly _idUsuario: number
    private readonly _CPF: string
    private _nome: string
    private _telefone: string
    private _dataNasc: string
    private _email: string

    constructor(idUsuario: number,CPF: string, nome: string, telefone: string, dataNasc: string, email: string){
        this._idUsuario = idUsuario
        this._CPF = CPF
        this._nome = nome
        this._telefone = telefone
        this._dataNasc = dataNasc
        this._email = email
    }
    // por enquanto irei por somente essas funcionalidades pq to com preguiça de fazer os sets
    public get idUsuario(){return this._idUsuario}
    public get CPF(){return this._CPF}
    public get nome(){return this._nome}
    public get telefone(){return this._telefone}
    public get dataNasc(){return this._dataNasc}
    public get email(){return this._email}

    public toString(){
        return `Nome: ${this._nome}. Telefone: ${this._telefone}. Data de nascimento: ${this._dataNasc}. Email: ${this._email}.`
    }
    

}