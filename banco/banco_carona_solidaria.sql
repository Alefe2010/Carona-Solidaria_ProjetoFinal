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
	idSolicitacao int auto_increment,
    situacao varchar(20) not null default "PENDENTE",
    check(situacao in("PENDENTE", "ACEITA", "NEGADA")),
    idOferta int not null,
    CPF char(11) not null,
    primary key(idSolicitacao),
    foreign key(idOferta) references oferta(idOferta),
    foreign key(CPF) references usuario(CPF)
)

