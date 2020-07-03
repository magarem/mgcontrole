
  // // Clientes
  // app.get(environment + '/cliente', function (req, res, next) {
   
  //   // Get user token
  //  let token = req.headers['x-token']
  //  // Get domain
  //  let domain = token.split('.')[0]
  //  console.log('domain:', domain);
   
  //  db_open(`./${domain}.db`).then(db => {
    
  //   let strLimit = ""
  //   let strWhere = " where 1=1 "
  //   let strSort = " order by id DESC"
   
  //   if (req.query.sort) {
  //     strLimit = " limit " + ((parseInt(req.query.page) - 1) * req.query.limit) + ',' + req.query.limit
  //     strSort = " order by " + req.query.sort.replace('+', '').replace('-', '')
  //   }

  //   if (req.query.nome){ strWhere += " and nome like '%"+req.query.nome+"%' or doc like '%"+req.query.nome+"%'"}
  //   if (req.query.doc){ strWhere += " and doc like '%"+req.query.doc+"%'"}

  //   sqlStr = "SELECT count(*) as total FROM clientes " + strWhere + strSort
  //   db.all(sqlStr, function(err, rows, fields) {
  //      let totGeral = rows[0].total
  //      console.log('totGeral:', totGeral);
  //      sqlStr = "SELECT * FROM clientes " + strWhere + strSort + strLimit;
  //      console.log('sqlStr', sqlStr);
  //      db.all(sqlStr, function(err, rows, fields) {
  //      // console.log('rows.length:', rows.length);
  //        jsonStr = {
  //          "code": 20000,
  //          "data": {
  //              // "total": (rows||[]).length}
  //              "total": totGeral}
  //          }
  //         jsonStr.data.items = rows
  //         res.send(jsonStr);
  //      });



  //   })
  //   })


  // })
  // app.post(environment + '/cliente', function (req, res, next) {
    
  //   // Get user token
  //   let token = req.headers['x-token']
  //   // Get domain
  //   let domain = token.split('.')[0]

  //   db_open(`./${domain}.db`).then(db => {
  //     db.run('INSERT INTO clientes (nome, tipo, doc, contato, fone, fone2, email, endereco, cep, obs) VALUES (?,?,?,?,?,?,?,?,?,?)',
  //             [req.body.nome,
  //              req.body.tipo,
  //              req.body.doc,
  //              req.body.contato,
  //              req.body.fone,
  //              req.body.fone2,
  //              req.body.email,
  //              req.body.endereco,
  //              req.body.cep,
  //              req.body.obs],
  //              function(err) {
  //                 if (err) return console.log(err.message);
  //                 // get the last insert id
  //                 console.log(`A row has been inserted with rowid ${this.lastID}`);
  //                 jsonStr = {code: 20000, data: {id: this.lastID}}
  //                 res.send(jsonStr);
  //              }
  //     );
  //   })
  // })
  // app.patch(environment + '/cliente', function (req, res, next) {
    
  //   // Get user token
  //   let token = req.headers['x-token']
  //   // Get domain
  //   let domain = token.split('.')[0]
    
  //   var id = req.body.id
  //   db_open('./' + domain + '.db').then(db => {
  //     let data = [req.body.nome, req.body.tipo, req.body.doc, req.body.contato, req.body.fone, req.body.fone2, req.body.email, req.body.endereco, req.body.cep, req.body.obs, id];
  //     let sql = "UPDATE clientes SET nome = ?, tipo = ?, doc = ?, contato = ?, fone = ?, fone2 = ?, email = ?, endereco = ?, cep = ?, obs = ? WHERE id = ?";

  //     db.run(sql, data, function(err) {
  //       if (err) {
  //         return console.error(err.message);
  //       }
  //       console.log(`Row(s) updated: ${this.changes}`);
  //     });

  //     res.send({
  //       code: 20000,
  //       data: 'success'
  //     })
  //   })
  // })
  // app.delete(environment + '/cliente', function (req, res, next) {
    
  //   // Get user token
  //   let token = req.headers['x-token']
  //   // Get domain
  //   let domain = token.split('.')[0]
    
  //   db_open(`./${domain}.db`).then(db => {
  //     db.run('DELETE FROM clientes WHERE id = ' + req.body.id);

  //      res.send({code: 20000,
  //              data: {
  //                pvData: [
  //                  { key: 'PC', pv: 1024 },
  //                  { key: 'mobile', pv: 1024 },
  //                  { key: 'ios', pv: 1024 },
  //                  { key: 'android', pv: 1024 }
  //                ]
  //              }
  //            });
  //   })
  // })

  // // Fornecedores
  // app.get(`${environment}/fornecedor`, function (req, res, next) {
  //   db_open('./' + req.session.owner + '.db').then(db => {
  //     sqlStr = "SELECT * FROM fornecedores ";
  //     console.log('sqlStr', sqlStr);
  //     db.all(sqlStr, function(err, rows, fields) {
  //     // console.log('rows.length:', rows.length);
  //     jsonStr = {
  //       "code": 20000,
  //       "data": {
  //           "total": rows.length}
  //       }
  //      jsonStr.data.items = rows
  //    })
  //    res.send(jsonStr);
  //   });

  // })
  // app.post(environment + '/fornecedor', function (req, res, next) {
  //   db_open('./' + req.session.owner + '.db').then(db => {
  //     db.run('INSERT INTO fornecedores (razao_social, nome_fantasia, tipo, doc, contato, fone, fone2, email, endereco, cep, obs) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
  //             [req.body.razao_social,
  //              req.body.nome_fantasia,
  //              req.body.tipo,
  //              req.body.doc,
  //              req.body.contato,
  //              req.body.fone,
  //              req.body.fone2,
  //              req.body.email,
  //              req.body.endereco,
  //              req.body.cep,
  //              req.body.obs],
  //              function(err) {
  //                 if (err) return console.log(err.message);
  //                 // get the last insert id
  //                 console.log(`A row has been inserted with rowid ${this.lastID}`);
  //              }
  //     );
  //     jsonStr = {code: 20000, data: 'success'}
  //     res.send(jsonStr);
  //   })
  // })
  // app.patch(environment + '/fornecedor', function (req, res, next) {
  //   var id = req.body.id

  //   db_open('./' + req.session.owner + '.db').then(db => {
  //     //
  //     let data = [req.body.razao_social, req.body.nome_fantasia, req.body.tipo, req.body.doc, req.body.contato, req.body.fone, req.body.fone2, req.body.email, req.body.endereco, req.body.cep, req.body.obs, id];
  //     let sql = "UPDATE fornecedores SET razao_social = ?, nome_fantasia = ?, tipo = ?, doc = ?, contato = ?, fone = ?, fone2 = ?, email = ?, endereco = ?, cep = ?, obs = ? WHERE id = ?";

  //     db.run(sql, data, function(err) {
  //       if (err) {
  //         return console.error(err.message);
  //       }
  //       console.log(`Row(s) updated: ${this.changes}`);
  //     });


  //     res.send({
  //       code: 20000,
  //       data: 'success'
  //     })
  //   })
  // })
  // app.delete(environment + '/fornecedor', function (req, res, next) {
  //   db_open('./' + req.session.owner + '.db').then(db => {
  //     db.run('DELETE FROM fornecedores WHERE id = ' + req.body.id);
  //     res.send(
  //       {code: 20000,
  //          data: {
  //            pvData: [
  //              { key: 'PC', pv: 1024 },
  //              { key: 'mobile', pv: 1024 },
  //              { key: 'ios', pv: 1024 },
  //              { key: 'android', pv: 1024 }
  //            ]
  //          }
  //        });
  //   });
  // })

  // // Funcionarios
  // app.get(environment + '/funcionarios', function (req, res, next) {

  //   db_open('./' + req.session.owner + '.db').then(db => {
  //     let strWhere = " where 1=1 "
  //     let strLimit = " limit " + ((parseInt(req.query.page) - 1) * req.query.limit) + ',' + req.query.limit
  //     let strSort = " order by " + req.query.sort.replace('+','').replace('-','')

  //     if (req.query.nome){ strWhere += " and nome like '%"+req.query.nome+"%'"}
  //     if (req.query.doc){ strWhere += " and doc like '%"+req.query.doc+"%'"}

  //     sqlStr = "SELECT count(*) as total FROM funcionarios " + strWhere
  //     db.all(sqlStr, function(err, rows, fields) {
  //       if (rows){
  //        let totGeral = rows[0].total
  //        console.log('totGeral:', totGeral);
  //        sqlStr = "SELECT * FROM funcionarios " + strWhere + strSort + strLimit;
  //        console.log('sqlStr', sqlStr);
  //        db.all(sqlStr, function(err, rows, fields) {
  //          jsonStr = {
  //            "code": 20000,
  //            "data": {
  //                // "total": (rows||[]).length}
  //                "total": totGeral}
  //            }
  //           jsonStr.data.items = rows
  //           res.send(jsonStr);
  //        });
  //       }
  //     })
  //   })
  // })
  // app.post(environment + '/funcionario', function (req, res, next) {

  //   db_open('./' + req.session.owner + '.db').then(db => {
  //     db.run('INSERT INTO funcionarios (nome, funcao, doc, contato, fone, fone2, email, endereco, cep, obs) VALUES (?,?,?,?,?,?,?,?,?,?)',
  //             [req.body.nome,
  //              req.body.funcao,
  //              req.body.doc,
  //              req.body.contato,
  //              req.body.fone,
  //              req.body.fone2,
  //              req.body.email,
  //              req.body.endereco,
  //              req.body.cep,
  //              req.body.obs],
  //              function(err) {
  //                 if (err) return console.log(err.message);
  //                 // get the last insert id
  //                 console.log(`A row has been inserted with rowid ${this.lastID}`);
  //                 jsonStr = {code: 20000, data: {id: this.lastID}}
  //                 res.send(jsonStr);
  //              }
  //     );
  //   })
  // })
  // app.patch(environment + '/funcionario', function (req, res, next) {
  //   var id = req.body.id

  //   db_open('./' + req.session.owner + '.db').then(db => {
  //     let data = [req.body.nome, req.body.funcao, req.body.doc, req.body.contato, req.body.fone, req.body.fone2, req.body.email, req.body.endereco, req.body.cep, req.body.obs, id];
  //     let sql = "UPDATE funcionarios SET nome = ?, funcao = ?, doc = ?, contato = ?, fone = ?, fone2 = ?, email = ?, endereco = ?, cep = ?, obs = ? WHERE id = ?";

  //     db.run(sql, data, function(err) {
  //       if (err) {
  //         return console.error(err.message);
  //       }
  //       console.log(`Row(s) updated: ${this.changes}`);
  //     });

  //     res.send({
  //       code: 20000,
  //       data: 'success'
  //     })
  //   })
  // })
  // app.delete(environment + '/funcionario', function (req, res, next) {
  //   db_open('./' + req.session.owner + '.db').then(db => {
  //     db.run('DELETE FROM funcionarios WHERE id = ' + req.body.id);
  //     res.send({code: 20000,
  //              data: {
  //                pvData: [
  //                  { key: 'PC', pv: 1024 },
  //                  { key: 'mobile', pv: 1024 },
  //                  { key: 'ios', pv: 1024 },
  //                  { key: 'android', pv: 1024 }
  //                ]
  //              }
  //            });
  //   })
  // })

  // // Produtos
  // app.get(environment + '/produtos', function (req, res, next) {

  //   db_open('./' + req.session.owner + '.db').then(db => {
  //     var sqlWhere = "where 1=1 "
  //     var sqlLimit = ""
  //     if (req.query.page){
  //       sqlLimit = " LIMIT " + (parseInt(req.query.page)-1) * 20 + ", " + req.query.limit
  //     }
  //     if (req.query.ean){
  //       sqlWhere += "and ean like '%"+req.query.ean+"%'"
  //     }
  //     if (req.query.descricao){
  //       sqlWhere += "and descricao like '%"+req.query.descricao+"%'"
  //     }
  //     sqlStr = "SELECT * FROM produtos "+ sqlWhere + " order by id desc " + sqlLimit ;
  //     console.log('sqlStr', sqlStr);
  //     db.all(sqlStr, function(err, rows, fields) {
  //       if (rows){
  //         jsonStr = {
  //           "code": 20000,
  //           "data": {
  //               "total": rows.length}
  //           }
  //          jsonStr.data.items = rows

  //         console.log(jsonStr);
  //         res.send(jsonStr);
  //       }else{
  //         jsonStr = {
  //           "code": 20000,
  //           "data": {
  //               "total": 0}
  //           }
  //         res.send(jsonStr);
  //       }
  //     });

  //     db.close((err) => {
  //       if (err) {
  //         return console.error(err.message);
  //       }
  //       console.log('Close the database connection.');
  //     });

  //     // console.log('-------->', v);  // exibe 60 depois de 4 segundos.
  //   });

  // })
  // app.post(environment + '/produto', function (req, res, next) {

  //   db_open('./' + req.session.owner + '.db').then(db => {

  //     db.run('INSERT INTO produtos (ean, descricao, pco_custo, pco_venda, unidade, estoque) VALUES (?,?,?,?,?,?)',
  //             [req.body.ean,
  //              req.body.descricao,
  //              req.body.pco_custo,
  //              req.body.pco_venda,
  //              req.body.unidade,
  //              req.body.estoque],
  //              function(err) {
  //                 if (err) return console.log(err.message);
  //                 // get the last insert id
  //                 console.log(`A row has been inserted with rowid ${this.lastID}`);
  //              }
  //     );
  //     jsonStr = {code: 20000, data: 'success'}
  //     res.send(jsonStr);
  //   })
  // })
  // app.post(environment + '/productsList', function (req, res, next) {

  //   db_open('./' + req.session.owner + '.db').then(db => {

  //   // db.run('INSERT INTO produtos (ean, descricao, pco_custo, pco_venda, unidade, estoque) VALUES (?,?,?,?,?,?)',
  //   //         [req.body.ean,
  //   //          req.body.descricao,
  //   //          req.body.pco_custo,
  //   //          req.body.pco_venda,
  //   //          req.body.unidade,
  //   //          req.body.estoque],
  //   //          function(err) {
  //   //             if (err) return console.log(err.message);
  //   //             // get the last insert id
  //   //             console.log(`A row has been inserted with rowid ${this.lastID}`);
  //   //          }
  //   // );
  //   jsonStr = {code: 20000, data: 'success'}
  //   res.send(jsonStr);
  //   })
  // })
  // app.patch(environment + '/produto', function (req, res, next) {

  //   var id = req.body.id
  //   db_open('./' + req.session.owner + '.db').then(db => {

  //     // Sql
  //     let data = [req.body.ean, req.body.descricao, req.body.pco_custo, req.body.pco_venda, req.body.unidade, req.body.estoque, id];
  //     let sql = "UPDATE produtos SET ean = ?, descricao = ?, pco_custo = ?, pco_venda = ?, unidade = ?, estoque = ? WHERE id = ?";

  //     db.run(sql, data, function(err) {
  //       if (err) {
  //         return console.error(err.message);
  //       }
  //       console.log(`Row(s) updated: ${this.changes}`);
  //     });


  //     res.send({
  //       code: 20000,
  //       data: 'success'
  //     })
  //   })
  // })
  // app.delete(environment + '/produto', function (req, res, next) {
  //   var id = req.query.pv
  //   console.log('id:', id);
  //   db_open('./' + req.session.owner + '.db').then(db => {
  //     db.run(
  //           'DELETE FROM produtos WHERE id = ?',
  //           id,
  //           function (err, result) {
  //               if (err){
  //                   res.status(400).json({"error": res.message})
  //                   return;
  //               }
  //               res.json({"message":"deleted", changes: this.changes})
  //           }
  //     );

  //   })
  // })

//////////////////////////////