var express = require('express');
const session = require('express-session');
var cors = require('cors')
const ejs = require('ejs')
const path = require('path')
const fs = require('fs');

// AEN code external site search requires
const rp = require('request-promise');
const $ = require('cheerio');

var bodyParser = require('body-parser');

// Load sqlite
const sqlite3 = require('sqlite3').verbose();


// Load Databank
async function db_open(name){
  return new sqlite3.Database(name, sqlite3.OPEN_READWRITE, (err) => {
    if (err)
      return console.error(err.message);
    console.log('Connected to the in-memory SQlite database.');
  });
}

function db_close(){
  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}
function db_populate(){
  for (var i = 0; i < produtos.data.items.length; i++) {
    db.run('INSERT INTO produtos (ean, descricao, pco_venda, unidade, estoque) VALUES (?,?,?,?,?)', [produtos.data.items[i].ean, produtos.data.items[i].descricao, produtos.data.items[i].pco_venda, produtos.data.items[i].unidade, produtos.data.items[i].estoque], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
   }
 }
function eansearch(ean){
   console.log(ean)
   var options = {
       method: 'GET',
       uri: 'https://cosmos.bluesoft.com.br/pesquisar',
       form: {
           q: ean
       }
       // ,
       // json: true // Automatically stringifies the body to JSON
   };
   rp(options)
     .then(function (body) {
         var ret = body.split("<h1 class='page-header'>")[1].split('<img alt="Produto Registrado em Brasil"')[0].trim()
         console.log('ret:', ret);
         return ret
     })
     .catch(function(err){
       console.log(err);
     });
}

const environment = '/api' // '/dev-api' || '/prod-api'
var sess;
// Init app
const app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

const history = require('connect-history-api-fallback');
const staticFileMiddleware = express.static(__dirname);
app.use(staticFileMiddleware);


app.get('/oi', (req, res) => {
  res.json({
    name: 'Krsna!'
  });
});



app.use(history({
  disableDotRule: true,
  verbose: true
}));




app.use(staticFileMiddleware);

app.use(cors({
    origin:['http://localhost:3000','http://localhost:9527'],
    methods:['OPTIONS', 'GET','POST', 'PATCH', 'DELETE'],
    credentials: true // enable set cookie
}));


 function authChecker(req, res, next) {
    console.log("-[req.session.owner]--->", req.session.owner);
    console.log("-[req.path.length]--->", req.path.length);

    if (req.session.owner && req.path!='/dev-api/user/login') {
        console.log('>>>>./' + req.session.owner + '.db');
        // var db = db_open('./' + req.session.owner + '.db')
        // var db = await db_open('./' + req.session.owner + '.db');
        // db_open('./' + req.session.owner + '.db').then(function(x){
        //   console.log('>>>>', x);
        //   var db = x
        //
        // })
        var db = new sqlite3.Database('./' + req.session.owner + '.db', sqlite3.OPEN_READWRITE, (err) => {
          if (err) return console.error(err.message);
          console.log('Connected to the in-memory SQlite database.');
          // db.run('CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, ean CHAR(20), descricao CHAR(230), pco_venda CHAR(10), unidade CHAR(10), estoque CHAR(5))');
          // //Create vendas table
          // db.run('CREATE TABLE IF NOT EXISTS vendas (id INTEGER PRIMARY KEY AUTOINCREMENT, vendaID CHAR(20), cliente int, subtotal int, desconto int, acrescimo int, total int, dinheiro int, debito int, credito int, totalpago int, troco int)');
          // //Create vendas_itens table
          // db.run('CREATE TABLE IF NOT EXISTS vendas_itens (id INTEGER PRIMARY KEY AUTOINCREMENT, vendaID CHAR(20), vendaItem INTEGER, ean CHAR(10), descricao CHAR(200), unidade CHAR(10), pco_venda CHAR(10), qnt INTEGER, subtotal INTEGER)');
          // //Create fornecedor
          // db.run('CREATE TABLE  IF NOT EXISTS "fornecedores" ("id"	INTEGER PRIMARY KEY AUTOINCREMENT, "nome"	char(50), "tipo"	char(15), "doc"	char(25), "contato"	char(30),"fone"	char(100),"fone2"	TEXT,"email"	char(100),"endereco"	TEXT,"obs"	text)');
          //Create compras
          //db.run('CREATE TABLE IF NOT EXISTS compras (id INTEGER PRIMARY KEY AUTOINCREMENT, fornecedor int, data char(100), tipo char(15), cnpjcpf char(25), contato char(30), fone char(100), email char(100), obs text)');
          //
          next()
        });

    } else {
      next()
       // res.redirect("http://localhost:9527/#/login")
    }

}

// app.use(authChecker);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));

app.set('view engine', 'ejs');
//app.use(express.static('./public'));
console.log(__dirname)
app.use(express.static('../client'));




app.get(environment + '/setowner', function (req, res, next) {
   req.session.owner = req.query.owner
   res.send(req.session.owner)
})

app.get(environment + '/getowner', function (req, res, next) {
   res.send(req.session.owner)
})

app.get(environment + '/eansearch', function (req, res, next) {
  var ean = req.query.ean
  var options = {
      method: 'GET',
      uri: 'https://cosmos.bluesoft.com.br/pesquisar',
      form: {
          q: ean
      }
      // ,
      // json: true // Automatically stringifies the body to JSON
  };
  rp(options)
    .then(function (body) {
        var ret = body.split("<h1 class='page-header'>")[1].split('<img alt="Produto Registrado')[0].trim()
        console.log('ret:', ret);
        //ret = {ret: ret}
        if (ret.indexOf('Resultados da Busca')>-1) { ret = ''}
        console.log('eansearch(req.query.ean):', ret);
        res.send(ret)
    })
    .catch(function(err){
      console.log(err);
    });


})

// app.get(/.*/,(req,res)=>res.sendFile(path.resolve(__dirname,'public/index.html')))
// app.get(/.*/,(req,res)=>res.sendFile(path.resolve(__dirname,'public/index.html')))
// app.get('/init',(req,res)=>res.sendFile(path.resolve(__dirname)))

// // Begin
// app.get('/init', function (req, res, next) {
//  res.render('index', {user: 0});
// //  res.redirect('/');
// })



////////////////////////////////
// Auth
////////////////////////////////
  app.post(environment + '/setCaixaPosicao', function (req, res, next) {
    let data = req.body.data
    let operacao = req.body.operacao
    let usuario = req.body.usuario
    let valor = req.body.valor
    console.log(data, operacao, usuario, valor);
    db_open('./' + req.session.owner + '.db').then(db => {
      db.run('INSERT INTO caixa_status (data, operacao, usuario, valor) VALUES (?,?,?,?)',
              [data,
               operacao,
               usuario,
               valor],
               function(err) {
                  if (err) return console.log(err.message);
                  // get the last insert id
                  console.log(`A row has been inserted with rowid ${this.lastID}`);
                  res.send(true);
               }
      );
    })
  })

  app.get(environment + '/getCaixaPosicao', function (req, res, next) {
    let usuario = req.query.usuario
    let sqlStr = 'SELECT * FROM caixa_status where usuario like "' + usuario + '" ORDER BY id DESC LIMIT 1'
    console.log('sqlStr:', sqlStr);

    console.log('./' + req.session.owner + '.db');

    db_open('./' + req.session.owner + '.db').then(db => {
      // Get  user auth data
      db.all(sqlStr, (err, row)=>{
        let pass = false
        console.log('row:', row);

          pass = true
          jsonStr = { row: row}
          console.log('jsonStr:', jsonStr);
          res.send(jsonStr);

      })


      })
  })

  app.post(environment + '/user/login', function (req, res, next) {

    console.log(req.headers)

    //Get parans
    let domain = req.body.domain
    let username = req.body.username
    let password = req.body.password

    //Set return var
    var ret = []

    // store system owner
    req.session.domain = domain
    req.session.username = username

    //debug session
    console.log('req.session.domain:', req.session.domain);
    
    // Set var datafile with domain name
    let datafile = './' + domain + '.db'

    // Prepara o SQL para trazer as informações de login
    let sqlStr = `select * from user where username like "${username}" and password like "${password}"`
    // let sqlStr = 'select * from usuarios'

    //Debug
    console.log(sqlStr);

    // Open data base file based on domain name of client
    var db = new sqlite3.Database(datafile);
    
    // Execute the SQL in databank stacking rows in ret var
    db.all(sqlStr, function(err, row) {
      // rows.forEach(function (row) {
      //   ret.push(row);
      // })
      
      //Make the string of return
      console.log('row:', row);
      jsonStr = {"code": 50008,"data": {"token": "","total": 0 }}
      if (row && row.length>0) jsonStr = {"code": 20000,"data": {"token": row[0].token, "total": 1 }}
      
      console.log('ret', ret);
      res.send(jsonStr);
    });	

    // Close data bank
    db.close();
  })

  app.get(environment + '/user/info', function (req, res, next) {

    // Get user token
    let token = req.headers['x-token']

    // Get domain
    let domain = token.split('.')[0]
    console.log('domain:', domain);
    
    //Set return var
    // var ret = []

    // Set var datafile with domain name
    let datafile = './' + domain + '.db'

    // Prepara o SQL para trazer as informações de login
    let sqlStr = 'select * from user where token like "' + token + '"'
    // let sqlStr = 'select * from usuarios'

    //Debug
    console.log(sqlStr);

    // Open data base file based on domain name of client
    var db = new sqlite3.Database(datafile);
    
    // Execute the SQL in databank stacking rows in ret var
    db.all(sqlStr, function(err, row) {
      // rows.forEach(function (row) {
      //   ret.push(row);
      // })
      console.log('row:', row);
      
      //Make the string of return
      jsonStr = {"code": 20000, "data": {"name": "", "total": 0 }}
      if (row) {
        jsonStr = {
          "code": 20000, 
          "data": {
            "user_id": row[0].user_id,
            "roles": [row[0].roles],
            "introduction": row[0].introduction,
            "avatar": row[0].avatar,
            "name": row[0].name, 
            "total": 1 }
          }
      }
      
      console.log('jsonStr', jsonStr);
      res.send(jsonStr);
    });	

    // Close data bank
    db.close();

    // var ret = {
    //   "code":20000,
    //   "data":{
    //     "roles":["editor"],
    //     "introduction":"I am an editor",
    //     "avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    //     "name":req.session.username}
    // }
    // res.send(ret)
  })
  app.post(environment + '/user/logout', function (req, res, next) {
    //Make the string of return
    jsonStr = {
      code: 20000,
      data: 'success'
    }
    console.log('jsonStr', jsonStr);
    res.send(jsonStr);
  })

////////////////////////////////
// Cadastros
////////////////////////////////
function whereSQL_string(obj){
  let ret = null
  let t = []
  for (const [key, value] of Object.entries(obj)) {
    if (value) t.push(key + ' like "%'  + value + '%"');
  }
  if (t.length > 0) ret = t.join(" and ")
  return ret
}

function insertSQL_string(table, obj){
  var sql = `INSERT INTO ${table} ('${Object.keys(obj).join("','")}') values ('${Object.values(obj).join("','")}')`
  return sql
}
function updateSQL_string(table, id, obj){
  var sql = `UPDATE ${table} SET ${Object.keys(obj).join(' = ?, ') + ' = ?'} WHERE id = ${id}`;
  console.log('updateSQL:sql->',sql);
  
  return sql
}
  // Generic
  app.get(environment + '/generic', function (req, res, next) {
   
    // Get user token
   let token = req.headers['x-token']
   // Get domain
   let domain = token.split('.')[0]
   console.log('domain:', domain);

   //Get table name
   let key = req.query.key
   console.log('key:', key);
   
   
   db_open(`./${domain}.db`).then(db => {
    
    let strLimit = ""
    let strWhere = " where 1=1 "

    console.log('req.query:', req.query);
    
    
    if (req.query.find) {
      console.log('!!!!');
      w = whereSQL_string(JSON.parse(req.query.find))
      if (w) strWhere += ' and ' + w
    }

    let strSort = " order by id"//DESC
   
    if (req.query.sort) {
      strLimit = " limit " + ((parseInt(req.query.page) - 1) * req.query.limit) + ',' + req.query.limit
      strSort = " order by " + req.query.sort.replace('+', '').replace('-', '')
    }

    // if (req.query.nome){ strWhere += " and nome like '%"+req.query.nome+"%' or doc like '%"+req.query.nome+"%'"}
    // if (req.query.doc){ strWhere += " and doc like '%"+req.query.doc+"%'"}

    sqlStr = `SELECT count(*) as total FROM ${key} ${strWhere}`
    console.log('>>>', sqlStr);
    
    db.all(sqlStr, function(err, rows, fields) {
      if (rows){
        console.log('!!2')
        let totGeral = rows[0].total
        console.log('totGeral:', totGeral);
        sqlStr = `SELECT * FROM ${key} ${strWhere} `//${strSort} ${strLimit}`;
        console.log('sqlStr', sqlStr);
        db.all(sqlStr, function(err, rows, fields) {
        // console.log('rows.length:', rows.length);
          jsonStr = {
            "code": 20000,
            "data": {
                // "total": (rows||[]).length}
                "total": totGeral}
            }
            jsonStr.data.items = rows
            res.send(jsonStr);
        });
      }else{
        jsonStr = {
          "code": 20000,
          "data": {
              // "total": (rows||[]).length}
              "total": 0}
          }
          jsonStr.data.items = []
          res.send(jsonStr);
      }
    })
    })


  })
  app.post(environment + '/generic', function (req, res, next) {
    
    // Get user token
    let token = req.headers['x-token']
    // Get domain
    let domain = token.split('.')[0]

    //Get table name
    let key = req.query.key
    console.log('key:', key);

    console.log('req.body:', req.body);
    
    sql = insertSQL_string(key, req.body)

    db_open(`./${domain}.db`).then(db => {
      console.log('sql:', sql);
      db.run(sql,
        function(err) {
          if (err) return console.log(err.message);
          // get the last insert id
          console.log(`A row has been inserted with rowid ${this.lastID}`);
          jsonStr = {code: 20000, data: {id: this.lastID}}
          res.send(jsonStr);
        }
      );
    })

  })
  app.patch(environment + '/generic', function (req, res, next) {
    
    // Get user token
    let token = req.headers['x-token']
    // Get domain
    let domain = token.split('.')[0]

    //Get table name
    let key = req.query.key
    console.log('key:', key);

    console.log(req.body);

    console.log('Object.values(req.body):', Object.values(req.body));
    
    
    var id = req.body.id

    db_open('./' + domain + '.db').then(db => {
      // let data = [req.body.nome, req.body.tipo, req.body.doc, req.body.contato, req.body.fone, req.body.fone2, req.body.email, req.body.endereco, req.body.cep, req.body.obs, id];
      // let sql = "UPDATE clientes SET nome = ?, tipo = ?, doc = ?, contato = ?, fone = ?, fone2 = ?, email = ?, endereco = ?, cep = ?, obs = ? WHERE id = ?";
      let sql = updateSQL_string(key, id, req.body)
      db.run(sql, Object.values(req.body), function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
      });

      res.send({
        code: 20000,
        data: 'success'
      })
    })
  })
  app.delete(environment + '/generic', function (req, res, next) {
    
    // Get user token
    let token = req.headers['x-token']
    // Get domain
    let domain = token.split('.')[0]

    //Get table name
    let key = req.query.key
    console.log('key:', key);
    
    db_open(`./${domain}.db`).then(db => {
      db.run(`DELETE FROM ${key} WHERE id =  ${req.body.id}`);

       res.send({code: 20000,
               data: {
                 pvData: [
                   { key: 'PC', pv: 1024 },
                   { key: 'mobile', pv: 1024 },
                   { key: 'ios', pv: 1024 },
                   { key: 'android', pv: 1024 }
                 ]
               }
             });
    })
  })


//////////////////////////////
// Vendas
//////////////////////////////

  // Vendas
  app.get(environment + '/vendas', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {

      var sqlWhere = "where 1=1 "
      var sqlLimit = ""
      if (req.query.page){
        sqlLimit = " LIMIT " + (parseInt(req.query.page)-1) * 20 + ", " + req.query.limit
      }
      if (req.query.ean){
        sqlWhere += "and venda like '"+req.query.ean+"'"
      }
      if (req.query.descricao){
        sqlWhere += "and descricao like '%"+req.query.descricao+"%'"
      }
      sqlStr = "SELECT * FROM vendas "+ sqlWhere + " order by id desc " + sqlLimit ;
      console.log('sqlStr', sqlStr);
      db.all(sqlStr, function(err, rows, fields) {
        // console.log('rows.length:', rows.length);
        jsonStr = {
          "code": 20000,
          "data": {
              "total": rows.length}
          }
         jsonStr.data.items = rows
         res.send(jsonStr);
      });
    })
  })

  app.get(environment + '/vendaItens', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      sqlStr = "SELECT * FROM vendas_itens where vendaId = '" + req.query.vendaID + "'" ;
      console.log('sqlStr', sqlStr);
      db.all(sqlStr, function(err, rows, fields) {
      // console.log('rows.length:', rows.length);
      jsonStr = {
        "code": 20000,
        "data": {
            "total": rows.length}
        }
       jsonStr.data.items = rows
       res.send(jsonStr);

      });
    })
  })

  //Balcao
  app.post(`${environment}/vendaClose`, function (req, res) {

    // Get domain
    let token = req.headers['x-token']
    let domain = token.split('.')[0]

    //Get form data
    var json_data = JSON.parse(req.body.json_data)
    console.log('json_data:', json_data);
    var cliente = json_data.cliente
    var itens = json_data.itens
    var subtotal = json_data.subtotal 
    var desconto = json_data.desconto
    var total = json_data.total
    var value_dinheiro = json_data.dinheiro 
    var value_debito = json_data.debito 
    var value_credito = json_data.credito 
    var value_faturado = json_data.faturado
    var date = json_data.date

    if (!date){
      date = new Date().getTime()
    }

    console.log('var date:', date);

    //Open database
    db_open('./' + domain + '.db').then(db => {
      
      // Register op Venda
      register_op(null, 'vendas', null, 'usuarios', cliente, total, db)
      .then(
        result => {
          console.log("Promise resolved: " + result)
          var top_id = result
          // Prepara obj pagamento
          var pagamento_obj = {
            dinheiro: value_dinheiro,
            debito: value_debito,
            credito: value_credito,
            faturado: value_faturado
          }
          var pagamento = JSON.stringify(pagamento_obj)
          // Insert Venda
          db.run(`INSERT INTO vendas (id, cliente, itens, subtotal, desconto, acrescimo, total, pagamento, created) VALUES (${top_id}, ${cliente}, '${JSON.stringify(itens)}', ${subtotal}, ${desconto}, null, ${total}, '${pagamento}', '${date}')`, function(err) {
            if (err) {
              return console.log(err.message);
            }
          })
          // Insert venda_pagamento
          venda_pg('f_pg_dinheiro', value_dinheiro, top_id, cliente, db);
          venda_pg('f_pg_debito', value_debito, top_id, cliente, db);
          venda_pg('f_pg_credito', value_credito, top_id, cliente, db);
          venda_pg('f_pg_faturado', value_faturado, top_id, cliente, db);
          jsonStr = {
            "code": 20000,
            "data": {
                "total": this.changes
            }
          }
          res.send(jsonStr);
        }
      )
    })
  });


///////////////////////////////


//////////////////////////////
// Compras
//////////////////////////////

  // Compras
  app.get(environment + '/compras', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      var sqlWhere = "where 1=1 "
      var sqlLimit = ""
      if (req.query.page){
        sqlLimit = " LIMIT " + (parseInt(req.query.page)-1) * 20 + ", " + req.query.limit
      }
      if (req.query.ean){
        sqlWhere += "and ean like '"+req.query.ean+"'"
      }
      if (req.query.descricao){
        sqlWhere += "and descricao like '%"+req.query.descricao+"%'"
      }
      sqlStr = "SELECT * FROM compras "+ sqlWhere + " order by id desc " + sqlLimit ;
      console.log('sqlStr', sqlStr);
      db.all(sqlStr, function(err, rows, fields) {
      // console.log('rows.length:', rows.length);
      jsonStr = {
        "code": 20000,
        "data": {
            "total": rows||[].length}
        }
       jsonStr.data.items = rows
       res.send(jsonStr);

      });
    })
  })
  app.get(environment + '/compraItens', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      sqlStr = "SELECT * FROM compras_itens where compraId = '" + req.query.compraID + "'" ;
      console.log('sqlStr', sqlStr);
      db.all(sqlStr, function(err, rows, fields) {
      // console.log('rows.length:', rows.length);
      jsonStr = {
        "code": 20000,
        "data": {
            "total": rows.length}
        }
       jsonStr.data.items = rows
       res.send(jsonStr);

      });
    })
  })

  // Entrada
  app.post(environment + '/compraClose', function (req, res, next) {

    db_open('./' + req.session.owner + '.db').then(db => {
      json_data = JSON.parse(req.body.json_data)

      console.log('json_data:', json_data);
      console.log('json_data.itens.length:', json_data.itens.length);
      console.log('json_data.itens[0].qnt:', json_data.itens[0].qnt);

      if (!json_data.date){
        json_data.date = new Date().getTime()
      }
      db.run('INSERT INTO compras (compraID, fornecedor, subtotal, desconto, acrescimo, total, dinheiro, debito, credito, totalpago, troco, created) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [json_data.compraID, json_data.fornecedor, json_data.subtotal, json_data.desconto, json_data.acrescimo, json_data.total, json_data.dinheiro, json_data.debito, json_data.credito, json_data.totalpago, json_data.troco, date], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`${this.lastID}`);
      });


      let total = 0
      //Insert itens
      for (var i = 0; i < json_data.itens.length; i++) {
        total += json_data.itens[i].subtotal
        db.run('INSERT INTO compras_itens (compraID, compraItem, ean, descricao, pco_custo, unidade, qnt, subtotal) VALUES (?,?,?,?,?,?,?,?)', [json_data.itens[i].compraID, json_data.itens[i].compraItem, json_data.itens[i].ean, json_data.itens[i].descricao, json_data.itens[i].pco_custo, json_data.itens[i].unidade, json_data.itens[i].qnt, json_data.itens[i].subtotal], function(err) {
            if (err) {
              return console.log(err.message);
            }

            // get the last insert id
            console.log(`insert compra table success`);
        });
        // Dá baixa dos itens no estoque
        let sql = "UPDATE produtos SET estoque = estoque + " + parseInt(json_data.itens[i].qnt) + " WHERE ean like '%" + json_data.itens[i].ean + "%'";
        console.log(sql);
        db.run(sql);
       }

       // Lança no caixa
       console.log("--data--", data);

       db.run('INSERT INTO caixa (data, historico, entrada, saida) VALUES (?,?,?,?)', [data, 'Compra: ' + json_data.fornecedor + ' - ' + json_data.compraID, 0, total], function(err) {
         if (err) {
           return console.log(err.message);
         }
         // get the last insert id
         console.log(`${this.lastID}`);
       });

      res.send(req.body.json_data);
    })
  });

//////////////////////////////


////////////////////////////////
// Financeiro
////////////////////////////////

  // Caixa
  app.get(environment + '/caixa', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      sqlStr = "SELECT * FROM caixa ORDER BY id desc";
      console.log('sqlStr', sqlStr);
      db.all(sqlStr, function(err, rows, fields) {
        jsonStr = {"code": 20000, "data": {"total": (rows||[]).length}}
        jsonStr.data.items = rows
        res.send(jsonStr);
      });
    })
  })
  app.post(environment + '/caixa', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      db.run('INSERT INTO caixa (data, historico, entrada, saida, saldo) VALUES (?,?,?,?,?)',
        [req.body.data,
         req.body.historico,
         req.body.entrada,
         req.body.saida,
         req.body.saldo],
         function(err) {
            if (err) return console.log(err.message);
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
       })
       jsonStr = {code: 20000, data: 'success'}
       res.send(jsonStr);
    })
  })
  app.patch(environment + '/caixa', function (req, res, next) {
    var id = req.body.id

    db_open('./' + req.session.owner + '.db').then(db => {
      //
      let data = [req.body.data, req.body.historico, req.body.entrada, req.body.saida, req.body.saldo, id];
      console.log('data:', data);
      let sql = "UPDATE caixa SET data = ?, historico = ?, entrada = ?, saida = ?, saldo = ? WHERE id = ?";
      console.log('sql:', sql);
      db.run(sql, data, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
      });

      res.send({
        code: 20000,
        data: 'success'
      })
    })
  })
  app.delete(environment + '/caixa', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      db.run('DELETE FROM caixa WHERE id = ' + req.body.id);
      res.send({code: 20000});
    })
  })


  var port = process.env.PORT || 3000;
  console.log('port: '+ port);
  const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };
  app.listen(port, () => console.log('Server start on port ${port}'))


function register_op(pid, origem_tabela, origem_tabela_id, destino_tabela, destino_tabela_id, valor, db){
  const promise = new Promise( (resolve, reject) => { 
    sql = `INSERT OR REPLACE INTO financeiro_operacoes VALUES (null, ${pid}, '${origem_tabela}', '${origem_tabela_id}', '${destino_tabela}', '${destino_tabela_id}', '${valor}', null)`
    db.run(sql, function(err) {
      if (err) {return console.log(err.message);}
      var id_op = this.lastID
      resolve(id_op)
    });
    
  });
  return promise;
}







function venda_pg(destino_tabela, value, top_id, cliente, db) {
  if (value > 0) {
    sql = `INSERT OR REPLACE INTO financeiro_operacoes
          VALUES (null, ${top_id}, 'clientes', ${cliente}, '${destino_tabela}', null, '${value}', null)`;
    db.run(sql, function (err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`venda_pagamento lastID >>${this.lastID}`);
    });
  }
}

