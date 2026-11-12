create schema testes_pbend;

create table testes_pbend.atendimentos(
 	id serial primary key,
	nome_pet varchar not null,
	raca varchar not null,
	idade int not null,
	nome_tutor varchar not null,
	dia_atendimento date not null,
	valor_gasto numeric(10,2) not null
);

insert into testes_pbend.atendimentos(nome_pet, raca, idade, nome_tutor, dia_atendimento, valor_gasto)
values 
('Mel', 'Shih-tzu', 4, 'Mariana Costa', '2026-09-06', 180),
('Thor', 'Golden Retriever', 8, 'Rafael Lima', '2026-09-02', 320);

select * from testes_pbend.atendimentos;