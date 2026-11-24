create database if not exists caronaSolidaria;
use caronaSolidaria;

create table usuario(
	CPF char(14) constraint primary key,
	telefone char(13) constraint,
	email varchar(100) constraint,
	data_nasc date not null,
	nome varchar(60) not null,
    CNH char(11) null,
);

create table veiculo(
    placa char(7) primary key,
    qtd_acentos varchar(2) not null,
    cor varchar(10) not null,
    modelo varchar(10) not null
 );


create table ofertaCarona(
	idOferta int auto_increment primary key,
    numeroVagas int not null,
    origem varchar(50) not null,
    destino varchar(50) not null,
    dataHorario datetime not null,
    placa char(7) not null,
    foreign key(placa) references veiculo(placa)
);

create table solicitacao(
	idSolicitacao int auto_increment primary key,
    situacao varchar(20) not null default "PENDENTE",
    check(situacao in("PENDENTE", "ACEITA", "NEGADA")),
    idOferta int not null,
    CPF char(11) not null,
    foreign key(idOferta) references ofertaCarona(idOferta),
    foreign key(CPF) references usuario(CPF)
);

create table corrida(
	idCorrida int primary key,
    data_hora_final datetime default null,
    situacao varchar(10) check (situacao in ("EM ANDAMENTO", "FINALIZADA"))
);

create table PontoEncontro(
	idPonto_encontro int primary key,
	bairro varchar(40) not null,
	rua varchar(40) not null,
	ponto_referencia varchar(40) not null
 );

create table avaliacao(
    idAvaliacao int auto_increment primary key,
    comentário varchar(60) null,
    nota decimal(3, 2) not null,
    tipoAvaliador varchar(10) check(tipoAvaliador in ("PASSAGEIRO", "MOTORISTA"))
);
