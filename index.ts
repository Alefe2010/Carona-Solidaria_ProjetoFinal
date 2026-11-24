import { OfertaService } from "./src/services/OfertaService.ts"
import { CorridaService } from "./src/services/CorridaService.ts"
import { AvaliacaoService } from "./src/services/AvaliacaoService.ts"
import { SolicitacaoService } from "./src/services/SolicitacaoService.ts"
import { UsuarioService } from "./src/services/UsuarioService.ts"

import { AvaliacaoRepository } from "./src/repositories/AvaliacaoRepository.ts"
import { OfertaCaronaRepository } from "./src/repositories/OfertaRepository.ts"
import { SolicitacaoRepository } from "./src/repositories/SolicitacaoRepository.ts"
import { UsuarioRepository } from "./src/repositories/UsuarioRepository.ts"
import { CorridaRepository } from "./src/repositories/CorridaRepository.ts"

const avaliacaoRepository = new AvaliacaoRepository()
const ofertaCaronaRepository = new OfertaCaronaRepository()
const solicitacaoRepository = new SolicitacaoRepository()
const usuarioRepository = new UsuarioRepository()
const corridaRepository = new CorridaRepository()

const usuarioService = new UsuarioService(usuarioRepository)
const ofertaService = new OfertaService(ofertaCaronaRepository, usuarioRepository)
const solicitacaoService = new SolicitacaoService(usuarioRepository, solicitacaoRepository)
const corridaService = new CorridaService(corridaRepository, solicitacaoRepository)
const avaliacaoService = new AvaliacaoService(avaliacaoRepository, usuarioRepository)

const mostrarErro = (erro: Error) => console.log("erro: " + erro.message)

const emDias = (dias: number): Date => {
    const data = new Date()
    data.setDate(data.getDate() + dias)
    return data
}

const cpfPassageiroA = "111.111.111-11"
const cpfPassageiroB = "222.222.222-22"
const cpfPassageiroC = "333.333.333-33"
const cpfPassageiroD = "444.444.444-44"
const cpfMotoristaA = "555.555.555-55"
const cpfMotoristaB = "666.666.666-66"
const cpfMotoristaC = "777.777.777-77"

// cadastro de usuarios
await usuarioService.cadastrarUsuario(cpfPassageiroA, "Passageiro A", "82900000001", "2000-01-10", "passageiroa@email.com")
await usuarioService.cadastrarUsuario(cpfPassageiroB, "Passageiro B", "82900000002", "2001-02-11", "passageirob@email.com")
await usuarioService.cadastrarUsuario(cpfPassageiroC, "Passageiro C", "82900000003", "2002-03-12", "passageiroc@email.com")
await usuarioService.cadastrarUsuario(cpfPassageiroD, "Passageiro D", "82900000004", "2003-04-13", "passageirod@email.com")

await usuarioService.cadastrarUsuario(cpfMotoristaA, "Motorista A", "82911111111", "1990-05-14", "motoristaa@email.com")
await usuarioService.cadastrarUsuario(cpfMotoristaB, "Motorista B", "82922222222", "1988-06-15", "motoristab@email.com")
await usuarioService.cadastrarUsuario(cpfMotoristaC, "Motorista C", "82933333333", "1985-07-16", "motoristac@email.com")

// Busca de usuarios por cpf
console.log(await usuarioService.buscarPorCPF(cpfPassageiroA)) 
console.log(await usuarioService.buscarPorCPF(cpfMotoristaA)) 
console.log(await usuarioService.buscarPorCPF("000.000.000-00")) // retornará null
await usuarioService.buscarPorCPF("").catch(mostrarErro) // CPF vazio

console.log(await usuarioService.buscarPorEmail("passageirob@email.com")) // retornará passageiro B
console.log(await usuarioService.buscarPorEmail("naoexiste@email.com")) // retornará null
await usuarioService.buscarPorEmail("").catch(mostrarErro) // email vazio

// atualização de dados de uma usuario
await usuarioService.atualizarDados(cpfPassageiroC, { telefone: "82999999999", nome: "", email: undefined }) // só o telefone é válido
console.log(await usuarioService.buscarPorCPF(cpfPassageiroC)) // telefone atualizado
await usuarioService.atualizarDados(cpfPassageiroC, { nome: "", telefone: null }).catch(mostrarErro) // sem nenhum dado válido
await usuarioService.atualizarDados("", { nome: "X" }).catch(mostrarErro) // sem identificador

// Usuários: filtro por tipo
console.log(await usuarioService.filtrarPorTipo("motorista")) // retornará motoristas A, B e C
console.log(await usuarioService.filtrarPorTipo("passageiro")) // retornará passageiros A, B, C e D
await usuarioService.filtrarPorTipo("admin" as any).catch(mostrarErro) // tipo inválido

// Usuários: exclusão
await usuarioService.cadastrarUsuario("999.999.999-99", "Temporário", "82900000000", "1999-09-09", "temp@email.com")
await usuarioService.excluirUsuario("999.999.999-99")
console.log(await usuarioService.buscarPorCPF("999.999.999-99")) // retornará null

// Ofertas: criação
await ofertaService.criarOferta(3, "Maceió", "Marechal Deodoro", emDias(1), cpfMotoristaA, "ABC1D23") // Oferta A
await ofertaService.criarOferta(3, "Marechal Deodoro", "Maceió", emDias(2), cpfMotoristaB, "DEF4G56") // Oferta B 
await ofertaService.criarOferta(2, "Rio Largo", "Maceió", emDias(3), cpfMotoristaC, "HIJ7K89") // Oferta C

// Ofertas: criações inválidas
await ofertaService.criarOferta(0, "Maceió", "Marechal Deodoro", emDias(1), cpfMotoristaA, "ABC1D23").catch(mostrarErro) // zero vagas
await ofertaService.criarOferta(-2, "Maceió", "Marechal Deodoro", emDias(1), cpfMotoristaA, "ABC1D23").catch(mostrarErro) // vagas negativas
await ofertaService.criarOferta(2, "Maceió", "Marechal Deodoro", emDias(1), cpfMotoristaA, "").catch(mostrarErro) // sem placa
await ofertaService.criarOferta(2, "", "Marechal Deodoro", emDias(1), cpfMotoristaA, "ABC1D23").catch(mostrarErro) // sem origem

// Ofertas: consulta
const idOfertaA = 1
const idOfertaB = 2
const idOfertaC = 3

console.log(await ofertaService.buscarPorId(idOfertaA)) // retornará oferta A
console.log(await ofertaService.buscarPorId(idOfertaB)) // retornará oferta B
console.log(await ofertaService.buscarPorId(idOfertaC)) // retornará oferta C
console.log(await ofertaService.buscarPorId(9999)) // oferta inexistente

// Ofertas: atualização
await ofertaService.atualizarDados(idOfertaA, { destino: "Pontal da Barra", origem: "" }) // só o destino é válido
console.log(await ofertaService.buscarPorId(idOfertaA)) // destino atualizado
await ofertaService.atualizarDados(idOfertaA, { origem: "", destino: null }).catch(mostrarErro) // sem nenhum dado válido
await ofertaService.atualizarDados(0, { destino: "X" }).catch(mostrarErro) // sem identificador

// Ofertas: filtro
console.log(await ofertaService.filtroOfertas({ origem: "Maceió" }))
console.log(await ofertaService.filtroOfertas({ origem: "Marechal Deodoro", destino: "Maceió" }))

// Ofertas: exclusão
await ofertaService.excluirOferta(idOfertaC)
console.log(await ofertaService.buscarPorId(idOfertaC)) // oferta C excluída
await ofertaService.excluirOferta(0).catch(mostrarErro) // sem identificador

// Solicitações: cadastro (a assinatura atual não recebe o id da oferta)
await solicitacaoService.cadastrarSolicitacao(cpfPassageiroA, "07:30", idOfertaA) // oferta A, passageiro A
await solicitacaoService.cadastrarSolicitacao(cpfPassageiroB, "07:30", idOfertaA) // oferta A, passageiro B
await solicitacaoService.cadastrarSolicitacao(cpfPassageiroC, "07:30", idOfertaA) // oferta A, passageiro C
await solicitacaoService.cadastrarSolicitacao(cpfPassageiroD, "07:30", idOfertaA) // oferta A, passageiro D negado
await solicitacaoService.cadastrarSolicitacao(cpfPassageiroC, "18:00", idOfertaB) // oferta B, passageiro C
await solicitacaoService.cadastrarSolicitacao(cpfPassageiroB, "18:00", idOfertaB) // oferta B, passageiro B
await solicitacaoService.cadastrarSolicitacao(cpfPassageiroD, "18:00", idOfertaB) // oferta B, passageiro D
await solicitacaoService.cadastrarSolicitacao(cpfPassageiroA, "18:00", idOfertaB) // oferta B, passageiro A (esse daqui só pode ter 3 vagas)

// Solicitações: consulta e atualização
console.log(await solicitacaoService.buscarPorId(1)) // retornará solicitação do passageiro A
console.log(await solicitacaoService.buscarPorId(9999)) // solicitação inexistente

// atualização de dados da solicitacao
await solicitacaoService.atualizarDados(1, { horario: "08:00" })
console.log(await solicitacaoService.buscarPorId(1)) 

// Solicitações: respostas dos motoristas
await solicitacaoService.solicitacaoAceita(1) // oferta A, passageiro A
await solicitacaoService.solicitacaoAceita(2) // oferta A, passageiro B
await solicitacaoService.solicitacaoAceita(3) // oferta A, passageiro C
await solicitacaoService.solicitacaoNegada(4) // oferta A, passageiro D

await solicitacaoService.solicitacaoAceita(5) // oferta B, passageiro C
await solicitacaoService.solicitacaoAceita(6) // oferta B, passageiro B
await solicitacaoService.solicitacaoAceita(7) // oferta B, passageiro D
await solicitacaoService.solicitacaoAceita(8).catch(mostrarErro) // oferta B, passageiro A deve falhar pq as vagas da oferta ja foi lotada.

// excluindo solicitações
await solicitacaoService.excluirOferta(8)
console.log(await solicitacaoService.buscarPorId(8)) // solicitação 8 excluída

// Corridas
const idCorridaA = 1

await corridaService.criarCorrida("em andamento") // corrida da oferta A
console.log(await corridaService.buscarPorId(idCorridaA)) // retornará corrida A
await corridaService.buscarPorId(0).catch(mostrarErro) // sem identificador

console.log(await corridaService.ListarParticipantesCorrida(idCorridaA)) // retornará passageiros A, B e C

await corridaService.finalizarCorrida(idCorridaA)
console.log(await corridaService.buscarPorId(idCorridaA)) // corrida finalizada
