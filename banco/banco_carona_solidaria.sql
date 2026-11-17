create database caronaSolidaria;
use caronaSolidaria;

create table usuario(
	CPF char(11),
	telefone char(13),
	email varchar(100),
	data_nasc date,
	nome varchar(60),
	primary key(CPF)
);

create table solicitacao(
	idSolicitacao int auto_increment primary key,
    situacao varchar(20) not null default "PENDENTE",
    check(situacao in("PENDENTE", "ACEITA", "NEGADA")),
    idOferta int not null,
    CPF char(11) not null,
    foreign key(idOferta) references oferta(idOferta),
    foreign key(CPF) references usuario(CPF)
);

create table corrida(
	idCorrida int primary key,
    data_hora_final datetime default null,
    situacao varchar(10) check (situacao in ("EM ANDAMENTO", "FINALIZADA"))
);

create table ofertaCarona(
	idOferta int primary key,
    numeroVagas int not null,
    origem varchar(50) not null,
    destino varchar(50) not null,
    placa char(7) not null,
    foreign key(placa) references veiculo
);
	
    
    