import {Usuario} from "../entities/Usuario.ts"
import type { UsuarioRepository } from "../repositories/UsuarioRepository.ts"

type TipoUsuario = "motorista" | "passageiro"

export class UsuarioService {
    private usuarioRepo: UsuarioRepository
    constructor(
        usuarioRepo: UsuarioRepository
    ){ this.usuarioRepo = usuarioRepo}

    public async cadastrarUsuario(CPF: string, nome: string, telefone: string, dataNasc: string, email: string): Promise<void> {
        await this.usuarioRepo.cadastrarUsuario(CPF, nome, telefone, dataNasc, email)
    }
    public async buscarPorCPF(CPF: string): Promise<Usuario | null> {
        if(!CPF){
            throw new Error("Nenhum CPF foi fornecido")
        } 
        const usuario = await this.usuarioRepo.buscarPorCPF(CPF)
        return usuario || null
    }
    public async atualizarDados(CPF: string, dados: object): Promise<void> {
        if(!CPF){
            throw new Error("Nenhum identificador fornecido!")
        }
        const dadosValidos: Record<string, any> = dados
        
        for(let dado in dadosValidos){
            if(!dadosValidos[dado]){
                delete dadosValidos[dado]
            }
        }
        if(Object.keys(dadosValidos).length === 0){
            throw new Error("Sem nenhum dado válido!")
        }
        await this.usuarioRepo.atualizarDados(CPF, dadosValidos as Usuario[])
    }
    public async excluirUsuario(CPF: string): Promise<void> {
        await this.usuarioRepo.excluiUsuario(CPF)
    }
    public async buscarPorEmail(email: string): Promise<Usuario | null> {
        if(!email){
            throw new Error("Nenhum CPF foi fornecido")
        }
        const usuario = await this.usuarioRepo.buscarPorEmail(email)
        return usuario || null
    }
    public async filtrarPorTipo(tipo: TipoUsuario) {
        if (tipo === "motorista") {
            return await this.usuarioRepo.filtrarMotoristas();
        }

        if (tipo === "passageiro") {
            return await this.usuarioRepo.filtrarPassageiros();
        }

        throw new Error("Tipo inválido! Informe 'motorista' ou 'passageiro'.");
    }
}