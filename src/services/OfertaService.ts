import type { OfertaCarona } from "../entities/OfertaCarona.ts"
import { OfertaCaronaRepository } from "../repositories/OfertaRepository.ts"
import { UsuarioRepository } from "../repositories/UsuarioRepository.ts";
import type { Motorista } from "../entities/Motorista.ts"

interface FiltroOferta {
    origem?: string;
    destino?: string;
}

export class OfertaService{
    private ofertaRepo: OfertaCaronaRepository
    private usuarioRepo: UsuarioRepository
    constructor(
        ofertaRepo: OfertaCaronaRepository, 
        usuarioRepo: UsuarioRepository
    ){
        this.ofertaRepo = ofertaRepo
        this.usuarioRepo = usuarioRepo
    }
    public async criarOferta(
        numeroVagas:number, 
        origem:string,
        destino: string, 
        dataHora: Date, 
        cpf: string, 
        placa:string): Promise<void>{

        if(!numeroVagas || !origem || !destino || !dataHora || !cpf || !placa){
            throw new Error("Campos inválidos ou faltando")
        }
        if(numeroVagas <= 0){throw new Error("Quantidade de vaga mínima é de uma vaga!")}

    
        await this.ofertaRepo.cadastrarOferta(numeroVagas, origem, destino, dataHora, cpf)

    }
    public async buscarPorId(idOferta:number): Promise<OfertaCarona | null>{
        if(!idOferta){
            throw new Error("Nenhum identificador fornecido!")
        }
        return await this.ofertaRepo.buscarPorId(idOferta)

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
        await this.ofertaRepo.atualizarDados(idOferta, dadosValidos as OfertaCarona)
    }

    public async excluirOferta(idOferta:number): Promise<void>{
        if(!idOferta){throw new Error("Nenhum identificador fornecido!")}
        await this.ofertaRepo.excluirOferta(idOferta)
    }

    public async filtroOfertas(filtro: Record<string, any>){
        const camposPermitidos = ["origem", "destino", "numeroVagas"]
        const filtroValido: Record<string, any> = {}

        for (const campo of camposPermitidos) {
            if (filtro[campo]) {
                filtroValido[campo] = filtro[campo]
            }
        }
        return await this.ofertaRepo.filtroOfertas(filtroValido) 

    } 
}
