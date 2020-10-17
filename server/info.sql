BEGIN TRANSACTION;
DROP TABLE IF EXISTS "info";
CREATE TABLE IF NOT EXISTS "info" (
	"id"	INTEGER NOT NULL,
	"nome"	TEXT,
	"nome_fantasia"	TEXT,
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
	"preferences"	TEXT,
	PRIMARY KEY("id")
);
INSERT INTO "info" VALUES (1,'111222','Hortifruti Nova Caraíva','33.042.633/0001-11','Nova Caraíva','Nova Caraíva','111','Caraíva','222','BA','Brasil',NULL,'11111','2222','3333','teste@teste.com','{"label":"preferences","type":"parent","children":{"balcao":{"label":"Balcão","type":"parent","children":{"init_field_focus":{"label":"Cursor iniciando em","type":"radio","options":["0|Nenhum","1|Código de barras","2|Busca por nome do produto"],"value":"1"},"printer":{"label":"Impressora","type":"parent","children":{"colunas":{"label":"Colunas","type":"input","value":"6000"},"font_size":{"label":"Tamanho da fonte","type":"parent","children":{"header":{"label":"Cabeçalho do cupom","type":"input","value":"15px"},"table_header":{"label":"Cabeçalho da tabela de itens","type":"input","value":"16px"},"table_rows":{"label":"linhas da tabela de itens","type":"input","value":"17px"},"footer":{"label":"Rodapé","type":"input","value":"18px"}}},"goodby_message":{"label":"Mensagem de despedida","type":"input","value":"Obrigado, linda!!"}}}}}}}');
DROP VIEW IF EXISTS "caixa_status_totais";
CREATE VIEW caixa_status_totais
AS
select session, op, sum(value) from caixa_status;
DROP VIEW IF EXISTS "f_clientes_faturados";
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
DROP VIEW IF EXISTS "f_clientes_faturados_total";
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
DROP VIEW IF EXISTS "faturados_completo";
CREATE VIEW faturados_completo
AS
select f.id, f.created, f.venda_id, f.cliente cliente_id, c.nome cliente_nome, f.tipo, f.valor 
from faturados f, clientes c
where f.cliente = c.id;
DROP VIEW IF EXISTS "rel_vendas_total";
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
DROP VIEW IF EXISTS "view_fin_caixa";
CREATE VIEW view_fin_caixa
AS
   SELECT fo.created data, 
(select fo2.origem_tabela from financeiro_operacoes  fo2 where fo2.id = fo.pid) || ' - ' || fo.pid desc, valor 
FROM financeiro_operacoes fo
WHERE fo.destino_tabela IN  ('f_pg_dinheiro', 'f_pg_debito', 'f_pg_credito', 'caixa');
DROP VIEW IF EXISTS "view_vendas_completo";
CREATE VIEW view_vendas_completo
AS
SELECT v.id,  v.created data, v.cliente || ' - ' || c.nome cliente, v.itens, v.subtotal,
v.desconto, v.acrescimo, v.total, v.pagamento
from vendas v, clientes c, financeiro_operacoes fo
WHERE v.cliente = c.id and v.id = fo.id;
DROP VIEW IF EXISTS "cash_flow_total_by_day";
CREATE VIEW cash_flow_total_by_day
AS
select strftime('%d-%m-%Y', created/1000, 'unixepoch', 'localtime')  date, count(*) n, ROUND(sum(value),2) value
  from cash_flow
  GROUP by strftime('%d-%m-%Y', created/1000, 'unixepoch', 'localtime')
 order by 1;
COMMIT;
