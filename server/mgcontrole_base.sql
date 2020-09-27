PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "info" (
	"id"	INTEGER NOT NULL,
	"nome"	TEXT,
	"doc"	TEXT,
	"endereco"	TEXT,
	"bairro"	TEXT,
	"cep"	TEXT,
	"municipio"	TEXT,
	"tel"	TEXT,
	"uf"	INTEGER,
	"pais"	TEXT,
	"indicador_ie"	TEXT,
	"ie"	TEXT,
	"suframa"	TEXT,
	"im"	TEXT,
	"email"	TEXT,
	PRIMARY KEY("id")
);
INSERT INTO info VALUES(1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
CREATE TABLE IF NOT EXISTS "clientes" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"nome"	char(50),
	"tipo"	char(15),
	"doc"	char(25),
	"contato"	char(30),
	"fone"	char(100),
	"fone2"	TEXT,
	"email"	char(100),
	"endereco"	TEXT,
	"cep"	TEXT,
	"obs"	text,
	"timestamp"	TEXT
);
INSERT INTO clientes VALUES(1,'indefinido',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO clientes VALUES(32,'marcelo magalhaes',NULL,'04305075776','maga',NULL,NULL,'maga@magaweb.com.br',NULL,NULL,NULL,NULL);
CREATE TABLE IF NOT EXISTS "funcionarios" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"nome"	TEXT,
	"funcao"	TEXT,
	"doc"	TEXT,
	"contato"	TEXT,
	"fone"	TEXT,
	"fone2"	TEXT,
	"email"	TEXT,
	"endereco"	TEXT,
	"cep"	TEXT,
	"obs"	text,
	"timestamp"	TEXT
);
CREATE TABLE IF NOT EXISTS "fornecedores" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"timestamp"	TEXT,
	"razao_social"	TEXT,
	"nome_fantasia"	TEXT,
	"tipo"	char(15),
	"doc"	char(25),
	"contato"	char(30),
	"fone"	char(100),
	"fone2"	TEXT,
	"email"	char(100),
	"endereco"	TEXT,
	"cep"	TEXT,
	"obs"	text
);
CREATE TABLE IF NOT EXISTS "financeiro_operacoes" (
	"id"	INTEGER NOT NULL,
	"pid"	INTEGER,
	"origem_tabela"	TEXT,
	"origem_tabela_id"	INTEGER,
	"destino_tabela"	TEXT,
	"destino_tabela_id"	INTEGER,
	"valor"	NUMERIC,
	"created"	TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "user" (
	"id"	INTEGER,
	"username"	CHAR(15),
	"password"	CHAR(15),
	"token"	CHAR(20),
	"roles"	CHAR(200),
	"name"	CHAR(200),
	"introduction"	CHAR(100),
	"avatar"	CHAR(200),
	"disabled"	CHAR(1),
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO user VALUES(1,'admin','12345','loro.admin-token','admin','admin','proprietário','https://img2.gratispng.com/20180502/puq/kisspng-avatar-computer-icons-5aea6b3a8fcdf1.5987915715253123145891.jpg',NULL);
INSERT INTO user VALUES(2,'maria','12345','loro.admin-token','admin','Maria','gerente','http://carismartes.com.br/assets/global/images/avatars/avatar1@2x.png',NULL);
INSERT INTO user VALUES(3,'sara','12345','loro.admin-token','admin','Sara','caixa','http://carismartes.com.br/assets/global/images/avatars/avatar1@2x.png',NULL);
INSERT INTO user VALUES(4,'loro','12345','loro.admin-token','admin','Loro','admin','http://carismartes.com.br/assets/global/images/avatars/avatar1@2x.png',NULL);
CREATE TABLE IF NOT EXISTS "produtos" (
	"id"	INTEGER,
	"ean"	CHAR(20) UNIQUE,
	"descricao"	CHAR(230),
	"pco_custo"	integer,
	"pco_venda"	integer,
	"unidade"	CHAR(15),
	"estoque"	integer,
	"timestamp"	TEXT,
	"img_mini"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO produtos VALUES(5369,'','maça',0,6.5,'kg','','0','https://superprix.vteximg.com.br/arquivos/ids/175190-70-70');
INSERT INTO produtos VALUES(5370,'102','banana terra',0,7,'duzia',NULL,'0','https://images.rappi.com.br/products/2092542098-1585347335350.png?d=40x40');
INSERT INTO produtos VALUES(5371,'103','repolho',0,3,'kg',NULL,NULL,'https://superprix.vteximg.com.br/arquivos/ids/175169-80-80');
INSERT INTO produtos VALUES(5372,'104','tomate',0,4,'kg',NULL,'946692000000.0','https://superprix.vteximg.com.br/arquivos/ids/178639-70-70');
INSERT INTO produtos VALUES(5373,'1051','cebola',0,4.5,'kg',NULL,'0','https://superprix.vteximg.com.br/arquivos/ids/175191-80-80');
INSERT INTO produtos VALUES(5374,'1050','pimentao',0,4.5,'kg',NULL,NULL,'https://superprix.vteximg.com.br/arquivos/ids/175176-70-70');
INSERT INTO produtos VALUES(5375,'1049','alho',0,22,'kg',NULL,'946692000000.0','https://hortapurper.com.br/wp-content/uploads/2019/02/alho.png');
INSERT INTO produtos VALUES(5377,'1047','cenoura',0,3.8999999999999999111,'kg',NULL,NULL,'https://superprix.vteximg.com.br/arquivos/ids/175193-80-80');
INSERT INTO produtos VALUES(5378,'1046','batatinha',0,3.5,'kg',NULL,NULL,'https://superprix.vteximg.com.br/arquivos/ids/178620-80-80');
INSERT INTO produtos VALUES(5379,'1045','chuchu',0,2,'kg',NULL,'946692000000.0','https://superprix.vteximg.com.br/arquivos/ids/175192-80-80');
INSERT INTO produtos VALUES(5380,'1044','gengibre',0,7,'kg',NULL,'0',NULL);
INSERT INTO produtos VALUES(5381,'1043','inhame',0,5,'kg',NULL,'0',NULL);
INSERT INTO produtos VALUES(5382,'1042','berinjela',0,4.5,'kg',NULL,'0',NULL);
INSERT INTO produtos VALUES(5383,'1041','abobrinha',0,3.5,'kg',NULL,'0',NULL);
INSERT INTO produtos VALUES(5384,'1040','pepino',0,4.5,'kg',NULL,'0','https://superprix.vteximg.com.br/arquivos/ids/175184-80-80');
INSERT INTO produtos VALUES(5385,'1038','banana prata',0,3,'duzia',NULL,'946692000000.0','https://superprix.vteximg.com.br/arquivos/ids/178630-80-80');
INSERT INTO produtos VALUES(5386,'1037','abobora japonesa',0,3.5,'kg',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5387,'1036','maracujá',0,6,'kg',NULL,'0','https://superprix.vteximg.com.br/arquivos/ids/175187-80-80');
INSERT INTO produtos VALUES(5388,'1035','laranja',0,3.2000000000000001776,'kg',NULL,NULL,'https://superprix.vteximg.com.br/arquivos/ids/175265-70-70');
INSERT INTO produtos VALUES(5389,'1034','manga',0,4.9900000000000002131,'kg',NULL,'946692000000.0','https://superprix.vteximg.com.br/arquivos/ids/175174-70-70');
INSERT INTO produtos VALUES(5390,'1033','pera',0,10,'kg',NULL,'946692000000.0','https://superprix.vteximg.com.br/arquivos/ids/175213-80-80');
INSERT INTO produtos VALUES(5391,'1032','limao',0,6.5,'kg',NULL,NULL,'https://superprix.vteximg.com.br/arquivos/ids/175178-90-90');
INSERT INTO produtos VALUES(5392,'1031','mamão papaia',0,5,'kg',NULL,NULL,'https://superprix.vteximg.com.br/arquivos/ids/178949-80-80');
INSERT INTO produtos VALUES(5393,'1030','goiaba',0,4.5,'kg',NULL,'0',NULL);
INSERT INTO produtos VALUES(5394,'1029','uva nubia',0,12,'kg',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5395,'1028','tangerina',0,6,'kg',NULL,'0',NULL);
INSERT INTO produtos VALUES(5396,'1027','banana nanica',0,4.5,'kg',NULL,'0','https://superprix.vteximg.com.br/arquivos/ids/175200-80-80');
INSERT INTO produtos VALUES(5397,'1026','abacaxi',0,5,'uni',NULL,'0','https://superprix.vteximg.com.br/arquivos/ids/175201-80-80');
INSERT INTO produtos VALUES(5398,'1025','melancia media',0,15,'uni',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5399,'1024','melancia grande',0,18,'uni',NULL,'0','https://superprix.vteximg.com.br/arquivos/ids/167793-80-80');
INSERT INTO produtos VALUES(5400,'1023','morango',0,7,'bandeija',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5401,'1022','aipim com casca',0,4,'kg',NULL,'0',NULL);
INSERT INTO produtos VALUES(5402,'1021','aipim sem casca',0,5,'kg',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5403,'1020','beterraba',0,4,'kg',NULL,'946692000000.0','https://superprix.vteximg.com.br/arquivos/ids/182508-80-80');
INSERT INTO produtos VALUES(5404,'1019','milho verde',0,1.5,'uni',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5405,'1018','ovos cartela',0,11,'uni',NULL,'0',NULL);
INSERT INTO produtos VALUES(5406,'1017','ovos duzia',0,5,'duzia',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5407,'1016','alface crespa',0,3,'uni',NULL,'0','https://superprix.vteximg.com.br/arquivos/ids/178850-80-80/');
INSERT INTO produtos VALUES(5408,'1015','coentro',0,3,'uni',NULL,'0','https://superprix.vteximg.com.br/arquivos/ids/178903-90-90');
INSERT INTO produtos VALUES(5409,'1014','cebolinha ',0,3,'uni',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5410,'1013','couve',0,3,'uni',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5411,'1012','salsa',0,3,'uni',NULL,'0','https://superprix.vteximg.com.br/arquivos/ids/179003-80-80');
INSERT INTO produtos VALUES(5412,'1011','brocolis japoneis',0,6,'uni',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5413,'1010','brocolis nacional',0,3,'uni',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5414,'1009','rucula',0,3,'uni',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5415,'1008','hortelan',0,3,'uni',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5416,'1007','manjericao',0,3,'uni',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5417,'1006','dende',0,3,'uni',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5418,'1005','quiabo',0,10,'kg',NULL,NULL,'https://superprix.vteximg.com.br/arquivos/ids/175272-80-80');
INSERT INTO produtos VALUES(5419,'1004','laranja o cento',0,55,'100',NULL,'0',NULL);
INSERT INTO produtos VALUES(5420,'1003','melão',0,7,'uni',NULL,'0','https://superprix.vteximg.com.br/arquivos/ids/175175-80-80');
INSERT INTO produtos VALUES(5421,'1002','amendoin',9,10,'kg',11,'0',NULL);
INSERT INTO produtos VALUES(5429,NULL,'diversos',0,1,'un',NULL,'1594669331274.0',NULL);
INSERT INTO produtos VALUES(5430,NULL,'abacate',0,5,'kg',NULL,NULL,'https://superprix.vteximg.com.br/arquivos/ids/175198-80-80');
INSERT INTO produtos VALUES(5431,NULL,'pimenta de cheiro',0,30,'kg',NULL,'1596194527268.0','https://i1.wp.com/www.mercadoaju.com/wp-content/uploads/2020/09/2021700000990.png?resize=300%2C300&ssl=1');
INSERT INTO produtos VALUES(5432,NULL,'carvao',0,5,NULL,NULL,'2020-08-01T22:08:07.693Z',NULL);
INSERT INTO produtos VALUES(5433,'oleo soja liza','oleo soja liza',0,5.5,'uni',20,'1596324204734.0',NULL);
INSERT INTO produtos VALUES(5434,NULL,'molho tomate bonare tradicional',0,2.5,'uni',24,'2020-08-01T23:25:39.909Z',NULL);
INSERT INTO produtos VALUES(5435,NULL,'queijo ralado bela vista',0,3.5,'uni',20,'2020-08-01T23:28:49.819Z',NULL);
INSERT INTO produtos VALUES(5436,NULL,'sabao pintado teu',0,3.5,'uni',20,'2020-08-01T23:30:11.403Z',NULL);
INSERT INTO produtos VALUES(5437,NULL,'agua tanitaria teu ',0,3.5,'uni',12,'1596324785176.0',NULL);
INSERT INTO produtos VALUES(5438,NULL,'açuca',0,4,'uni',30,'2020-08-01T23:34:21.267Z',NULL);
INSERT INTO produtos VALUES(5439,NULL,'margarina deline 500g',0,5.5,'uni',24,'2020-08-01T23:36:12.762Z',NULL);
INSERT INTO produtos VALUES(5440,NULL,'vinagre',0,3,'uni',12,'2020-08-01T23:37:10.355Z',NULL);
INSERT INTO produtos VALUES(5441,'7898902334339','feijao padim',0,7.5,'uni',20,'1596325243703.0',NULL);
INSERT INTO produtos VALUES(5442,'7896307601339','arroz caçarola',0,4.5,'uni',30,'1596325319953.0',NULL);
INSERT INTO produtos VALUES(5443,NULL,'macarao espaquete',0,4,'uni',20,'2020-08-01T23:42:53.537Z',NULL);
INSERT INTO produtos VALUES(5444,NULL,'molho de tomate com manjericao',0,3,'uni',24,'2020-08-01T23:44:43.568Z',NULL);
INSERT INTO produtos VALUES(5445,NULL,'sabao em po ala 500g',0,4,'uni',27,'2020-08-01T23:46:13.928Z',NULL);
INSERT INTO produtos VALUES(5446,NULL,'desinfetantezab talco',0,4,'uni',12,'2020-08-01T23:47:27.112Z',NULL);
INSERT INTO produtos VALUES(5447,NULL,'detegente teu coco',0,3,'uni',24,'2020-08-01T23:48:46.904Z',NULL);
INSERT INTO produtos VALUES(5448,NULL,'azeite de dende da anna',0,4,'uni',24,'2020-08-01T23:50:06.447Z',NULL);
INSERT INTO produtos VALUES(5449,NULL,'leite de coco nodeste',0,4,'uni',24,'2020-08-01T23:51:24.192Z',NULL);
INSERT INTO produtos VALUES(5450,NULL,'sabao rio bahia azul ',0,3,'uni',50,'2020-08-01T23:52:17.375Z',NULL);
INSERT INTO produtos VALUES(5451,NULL,'biscoito recheado baldocochocolate',0,2.5,'uni',56,'2020-08-01T23:53:42.646Z',NULL);
INSERT INTO produtos VALUES(5452,NULL,'biscoito recheado  morango',0,2.5,'uni',56,'2020-08-01T23:55:09.751Z',NULL);
INSERT INTO produtos VALUES(5453,NULL,'biscoito marilan  sal',0,4.5,'uni',20,'2020-08-01T23:55:58.304Z',NULL);
INSERT INTO produtos VALUES(5454,NULL,'biscoito maizena',0,6,'uni',24,'2020-08-01T23:57:42.121Z',NULL);
INSERT INTO produtos VALUES(5456,NULL,'lan de aco asolan',0,4,'uni',10,'2020-08-01T23:59:56.449Z',NULL);
INSERT INTO produtos VALUES(5457,NULL,'minlhoje garinha caipira',0,2,'uni',50,'2020-08-02T00:01:11.107Z',NULL);
INSERT INTO produtos VALUES(5458,NULL,'minhoje carne',0,2,'uni',50,'2020-08-02T00:02:51.642Z',NULL);
INSERT INTO produtos VALUES(5459,'7896005801512','café 3 corações extra-forte',4.1500000000000003552,6,'uni',15,'946692000000.0',NULL);
INSERT INTO produtos VALUES(5460,NULL,'coco verde',0,2,NULL,NULL,'0','https://cdn.shopify.com/s/files/1/0946/5368/products/35424D_300x.png?v=1442866214');
INSERT INTO produtos VALUES(5462,NULL,'farinha',0,3,'litro',NULL,'1596832921327.0',NULL);
INSERT INTO produtos VALUES(5463,NULL,'pão',0,0.5,'uni',NULL,'2020-08-15T14:15:45.323Z',NULL);
INSERT INTO produtos VALUES(5465,NULL,'detegente teu tradicional',0,2.5,'uni',NULL,NULL,NULL);
INSERT INTO produtos VALUES(5468,NULL,'uva caixa',0,10,NULL,NULL,'1598736375689.0','/assets/img/produtos/uvacaixa.png');
INSERT INTO produtos VALUES(5470,NULL,'kiwi',0,18,NULL,NULL,'946692000000.0','https://lh3.googleusercontent.com/proxy/6oc8hNMDAoy1b6Eznn4DxhSlweR8q2M5WkijKZJGoSAPtlJVIIStKjOW0vPrCojV9PLUtClnf5uAhK-tEO1bPzXeQEjuy7PN3HngKz9fPcvdbk_2iwqw5FHyPuL5aG-ZndAmyEEryEkjFL9Id5qvxkW0WVY');
INSERT INTO produtos VALUES(5471,NULL,'uva sem semente',0,14,NULL,NULL,'946692000000.0','https://static.wixstatic.com/media/a3282e_0e5f3f15c21d4c36bb18d050abe0b447~mv2.png/v1/fill/w_270,h_183,al_c,lg_1,q_90/a3282e_0e5f3f15c21d4c36bb18d050abe0b447~mv2.webp');
INSERT INTO produtos VALUES(5472,NULL,'mel',0,15,NULL,NULL,'2020-09-03T21:07:29.137Z',NULL);
INSERT INTO produtos VALUES(5473,NULL,'limao siciliano',0,16,NULL,NULL,'1599169854866.0','/assets/img/produtos/limaociciliano.png');
INSERT INTO produtos VALUES(5474,NULL,'repolho roxo',0,3.5,'kg',NULL,'1599596654143.0','/assets/img/produtos/repolhoroxo.png');
INSERT INTO produtos VALUES(5475,NULL,'couve flor',0,8,NULL,NULL,'1599662477370.0','/assets/img/produtos/couveflor.png');
INSERT INTO produtos VALUES(5476,NULL,'ovos caixa',0,144,'uni',NULL,'2020-09-15T12:40:14.137Z',NULL);
INSERT INTO produtos VALUES(5477,NULL,'mamão cx',0,35,'cx',NULL,'2020-09-17T19:25:29.694Z',NULL);
INSERT INTO produtos VALUES(5478,NULL,'alecrim',0,4,'uni',NULL,'2020-09-24T15:09:42.991Z',NULL);
CREATE TABLE IF NOT EXISTS "caixa_status" (
	"id"	INTEGER NOT NULL,
	"created"	NUMERIC,
	"token"	TEXT,
	"session"	TEXT,
	"status"	INTEGER,
	"op"	TEXT,
	"value"	NUMERIC,
	"obs"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "vendas" (
	"id"	INTEGER,
	"session"	TEXT,
	"cliente"	INTEGER,
	"itens"	TEXT,
	"subtotal"	NUMERIC,
	"desconto"	NUMERIC,
	"acrescimo"	NUMERIC,
	"total"	NUMERIC,
	"pagamento"	TEXT,
	"created"	TEXT DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "faturados" (
	"id"	INTEGER,
	"venda_id"	INTEGER,
	"created"	NUMERIC,
	"cliente"	INTEGER,
	"tipo"	INTEGER,
	"valor"	NUMERIC,
	PRIMARY KEY("id" AUTOINCREMENT)
);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('clientes',141);
INSERT INTO sqlite_sequence VALUES('funcionarios',3);
INSERT INTO sqlite_sequence VALUES('fornecedores',24);
INSERT INTO sqlite_sequence VALUES('user',4);
INSERT INTO sqlite_sequence VALUES('produtos',5478);
INSERT INTO sqlite_sequence VALUES('vendas',2191);
INSERT INTO sqlite_sequence VALUES('faturados',400);
CREATE VIEW caixa_status_totais
AS
select session, op, sum(value) from caixa_status;
CREATE VIEW f_clientes_faturados
AS
select fo.pid, fo.created, 
  fo.origem_tabela_id cliente_id, c.nome cliente,
     CASE fo.destino_tabela 
           WHEN 'f_pg_faturado'
               THEN valor 
           ELSE 0 
      END debito,
	  
	   CASE fo.destino_tabela 
           WHEN 'caixa'
               THEN valor 
           ELSE 0 
      END credito
from financeiro_operacoes fo, clientes c
where fo.destino_tabela in ('f_pg_faturado', 'caixa') AND 
  fo.origem_tabela_id = c.id
order by fo.origem_tabela_id;
CREATE VIEW f_clientes_faturados_total
AS
SELECT fo.id, fo.origem_tabela_id cliente_id, c.nome cliente,
   sum(CASE fo.destino_tabela 
           WHEN 'f_pg_faturado'
               THEN valor 
           ELSE 0 
      END) debito,
	sum( CASE fo.destino_tabela 
           WHEN 'caixa'
               THEN valor 
           ELSE 0 
      END) credito, created
from financeiro_operacoes fo, clientes c
where fo.destino_tabela in ('f_pg_faturado', 'caixa') AND 
  fo.origem_tabela_id = c.id 
GROUP BY fo.origem_tabela_id
order by fo.origem_tabela_id;
CREATE VIEW faturados_completo
AS
select f.id, f.created, f.venda_id, f.cliente cliente_id, c.nome cliente_nome, f.tipo, f.valor 
from faturados f, clientes c
where f.cliente = c.id;
CREATE VIEW rel_vendas_total
AS
select 
   strftime('%d/%m/%Y', created / 1000, 'unixepoch', 'localtime') data, 
   count() n,
   sum(total) total,
   SUM(json_extract(pagamento,'$.dinheiro')) dinheiro,
   (SUM(json_extract(pagamento,'$.debito')) + SUM(json_extract(pagamento,'$.credito'))) cartao,
   SUM(json_extract(pagamento,'$.faturado')) faturado
   from vendas 
   group by strftime('%d/%m/%Y', created / 1000, 'unixepoch', 'localtime') 
   order by id desc;
CREATE VIEW view_fin_caixa
AS
   SELECT fo.created data, 
(select fo2.origem_tabela from financeiro_operacoes  fo2 where fo2.id = fo.pid) || ' - ' || fo.pid desc, valor 
FROM financeiro_operacoes fo
WHERE fo.destino_tabela IN  ('f_pg_dinheiro', 'f_pg_debito', 'f_pg_credito', 'caixa');
CREATE VIEW view_vendas_completo
AS
SELECT v.id,  v.created data, v.cliente || ' - ' || c.nome cliente, v.itens, v.subtotal,
v.desconto, v.acrescimo, v.total, v.pagamento
from vendas v, clientes c, financeiro_operacoes fo
WHERE v.cliente = c.id and v.id = fo.id;
COMMIT;
