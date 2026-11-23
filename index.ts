import {OfertaService} from "./src/services/OfertaService.ts"
import {CorridaService} from "./src/services/CorridaService.ts"
import {AvaliacaoService} from "./src/services/AvaliacaoService.ts"
import {SolicitacaoService} from "./src/services/SolicitacaoService.ts"
import {UsuarioService} from "./src/repositories/UsuarioService.ts"

import {AvaliacaoRepository} from "./src/repositories/AvaliacaoRepository.ts"
import {OfertaCaronaRepository} from "./src/repositories/OfertaRepository.ts"
import {SolicitacaoRepository} from "./src/repositories/SolicitacaoRepository.ts"
import {UsuarioRepository} from "./src/repositories/UsuarioRepository.ts"
import {CorridaRepository} from "./src/repositories/CorridaRepository.ts"


const avaliacaoRepository: AvaliacaoRepository = new AvaliacaoRepository()
const ofertaCaronaRepository: OfertaCaronaRepository = new OfertaCaronaRepository()
const solicitacaoRepository: SolicitacaoRepository = new SolicitacaoRepository()
const usuarioRepository: UsuarioRepository = new UsuarioRepository()
const corridaRepository: CorridaRepository = new CorridaRepository()

const ofertaService: OfertaService = new OfertaService(ofertaCaronaRepository, usuarioRepository)

const corridaService: CorridaService = new CorridaService(corridaRepository, solicitacaoRepository)

const solicitacaoService: SolicitacaoService= new SolicitacaoService(usuarioRepository,solicitacaoRepository)

const usuarioService: UsuarioService = new UsuarioService(usuarioRepository)


usuarioService.cadastrarUsuario() // Passageiro A
usuarioService.cadastrarUsuario() // Passageiro B
usuarioService.cadastrarUsuario() // Passageiro C
usuarioService.cadastrarUsuario() // Passageiro D

usuarioService.cadastrarUsuario() // Motorista A
usuarioService.cadastrarUsuario() // Motorista B
usuarioService.cadastrarUsuario() // Motorista C



const passageiroA = usuarioService.buscarPorId()
const passageiroB = usuarioService.buscarPorId()
const passageiroC = usuarioService.buscarPorId()
const passageiroD = usuarioService.buscarPorId()

const motoristaA = usuarioService.buscarPorId()
const motoristaB = usuarioService.buscarPorId()
const motoristaC = usuarioService.buscarPorId()

ofertaService.criarOferta() // Oferta A
ofertaService.criarOferta() // Oferta B
ofertaService.criarOferta() // Oferta C


const ofertaCaronaA = ofertaService.buscarPorId()
const ofertaCaronaB = ofertaService.buscarPorId()
const ofertaCaronaC = ofertaService.buscarPorId() // colocar algo invalido


solicitacaoService.cadastrarSolicitacao() // oferta A, passageiro A
solicitacaoService.cadastrarSolicitacao() // oferta A, passageiro B
solicitacaoService.cadastrarSolicitacao() // oferta A, passageiro C
solicitacaoService.cadastrarSolicitacao() // oferta B, passageiro C
solicitacaoService.cadastrarSolicitacao() // oferta B, passageiro B
solicitacaoService.cadastrarSolicitacao() // oferta B, passageiro D
solicitacaoService.cadastrarSolicitacao() //  oferta B, passageiro A (esse daqui so pode ter 3 vagas)
solicitacaoService.cadastrarSolicitacao()
solicitacaoService.cadastrarSolicitacao()
