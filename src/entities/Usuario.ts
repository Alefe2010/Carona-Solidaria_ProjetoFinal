export class Usuario{
    public readonly CPF: string;
    public nome: string;
    public telefone: string;
    public dataNasc: string;
    public email: string;
    public senha: string;
    public cnh: string | null;

    constructor(
        CPF: string,
        nome: string,
        telefone: string,
        dataNasc: string,
        email: string,
        senha: string,
        cnh: string | null = null
    ) {
        this.CPF = CPF;
        this.nome = nome;
        this.telefone = telefone;
        this.dataNasc = dataNasc;
        this.email = email;
        this.senha = senha;
        this.cnh = cnh;
    }
    public toString(){
        return `Nome: ${this.nome}. Telefone: ${this.telefone}. Data de nascimento: ${this.dataNasc}. Email: ${this.email}.`
    }
    

}