import { Veiculo } from "../entities/Veiculo.ts"
import { VeiculoRepository } from "../repositories/VeiculoRepository.ts"
export default class VeiculoService{

    private veiculoRepo: VeiculoRepository
    
    constructor(veiculoRepo: VeiculoRepository){
        this.veiculoRepo = veiculoRepo
    }
    
    public async cadastrarVeiculo(
        placa:string, cor:string, modelo: string, qntdAcentos: number, CPF:string
    ): Promise<void>{

        if(!placa || !cor || !modelo || !qntdAcentos|| !CPF){
            throw new Error("Campos inválidos ou faltando")
        }

        await this.veiculoRepo.cadastrarVeiculo(placa, cor, modelo, qntdAcentos, CPF)    
    }

    public async buscarVeiculos(): Promise<Veiculo[] | null>{
        return await this.veiculoRepo.buscarVeiculos()
    }

    public async buscarPorId(placa:string): Promise<Veiculo | null>{
        if(!placa){
            throw new Error("Nenhum identificador fornecido!")
        }
        return await this.veiculoRepo.buscarPorId(placa)

    }

    public async atualizarDados(placa:string, dados: object): Promise<void>{
        if(!placa){
            throw new Error("Nenhuma placa fornecida!")
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
        await this.veiculoRepo.atualizarDados(placa, dadosValidos)
    }

    public async excluirVeiculo(placa:string): Promise<void>{
        if(!placa){throw new Error("Nenhum identificador fornecido!")}
        await this.veiculoRepo.excluirVeiculo(placa)
    }

    public async buscarVeiculosUsuario(CPF:string): Promise<Veiculo[] | null>{
        if(!CPF){throw new Error("Sem identificador do usuário para buscar")}
        return await this.veiculoRepo.buscarVeiculosUsuario(CPF)
    }
}