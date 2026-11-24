import {Usuario} from "../entities/Usuario.ts"
import type { UsuarioRepository } from "../repositories/UsuarioRepository.ts"

type TipoUsuario = "motorista" | "passageiro"
export class UsuarioService {
    constructor(
        private usuarioRepo: UsuarioRepository
    ){ this.usuarioRepo = usuarioRepo}

    public async cadastrarUsuario(usuario: Usuario): Promise<void> {
        await this.usuarioRepo.cadastrarUsuario(usuario)
    }
    public async buscarPorCPF(CPF: string): Promise<Usuario | null> {
        if(!CPF){
            throw new Error("Nenhum CPF foi fornecido")
        } 
        const usuario = await this.usuarioRepo.buscarPorId(CPF)
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
        await this.usuarioRepo.atualizarDados(CPF, dadosValidos as Usuario)
    }
    public async excluirUsuario(CPF: string): Promise<void> {
        await this.usuarioRepo.excluiUsuario(CPF)
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