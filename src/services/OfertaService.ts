import type { OfertaCarona } from "../entities/OfertaCarona.ts"
import { OfertaRepository } from "../repository/OfertaRepository.ts"
import { UsuarioRepository} from "../repository/UsuarioRepository.ts"


export class OfertaService{
    private ofertaRepo: OfertaRepository
    private usuarioRepo: UsuarioRepository
    constructor(
        ofertaRepo: OfertaRepository, 
        usuarioRepo: UsuarioRepository
    ){
        this.ofertaRepo = ofertaRepo
        this.usuarioRepo = usuarioRepo
    }
    public async criarOferta(
        numeroVagas:number, 
        origem:string, 
        destino: string, 
        horario: string, 
        cpf: string, 
        placa:string): Promise<void>{

        if(!numeroVagas || !origem || !destino || !horario || !cpf || !placa){
            throw new Error("Campos inválidos ou faltando")
        }
        await this.usuarioRepo.criarOferta(numeroVagas, origem, destino, horario, cpf, placa)

    }
    public async buscarPorId(idOferta:number): Promise<OfertaCarona>{
        if(!idOferta){
            throw new Error("Nenhum identificador fornecido!")
        }
        return await this.usuarioRepo.buscarPorId(idOferta)

    }

    public async atualizarDados(idOferta:number, dados: object): Promise<void>{
        if(!idOferta){
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

        await this.ofertaRepo.atualizarDados(idOferta, dadosValidos)
    }

    public async excluirOferta(idOferta:number): Promise<void>{
        if(!idOferta){throw new Error("Nenhum identificador fornecido!")}
        await this.ofertaRepo.excluirOferta(idOferta)
    }

    public async filtroOfertas(idOferta: number, filtro: object){
        return await this.ofertaRepo.filtroOfertas(idOferta, filtro) 

    }

}

