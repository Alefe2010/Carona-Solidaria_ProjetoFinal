drop database caronaSolidaria;
create database caronaSolidaria;
use caronaSolidaria;

create table usuario(
	CPF char(14)  primary key,
	telefone char(13) not null,
	email varchar(100) not null,
	data_nasc date not null,
	nome varchar(60) not null,
    CNH char(11) null
);

create table veiculo(
    placa char(8) primary key,
    qtd_acentos varchar(2) not null,
    cor varchar(10) not null,
    modelo varchar(30) not null
 );


create table ofertaCarona(
	idOferta int auto_increment primary key,
    numeroVagas int not null,
    origem varchar(50) not null,
    destino varchar(50) not null,
    dataHorario datetime not null,
    placa char(8) not null,
    foreign key(placa) references veiculo(placa)
);

create table solicitacao(
	idSolicitacao int auto_increment primary key,
    situacao varchar(20) not null default "PENDENTE",
    check(situacao in("PENDENTE", "ACEITA", "NEGADA")),
    idOferta int not null,
    CPF char(14) not null,
    foreign key(idOferta) references ofertaCarona(idOferta),
    foreign key(CPF) references usuario(CPF)
);


create table corrida(
	idCorrida int primary key,
    data_hora_final datetime default null,
    situacao varchar(12) check (situacao in ("EM ANDAMENTO", "FINALIZADA"))
);

create table pontoEncontro(
	idPonto_encontro int primary key,
	bairro varchar(40) not null,
	rua varchar(40) not null,
	ponto_referencia varchar(40) not null
 );

create table avaliacao(
    idAvaliacao int auto_increment primary key,
    comentario varchar(60) null,
    nota decimal(3, 2) not null,
    tipoAvaliador varchar(10) check(tipoAvaliador in ("PASSAGEIRO", "MOTORISTA"))
);


INSERT INTO usuario (CPF, telefone, email, data_nasc, nome, CNH) VALUES
('123.456.789-01', '82 99123-4567', 'lucas.silva@email.com', '1992-05-14', 'Lucas da Silva Gomes', '01234567890'),
('234.567.890-12', '82 98876-5432', 'mariana.costa@email.com', '1954-11-13', 'Maria Gomes Souza', '98765432109'),
('345.678.901-23', '82 99654-3210', 'pedro.santos@email.com', '2001-02-09', 'Alefe Matheus Souza ', NULL),
('456.789.012-34', '82 98112-3344', 'camila.almeida@email.com', '1995-08-30', 'Camila Ferreira Almeida', '45612378901'),
('567.890.123-45', '82 99334-5566', 'rafael.souza@email.com', '1979-12-17', 'Rafael Augusto de Souza', '78945612302'),
('124.466.129-45', '82 99123-4567', 'gian.silva@email.com', '1991-12-14', 'Gian Silva', '01234567890'),
('155.717.910-64', '82 98876-5432', 'fabio.junio@email.com', '1988-11-23', 'Fabio Junio', '98765432109'),
('122.958.901-23', '82 91211-2210', 'davi.protasio@email.com', '2001-02-09', 'Davi protasio', NULL),
('164.654.634-34', '82 98123-3364', 'alefe.almeida@email.com', '1967-08-20', 'Alefe Almeida', '1123542301'),
('764.453.145-45', '82 99465-5566', 'luiz.davi.bixo@email.com', '2001-09-11', 'Luiz Davi', '56425612302');



INSERT INTO veiculo(placa, qtd_acentos, cor, modelo) VALUES	
('AAA-5011', 5, 'Cinza', 'Honda Fit'),
('MVG-5889', 5, 'Prata', 'Chevrolet Classic'),
('KFS-1642', 7, 'Branca', 'Chevrolet Spin'),
('PRO-7546', 5, 'Amarelo', 'Fiat uno'),
('KWQ-6767', 21, 'Branco', 'Mercedes-Benz Sprinter'),
('OPM-4931', 5, 'Branco', 'Chevrolet Cobalt'),
('PLS-6452', 5, 'Preto', 'Chevrolet Blazer'),
('PRQ-9834', 5, 'Prata', 'Fiat Mobi'),
('PWP-9856', 7, 'Prata', 'Jeep Commander'),
('POO-5643', 5, 'Branca', 'Chevrolet Vectra');

INSERT INTO ofertaCarona (idOferta, numeroVagas, origem, destino, dataHorario, placa) VALUES
(1, 4, 'Maceió, Benedito Bentes', 'Marechal Deodoro, Centro', '2026-11-26 07:00:00', 'PRO-7546'),
(2, 2, 'Maceió, Eustaquio Gomes', 'Marechal Deodoro, Barra Nova', '2026-11-24 14:00:00', 'OPM-4931'),
(3, 1, 'Maceió, Centro',  'Maceió Jatiuca', '2026-11-25 05:00:00', 'AAA-5011'),
(4, 3, 'Maceió, Pajucara', 'Arapiraca, Planalto', '2026-11-28 07:00:00', 'PLS-6452'),
(5, 6, 'Maceió, Ponta Verde', 'Marechal Deodoro, Cajueiro', '2026-11-28 12:00:00', 'PWP-9856'),
(6, 5, 'Arapiraca, Planalto', 'Marechal Deodoro, Frances', '2026-11-24 16:40:00', 'KWQ-6767'),
(7, 3, 'Arapiraca, Centro', 'Marechal Deodoro, Barra Nova', '2026-10-26 10:30:00', 'MVG-5889'),
(8, 1, 'Marechal Deodoro, Barra Nova', 'Marechal Deodoro, Frances', '2026-11-29 12:30:00', 'KFS-1642'),
(9, 3, 'Marechal Deodoro, Barro Vermelho', 'Marechal Deodoro, Centro', '2026-12-01 19:45:00', 'POO-5643'),
(10, 3, 'Maceió, Village Campestre 2', 'Marechal Deodoro, Cabreiras', '2026-11-30 07:34:00', 'PRQ-9834');


INSERT INTO solicitacao (idSolicitacao, situacao, idOferta, CPF) VALUES
(1, "PENDENTE", 1, '123.456.789-01'), 
(2, "PENDENTE", 2, '234.567.890-12'), 
(3, "PENDENTE", 3, '345.678.901-23'), 
(4, "PENDENTE", 4, '456.789.012-34'), 
(5, "PENDENTE", 5, '567.890.123-45'), 
(6, "PENDENTE", 6, '155.717.910-64'), 
(7, "PENDENTE", 7, '122.958.901-23'), 
(8, "PENDENTE", 8, '164.654.634-34'), 
(9, "PENDENTE", 9, '764.453.145-45'), 
(10, "PENDENTE", 10, '124.466.129-45');

INSERT INTO corrida(idCorrida, data_hora_final ,situacao) VALUES
(1, NULL, "EM ANDAMENTO"),
(2, NULL, "EM ANDAMENTO"), 
(3, NULL, "EM ANDAMENTO"), 
(4, NULL, "EM ANDAMENTO"), 
(5, NULL, "EM ANDAMENTO"), 
(6, NULL, "EM ANDAMENTO"), 
(7, NULL, "EM ANDAMENTO"), 
(8, NULL, "EM ANDAMENTO"), 
(9, NULL, "EM ANDAMENTO"), 
(10, NULL, "EM ANDAMENTO");

INSERT INTO pontoEncontro(idPonto_encontro, bairro, rua, ponto_referencia) VALUES
(1, "Jatiuca", "Rua C","Super Mercado"),
(2, "Benedito Bentes", "Rua B", "Farmarcia"), 
(3, "Centro", "Rua A","Escola"), 
(4, "Ponta verde", "Rua interna 26","Farmacia"), 
(5, "Eustaquio Gomes", "Rua Interna","Escola"), 
(6, "Barra Nova", "Rua Projetada","Hospital"), 
(7, "Barro Vermelho", "Rua Edival Lemos","Supermercado"), 
(8, "Village Campestre 2", "Rua sixseven","Ponto de Onibus"), 
(9, "Pajucara", "Rua Getuliuo Vagas","Escola"), 
(10, "Planalto", "Rua Direta","Escola");


INSERT INTO avaliacao(idAvaliacao, comentario, nota, tipoAvaliador) VALUES
(1, null, 1, "PASSAGEIRO"),
(2, null, 3, "PASSAGEIRO"),
(3, null, 1, "PASSAGEIRO"),
(4, null, 4, "PASSAGEIRO"),
(5, null, 3, "PASSAGEIRO"),
(6, null, 2, "MOTORISTA"),
(7, null, 5, "MOTORISTA"),
(8, null, 5, "MOTORISTA"),
(9, null, 4, "MOTORISTA"),
(10, null, 1, "MOTORISTA");
