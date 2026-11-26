create database if not exists caronaSolidaria;
use caronaSolidaria;

create table usuario(
    CPF char(14) primary key,
    senha char(8) not null,
    telefone char(13) not null,
    email varchar(100) not null,
    data_nasc date not null,
    nome varchar(60) not null,
    cnh char(11) null
);

create table veiculo(
    placa char(8) primary key,
    qtd_acentos int not null,
    cor varchar(10) not null,
    modelo varchar(30) not null,
    CPF char(14) not null,
    foreign key(CPF) references usuario(CPF)
);

create table ofertaCarona(
    idOferta int auto_increment primary key,
    numeroVagas int not null,
    origem varchar(50) not null,
    destino varchar(50) not null,
    dataHorario datetime not null,
    placa char(8) not null,
    CPF char(14) not null,
    foreign key(placa) references veiculo(placa),
    foreign key(CPF) references usuario(CPF)
);

create table solicitacao(
    idSolicitacao int auto_increment primary key,
    situacao varchar(20) not null default 'PENDENTE',
    idOferta int not null,
    CPF char(14) not null,
    check(situacao in('PENDENTE', 'ACEITA', 'NEGADA')),
    foreign key(idOferta) references ofertaCarona(idOferta),
    foreign key(CPF) references usuario(CPF)
);

create table corrida(
    idCorrida int auto_increment primary key,
    data_hora_final datetime default null,
    situacao varchar(12) check (situacao in ('EM ANDAMENTO', 'FINALIZADA')),
    idOferta int not null,
    foreign key(idOferta) references ofertaCarona(idOferta)
);

create table pontoEncontro(
    idPonto_encontro int auto_increment primary key,
    bairro varchar(40) not null,
    rua varchar(40) not null,
    ponto_referencia varchar(40) not null
);

create table avaliacao(
    idAvaliacao int auto_increment primary key,
    comentario varchar(60) null,
    nota decimal(3, 2) not null,
    tipoAvaliador varchar(10) check(tipoAvaliador in ('PASSAGEIRO', 'MOTORISTA'))
);


INSERT INTO usuario (CPF, nome, telefone, data_nasc, email, senha, cnh) VALUES
('123.456.789-01', 'Lucas da Silva Gomes', '82 99123-4567', '1992-05-14', 'lucas.silva@gmail.com', '12345678', '01234567890'),
('234.567.890-12', 'Maria Gomes Souza', '82 98876-5432', '1954-11-13', 'mariana.costa@gmail.com', '12345678', '98765432109'),
('345.678.901-23', 'Alefe Matheus Souza', '82 99654-3210', '2001-02-09', 'pedro.santos@gmail.com', '12345678', NULL),
('456.789.012-34', 'Camila Ferreira Almeida', '82 98112-3344', '1995-08-30', 'camila.almeida@gmail.com', '12345678', '45612378901'),
('567.890.123-45', 'Rafael Augusto de Souza', '82 99334-5566', '1979-12-17', 'rafael.souza@gmail.com', '12345678', '78945612302'),
('124.466.129-45', 'Gian Silva', '82 99123-4567', '1991-12-14', 'gian.silva@gmail.com', '12345678', '11223344556'),
('155.717.910-64', 'Fabio Junio', '82 98876-5432', '1988-11-23', 'fabio.junio@gmail.com', '12345678', '22334455667'),
('122.958.901-23', 'Davi protasio', '82 91211-2210', '2001-02-09', 'davi.protasio@gmail.com', '12345678', NULL),
('164.654.634-34', 'Alefe Almeida', '82 98123-3364', '1967-08-20', 'alefe.almeida@gmail.com', '12345678', '01123542301'),
('764.453.145-45', 'Luiz Davi', '82 99465-5566', '2001-09-11', 'luiz.davi.bixo@gmail.com', '12345678', '56425612302');


INSERT INTO veiculo (placa, qtd_acentos, cor, modelo, CPF) VALUES
('AAA-5011', 5, 'Cinza', 'Honda Fit', '123.456.789-01'),
('MVG-5889', 5, 'Prata', 'Chevrolet Classic', '234.567.890-12'),
('KFS-1642', 7, 'Branca', 'Chevrolet Spin', '456.789.012-34'),
('PRO-7546', 5, 'Amarelo', 'Fiat uno', '567.890.123-45'),
('KWQ-6767', 21, 'Branco', 'Mercedes-Benz Sprinter', '124.466.129-45'),
('OPM-4931', 5, 'Branco', 'Chevrolet Cobalt', '155.717.910-64'),
('PLS-6452', 5, 'Preto', 'Chevrolet Blazer', '164.654.634-34'),
('PRQ-9834', 5, 'Prata', 'Fiat Mobi', '764.453.145-45'),
('PWP-9856', 7, 'Prata', 'Jeep Commander', '124.466.129-45'),
('POO-5643', 5, 'Branca', 'Chevrolet Vectra', '567.890.123-45');


INSERT INTO ofertaCarona (idOferta, numeroVagas, origem, destino, dataHorario, placa, CPF) VALUES
(1, 4, 'Maceió, Benedito Bentes', 'Marechal Deodoro, Centro', '2026-11-26 07:00:00', 'PRO-7546', '567.890.123-45'),
(2, 2, 'Maceió, Eustaquio Gomes', 'Marechal Deodoro, Barra Nova', '2026-11-24 14:00:00', 'OPM-4931', '155.717.910-64'),
(3, 1, 'Maceió, Centro', 'Maceió Jatiuca', '2026-11-25 05:00:00', 'AAA-5011', '123.456.789-01'),
(4, 3, 'Maceió, Pajucara', 'Arapiraca, Planalto', '2026-11-28 07:00:00', 'PLS-6452', '164.654.634-34'),
(5, 6, 'Maceió, Ponta Verde', 'Marechal Deodoro, Cajueiro', '2026-11-28 12:00:00', 'PWP-9856', '124.466.129-45'),
(6, 5, 'Arapiraca, Planalto', 'Marechal Deodoro, Frances', '2026-11-24 16:40:00', 'KWQ-6767', '124.466.129-45'),
(7, 3, 'Arapiraca, Centro', 'Marechal Deodoro, Barra Nova', '2026-10-26 10:30:00', 'MVG-5889', '234.567.890-12'),
(8, 1, 'Marechal Deodoro, Barra Nova', 'Marechal Deodoro, Frances', '2026-11-29 12:30:00', 'KFS-1642', '456.789.012-34'),
(9, 3, 'Marechal Deodoro, Barro Vermelho', 'Marechal Deodoro, Centro', '2026-12-01 19:45:00', 'POO-5643', '567.890.123-45'),
(10, 3, 'Maceió, Village Campestre 2', 'Marechal Deodoro, Cabreiras', '2026-11-30 07:34:00', 'PRQ-9834', '764.453.145-45');


INSERT INTO solicitacao (idSolicitacao, situacao, idOferta, CPF) VALUES
(1, 'PENDENTE', 1, '123.456.789-01'),
(2, 'PENDENTE', 2, '234.567.890-12'),
(3, 'PENDENTE', 3, '345.678.901-23'),
(4, 'PENDENTE', 4, '456.789.012-34'),
(5, 'PENDENTE', 5, '567.890.123-45'),
(6, 'PENDENTE', 6, '155.717.910-64'),
(7, 'PENDENTE', 7, '122.958.901-23'),
(8, 'PENDENTE', 8, '164.654.634-34'),
(9, 'PENDENTE', 9, '764.453.145-45'),
(10, 'PENDENTE', 10, '124.466.129-45');


INSERT INTO corrida (idCorrida, data_hora_final, situacao, idOferta) VALUES
(1, NULL, 'EM ANDAMENTO', 1),
(2, NULL, 'EM ANDAMENTO', 2),
(3, NULL, 'EM ANDAMENTO', 3),
(4, NULL, 'EM ANDAMENTO', 4),
(5, NULL, 'EM ANDAMENTO', 5),
(6, NULL, 'EM ANDAMENTO', 6),
(7, NULL, 'EM ANDAMENTO', 7),
(8, NULL, 'EM ANDAMENTO', 8),
(9, NULL, 'EM ANDAMENTO', 9),
(10, NULL, 'EM ANDAMENTO', 10);


INSERT INTO pontoEncontro (idPonto_encontro, bairro, rua, ponto_referencia) VALUES
(1, 'Jatiuca', 'Rua C', 'Super Mercado'),
(2, 'Benedito Bentes', 'Rua B', 'Farmarcia'),
(3, 'Centro', 'Rua A', 'Escola'),
(4, 'Ponta verde', 'Rua interna 26', 'Farmacia'),
(5, 'Eustaquio Gomes', 'Rua Interna', 'Escola'),
(6, 'Barra Nova', 'Rua Projetada', 'Hospital'),
(7, 'Barro Vermelho', 'Rua Edival Lemos', 'Supermercado'),
(8, 'Village Campestre 2', 'Rua sixseven', 'Ponto de Onibus'),
(9, 'Pajucara', 'Rua Getuliuo Vagas', 'Escola'),
(10, 'Planalto', 'Rua Direta', 'Escola');


INSERT INTO avaliacao (idAvaliacao, comentario, nota, tipoAvaliador) VALUES
(1, NULL, 1, 'PASSAGEIRO'),
(2, NULL, 3, 'PASSAGEIRO'),
(3, NULL, 1, 'PASSAGEIRO'),
(4, NULL, 4, 'PASSAGEIRO'),
(5, NULL, 3, 'PASSAGEIRO'),
(6, NULL, 2, 'MOTORISTA'),
(7, NULL, 5, 'MOTORISTA'),
(8, NULL, 5, 'MOTORISTA'),
(9, NULL, 4, 'MOTORISTA'),
(10, NULL, 1, 'MOTORISTA');
