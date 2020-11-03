<style scoped>
  @page {
    margin-left: 0cm;
    size: 80mm 100mm
  } /* output size */
  .receipt .sheet { width: 80mm; _height: 100mm } /* sheet size */
  @media print { .receipt { width: 80mm } } /* fix for Chrome */

  @media print {
    body{
      width: 80mm;
      height: 100mm;
      margin: 0mm 0mm 0mm 0mm;
      /* change the margins as you want them to be. */
    }
  }

  .center {
    text-align: center;
  }

  .right {
    text-align: right;
  }

  .bold {
    font-weight: bold;
  }

  .cupom_table {
    font-size: 19px;
  }

  #page-container {
    position: relative;
    min-height: 100vh;
  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2.5rem;
  }
  .caixa_Status {
     font-size: 50px;
  }
  input[list] {
    margin-left:auto;
    margin-right:auto;
    max-width: 600px;
    font: 20px Arial, Helvetica, sans-serif;
    color: #666;
  }

  .produto_button  {
    width: 98%;
    height: 83px;
    background-color: #d4d3d3;
    /* background-color: white; */
    border: none;
    margin: 1px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.19);
    /* border-radius: 25px; */
  }

  .produto_button  img{
    width: 98%;
  }

  .line{
    width: 100%;
    height: 5px;
    border-bottom: 1px solid #a6a6a6;
    margin-bottom: 3px;
  }
  .cupom_header {
    text-align: left; font-family: tahoma; font-size: 20px;
  }
  .cupom_table_header {
    text-align: left; font-family: tahoma; font-size: 15px;
  }
  .cupom_table_rows {
    height:40px; text-align: left; font-family: tahoma; font-size: 15px;
  }
  .cupom_footer {
    text-align: left; font-family: tahoma; font-size: 15px;
  }

  #caixa_Status {
    font-family: tahoma; font-size: 40px; color: darkgreen;
  }

  .ticket_print {
    font-family: tahoma; font-size: 22px;
  }

  #wrapper {
    display: flex;
  }
  .left {
    text-align: left;
    width: 30%;
    float: left;
    /* background-color: darkblue; */

  }
  .right {
    text-align: right;
    width: 70%;
    /* background-color: darkgreen; */
  }

  .cardtitle {
    font-size: 25px;
  }
  /* .body {
    background-color: #44475D;
  } */
  .box_product_selected {
    font-size: 18px;
  }
  .tableBodyScroll thead {
    background-color: #B38D4F;
    color: white;
  }
  .tableBodyScroll tbody {
    display: block;
    height: 440px;
    max-height: 440px;
    overflow-y: scroll;
  }
  .tableBodyScroll thead,
    tbody tr {
    display: table;
    align-content: center;
    /* width: 100%; */
    table-layout: fixed;
  }
  .el-input__inner{
    padding-left: 5px;
    font-size: 21px;
  }
  /* tbody tr div {
    text-align: center;
  }
  tr:nth-child(even) {
    background-color: #E6C793
  } */
</style>
<template>
  <div class="app-container body">
    <div id="main">
      <el-row :gutter="10">
      Operações de caixa:<br>
      caixa_.session: {{caixa_.session}}<br> 
      caixa_: {{caixa_}}
      caixastatus:
      <div style="overflow-y: auto; height: 200px; width:50%;">
      <pre>
      {{caixastatus}}
      </pre>
      </div>
        <el-button v-if="!caixa_.session" @click="caixa_open">Abrir</el-button> 
        <el-button v-if="caixa_.session && caixa_.status != 'close'" @click="caixa_reforco">Reforçar</el-button> 
        <el-button v-if="caixa_.session && caixa_.status != 'close'" @click="caixa_sangria">Sangrar</el-button>
        <el-button v-if="caixa_.session && caixa_.status != 'close'" @click="caixa_close">Fechar</el-button>
        <el-button v-if="caixa_.session && caixa_.status == 'close'" @click="caixa_upload">Enviar</el-button>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="13">
          <el-row :gutter="20">
            <el-col :span="24">
              <!-- Produtos -->
              <el-card class="box-card" shadow="always" style="height: 505px; background-color: #a3a3c2;">
                <div slot="header" class="clearfix cardtitle">
                  <el-row :gutter="20">
                    <el-col :span="5">
                     
                      Produtos<button @click="local_data_load">DB Local</button>
                      <button @click="dataUpload">Vendas data upload</button>
                      <button @click="server_data_load">DB Server</button>
                      <button @click="caixastatus_plus">caixastatus +</button>
                      
                    </el-col>
                    <el-col :span="9">
                      <input ref="EAN" v-model="EAN" style="width: 99%; height: 35px;" placeholder=" Código de barra" @keyup.enter="productSet_EAN">
                    </el-col>

                    <el-col :span="10">
                      <input ref="searchTerm_" v-model="source" placeholder=" Busca pelo nome" list="my-list-id" style="width: 99%; height: 35px;" @input="productSet">
                      <datalist id="my-list-id">
                        <option v-for="(value, key) in produtos_" :key="key">{{ value.name }}</option>
                      </datalist>
                    </el-col>
                  </el-row>
                </div>

                <el-row :gutter="0" style="margin-left: -16px; margin-right: -16px; margin-top: -17px;">
                  <div style="overflow-y: scroll; height:300px; width: 100%">
                        {{corrent_user_info}}<br>
                        <pre>
                         {{vendas}}
                        </pre>
                      </div> 
                  <el-col v-for="(item, rindex) in atalhos.itens" :key="rindex" :span="3">
                    <button class="produto_button" @click="productSet(item)"><img style="max-width: 90%; max-height: 90%;" :src="img_mini(item)" :alt="item"> </button>
                  </el-col>
                </el-row>

              </el-card>
              <!-- /Produtos -->
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <!-- Produto selected -->
              <el-card class="box-card box_product_selected" shadow="always" style="height: 140px; background-color: #a3a3c2;">
                <!-- <div slot="header" class="clearfix cardtitle">
                  <div id="wrapper">
                    <div class="left" style="width: 70%">
                      <span v-if="!product_selected.id">Produto</span>
                      <span v-if="product_selected.id">{{ product_selected.id }} {{ product_selected.descricao }} </span>
                    </div>
                  </div>
                </div> -->
                <el-row>
                  <el-col :span="5">
                    <img v-if="!product_selected.id" src="@/assets/img/arrow-24846_960_720.png" style="width: 80%">
                    <img style="padding-top: 3px; max-width: 80%; max-height: 110px;" :src="img_mini(product_selected.descricao)" alt="">
                  </el-col>
                  <el-col :span="19">
                    <div>
                      <el-row :gutter="10" style="margin-top: -8px; margin-bottom: 10px;">

                        <el-col :span="24">
                          <span v-if="!product_selected.id" style="font-size:25px;">Selecione o produto acima</span>
                          <span v-if="product_selected.id" style="font-size:25px;">{{ product_selected.id }} {{ product_selected.descricao }} </span>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="6">
                          Preço<br>
                          <money v-model="product_selected.pco_venda" v-bind="money" style="width: 100%; margin-top: 5px; " class="el-input__inner" @keyup.native.enter="cupom_add" />
                        </el-col>
                        <el-col :span="5">
                          Uni.<br>
                          <input ref="unidade" v-model="product_selected.unidade" style="width: 100%; margin-top: 5px; " class="el-input__inner" readonly>
                        </el-col>
                        <el-col :span="4">
                          Qnt.<br>
                          <input ref="qnt" v-model="qnt" style="width: 100%; margin-top: 5px;" class="el-input__inner" @keypress="isNumber($event)" @keyup.enter="cupom_add()">
                        </el-col>
                        <el-col :span="6">
                          Total<br>
                          <money v-model="product_selected.total" v-bind="money" style="width: 100%; margin-top: 5px; " class="el-input__inner" readonly />
                        </el-col>
                        <el-col :span="3" style="padding-bottom: 15px;"><br>
                          <el-button :disabled="!product_selected.id" circle style="font-size: 22px;" class="filter-item" type="primary" icon="el-icon-plus" @click="cupom_add" />
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
              <!-- /Produto selected -->
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11">
          <el-row :gutter="0">
            <el-col :span="24">
              <!-- Cupom -->
              <el-card id="myelement_" class="box-card" shadow="always" style="height: 551px; background-color: #ffffe6; min-height: 450px">
                <div slot="header" class="clearfix cardtitle">
                  <el-row :gutter="5">
                    <el-col :span="9">
                      <span>Cupom</span>: <span v-if="cupom" style="font-size:10px;">{{cupom.id}}</span> | <span>{{dataUpload_is_ok}}</span> <!--el-button class="bold" @click="caixa().open()" size="mini" round>Sessão</el-button-->
                    </el-col>
                    <el-col :span="15" style="text-align: right; margin-top:3px; font-size: 70%; color: #856514">
                      {{ today }}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <span style="font-family: tahoma; font-size: 70%;">
                        <span class="bold">Usuário:</span> <a @click="caixa().open_panel()">{{ user }}</a><br>
                      </span>
                    </el-col>
                    <el-col :span="12" style="text-align: right;">
                      <span style="font-family: tahoma; font-size: 60%;">
                        <a @click="getCliente">
                          {{ cupom.cliente.nome }} ({{ cupom.cliente.id }})
                        </a>
                      </span>
                    </el-col>
                  </el-row>
                </div>
                <div v-if="cupom.itens.length == 0" class="center" style="vertical-align: middle; width: 100%;"><h1 id="caixa_Status" style="margin-top: 100px;">caixa livre</h1></div>
                <el-row v-if="cupom.itens.length > 0" :gutter="0" class="bold center c" style="width: 100%; margin-top: -5px; margin-bottom: -15px; margin-left:0px;">
                  <el-col :span="2" class="center">#</el-col>
                  <el-col :span="2" class="center">Cod</el-col>
                  <el-col :span="6" class="center">Descrição</el-col>
                  <el-col :span="4" class="center">Preço</el-col>
                  <el-col :span="3" class="center">Uni</el-col>
                  <el-col :span="2" class="center">Qnt</el-col>
                  <el-col :span="4" class="center">Total</el-col>
                  <el-col :span="1" class="center"><i class="el-icon-view" /></el-col>
                </el-row>
                <el-divider v-if="cupom.itens.length > 0" />
                <div id="container" class="cupom_table" style="margin-top:-15px; margin-bottom:-15px; width: 100%; max-height:325px; min-height: 325px; overflow-y: auto;">
                  <el-row v-for="(row, rindex) in cupom.itens" :key="rindex" :gutter="0" :style="{backgroundColor: (rindex % 2 === 0? '' : '#f9f9e0')}" style="width: 100%; margin-left:0px; margin-bottom: 3px; _padding: 5px; _font-size: 19px;">
                    <el-col :span="2" class="center">{{ rindex + 1 }}</el-col>
                    <el-col :span="2" class="center">{{ row.id.toString() }}</el-col>
                    <el-col :span="6" class="center">{{ row.descricao }}<br><span style="font-size:13px;">{{ row.ean }}</span></el-col>
                    <el-col :span="4" class="center">{{ row.pco_venda | money }}</el-col>
                    <el-col :span="3" class="center">{{ row.unidade||'uni' }}</el-col>
                    <el-col :span="2" class="center">{{ row.qnt }}</el-col>
                    <el-col :span="4" class="center">{{ row.total | money }}</el-col>
                    <el-col :span="1" class="center"><i class="el-icon-view" @click="cupomRowView(row)" /></el-col>
                  </el-row>
                </div>
                <el-divider />
                <div id="wrapper" style="margin-top:-7px; font-family: arial; font-size: 27px;">
                  <div class="left bold" style="padding-left: 10px;">
                    <span>Itens: {{ cupom.itens.length }}</span>
                  </div>
                  <div class="right bold">
                    <span>Sub-total: {{ cupom.subtotal | money }}</span>
                  </div>
                </div>
              </el-card>
              <!-- /Cupom -->
            </el-col>
          </el-row>
          <el-row style="margin-top: 1px;">
            <el-col :span="24">
              <!-- Venda Check-out -->
              <el-card class="box-card cardtitle" shadow="always" style="height: 90px; font-family: arial;">
                <div style="height: 200px;">
                  <el-row type="flex" class="row-bg">
                    <el-col :span="24">
                      <el-row :gutter="5" type="flex" class="row-bg" style="_margin-top: 18px">
                        <el-col :span="8">
                          <el-button
                            :disabled="cupom.subtotal <= 0"
                            round
                            style="_height:60px; font-size:22px; width: 100%;"
                            type="danger"
                            @click="vendaCancel()">
                            Cancelar
                          </el-button>
                        </el-col>
                        <el-col :span="16">
                          <el-button round :disabled="cupom.subtotal <= 0" style="_height:60px; font-size:22px; width: 100%;" type="success" icon="el-icon-check" @click="vendaClose">
                            Pagar
                          </el-button>
                        </el-col>
                      </el-row>
                      <br>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
              <!-- /Venda Check-out -->
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <!----  Modals aux windows -->

    <div id="modals">
      <!-- CUPOM view row -->
      <el-dialog :visible.sync="dialogFormCupomView" title="Item do cupom" top="5vh">
        <el-form ref="dataForm" :model="temp2" label-position="right" label-width="140px" style="font-size: 18px;">
          <el-form-item label="#:" prop="n">
            <el-input v-model="temp2.n" readonly />
          </el-form-item>
          <el-form-item label="Código:" prop="ean">
            <el-input v-model="temp2.id" readonly />
          </el-form-item>
          <el-form-item label="Descrição:" prop="descricao">
            <el-input v-model="temp2.descricao" readonly />
          </el-form-item>
          <el-form-item label="Preço unitário:" prop="preco">
            <money v-model="temp2.pco_venda" v-bind="money" class="el-input__inner" readonly />
          </el-form-item>
          <el-form-item label="Unidade:" prop="unidade">
            <el-input v-model="temp2.unidade" readonly />
          </el-form-item>
          <el-form-item label="Quantidade:" prop="qnt">
            <el-input v-model="temp2.qnt" style="width: 100px;" readonly />
          </el-form-item>
          <el-form-item label="Total:" prop="qnt">
            <money v-model="temp2.total" v-bind="money" style="width: 200px;" class="el-input__inner" readonly />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormCupomView = false">
            Fechar
          </el-button>
          <el-button type="danger" @click="handleDelete(temp2)">Excluir</el-button>
        </div>
      </el-dialog>

      <!-- Venda close -->
      <el-dialog :visible.sync="vendaCloseFlg" width="60%" center top="5vh">
        <span slot="title" style="font-size: 25px">Fechamento de venda</span>
        <el-form ref="form" style="font-size: 20px" :model="form" label-width="0px" label-position="top">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>Total da compra</span>
                </div>
                <div>
                  <div style="margin-bottom: 10px">
                    <el-row :gutter="10">
                      <el-col :span="11" style="padding-top: 5px; text-align: right;">
                        Sub-total:
                      </el-col>
                      <el-col :span="13">
                        <money v-model="cupom.subtotal" v-bind="money" class="el-input__inner" readonly />
                      </el-col>
                    </el-row>
                  </div>
                  <div style="margin-bottom: 10px">
                    <el-row :gutter="10">
                      <el-col :span="11" style="padding-top: 5px; text-align: right;">
                        Desconto:
                      </el-col>
                      <el-col :span="13">
                        <money v-model="desconto" v-bind="money" class="el-input__inner" />
                      </el-col>
                    </el-row>
                  </div>
                  <div style="margin-top: 15px; margin-bottom: 15px">
                    <el-row :gutter="10">
                      <el-col :span="11" style="padding-top: 5px; text-align: right;">
                        Total a pagar:
                      </el-col>
                      <el-col :span="13">
                        <money v-model="cupom.subtotal - desconto" style="_font-size: 22px; color: darkblue;" v-bind="money" class="el-input__inner" readonly />
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-card><br>
              <el-collapse v-if="parametros_flg" accordion>
                <el-collapse-item title="Parâmetros" name="1">
                  <el-row :gutter="13">
                    <el-col :span="14" style="_padding-top: 5px; text-align: right;">
                      <div style="font-size: 17px;">Data de referência:</div>
                    </el-col>
                    <el-col :span="10" style="_text-align: right; _padding-top: 3px">
                      <input v-model="date_ref" v-mask="'##/##/####'" type="tel" style="width: 130px; font-size: 20px;">
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>Forma de pagamento</span>
                </div>
                <div>
                  <div style="margin-top: 0px; margin-bottom: 15px">
                    <el-row :gutter="10">
                      <el-col :span="11" style="padding-top: 5px; text-align: right;">
                        Dinheiro:
                      </el-col>
                      <el-col :span="10">
                        <money v-model="pago_dinheiro" v-bind="money" class="el-input__inner" />
                      </el-col>
                      <el-col :span="3">
                        <el-button type="success" icon="el-icon-check" circle @click="pagamento_ops_reset(); pago_dinheiro = (cupom.subtotal - desconto)" />
                      </el-col>
                    </el-row>
                  </div>
                  <div style="margin-bottom: 15px">
                    <el-row :gutter="10">
                      <el-col :span="11" style="padding-top: 5px; text-align: right;">
                        Cartão débito:
                      </el-col>
                      <el-col :span="10">
                        <money v-model="pago_debito" v-bind="money" class="el-input__inner" />
                      </el-col>
                      <el-col :span="3">
                        <el-button type="success" icon="el-icon-check" circle @click="pagamento_ops_reset(); pago_debito = (cupom.subtotal - desconto)" />
                      </el-col>
                    </el-row>
                  </div>
                  <div style="margin-bottom: 15px">
                    <el-row :gutter="10">
                      <el-col :span="11" style="padding-top: 5px; text-align: right;">
                        Cartão crédito:
                      </el-col>
                      <el-col :span="10">
                        <money v-model="pago_credito" v-bind="money" class="el-input__inner" />
                      </el-col>
                      <el-col :span="3">
                        <el-button type="success" icon="el-icon-check" circle @click="pagamento_ops_reset();pago_credito = (cupom.subtotal - desconto)" />
                      </el-col>
                    </el-row>
                  </div>
                  <div v-if="cupom.cliente.id > 1" style="margin-bottom: 15px">
                    <el-row :gutter="10">
                      <el-col :span="11" style="padding-top: 5px; text-align: right;">
                        Faturado:
                      </el-col>
                      <el-col :span="10">
                        <money v-model="pago_faturado" v-bind="money" class="el-input__inner" />
                      </el-col>
                      <el-col :span="3">
                        <el-button type="success" icon="el-icon-check" circle @click="pagamento_ops_reset();pago_faturado = (cupom.subtotal - desconto)" />
                      </el-col>
                    </el-row>
                  </div>

                  <div v-if="pago_falta > 0" style="margin-bottom: 15px">
                    <el-row :gutter="10">
                      <el-col :span="11" style="padding-top: 5px; text-align: right;">
                        Falta pagar:
                      </el-col>
                      <el-col :span="10">
                        <money v-model="pago_falta" v-bind="money" class="el-input__inner" readonly style="background-color: #ffffcc" />
                      </el-col>
                    </el-row>
                  </div>

                  <div v-if="pago_falta <= 0" style="margin-bottom: 15px">
                    <el-row :gutter="10">
                      <el-col :span="11" style="padding-top: 5px; text-align: right;">
                        Troco:
                      </el-col>
                      <el-col :span="10">
                        <money v-model="pago_falta" v-bind="money" class="el-input__inner" readonly style="background-color: #ecf9f2;" />
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button style="font-size: 25px" @click="vendaCloseFlg = false">
            Cancela
          </el-button>
          <el-button v-if="pago_falta <= 0.04" style="margin-left: 10px; width: 250px; font-size: 25px;" type="success" @click="vendaCloseOk();">Confirma</el-button>
        </span>
      </el-dialog>

      <!-- Venda fechada! -->
      <el-dialog :visible.sync="vendaCloseEndFlg" width="70%" center top="5vh">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="text-align: center;">
            <span style="font-size: 30px;">Venda Registrada com sucesso!</span>
          </div>
          <div style="text-align: center;">
            <img src="@/assets/img/ok.png" style="width:200px; height:200px; margin-bottom: 20px;"><br>
            <el-button type="primary" style="width: 200px;" round @click="vendaPrintFlg=true">Imprimir cupom</el-button>
            <el-button type="success" style="width: 200px; z-index: -1;" round autofocus @click="vendaCloseOkFim">Nova venda</el-button>
          </div>
        </el-card>
      </el-dialog>

      <!-- Clientes busca lista -->
      <el-dialog :visible.sync="clientesListFlg" title="Busca cliente" width="70%" align="center">
        <el-input
          ref="searchClient"
          v-model="searchTermClient"
          placeholder="Nome"
          prefix-icon="el-icon-search"
          style="padding: 5px; width: 100%; color: white; font-size: 20px; background-color: #4C5C7A"
          autocomplete="nope"
        />
        <vue-good-table
          :columns="columns_clientes"
          :rows="clientesList"
          :search-options="{enabled: false, externalQuery: searchTermClient}"
          theme="black-rhino"
          max-height="255px"
          @on-row-click="clienteSet"
        />
        <span slot="footer" class="dialog-footer" align="center">
          <!-- <el-button v-if="searchTermClient" type="primary" @click="handleCliente_insert">
            Incluir novo cliente
          </el-button> -->
          <el-button type="primary" @click="clientesListFlg = false">Fechar</el-button>
        </span>
      </el-dialog>

      <!-- Print venda -->
      <el-dialog v-if=info.preferences :visible.sync="vendaPrintFlg" title="Impressão de ticket" width="45%" align="left">
        <span align="center">
          <el-button type="primary" @click="print">Imprimir</el-button>
          <el-button type="primary" @click="vendaPrintClose">Fechar</el-button>
        </span><br><br>
        <div id="myelement" class="receipt">
          <div style="margin-bottom: 10px;" v-bind:style="{fontSize: balcao_pref.cupom_printer.children.header.children.font_size.value}">
            {{balcao_pref.cupom_printer.children.header.children.text.value}}
          </div>
          <div class="cupom_header" v-bind:style="{fontSize: balcao_pref.cupom_printer.children.table_header.value}">
            <b>{{ info.nome_fantasia }}</b><br>CNPJ: {{ info.doc }}<br>
            Data: {{ today }}<br>Cliente: {{ cupom.cliente.nome }} - {{ cupom.cliente.id }}<br>
          </div><br>
          <table style="width: 100%;">
            <tr class="cupom_table_header" style="font-weight: bold;" v-bind:style="{fontSize: balcao_pref.cupom_printer.children.table_rows.value}">
              <td style="width: 20px;">#</td><td style="width: 170px;">Descrição</td><td style="width: 80px;">Preço</td><td style="width: 50px;">Uni</td><td style="width: 40px;">Qnt</td><td style="width: 110px;">Total</td></tr>
            <tr v-for="(value, key) in cupom.itens" :key="key" class="cupom_table_rows" v-bind:style="{fontSize: balcao_pref.cupom_printer.children.table_rows.value}"><td>{{ key+1 }}</td><td>{{ value.ean }} {{ value.descricao }}</td><td>{{ value.pco_venda | money }}</td><td>{{ value.unidade }}</td><td>{{ value.qnt }}</td><td>{{ value.total | money }}</td></tr>
          </table>
          <div v-bind:style="{fontSize: balcao_pref.cupom_printer.children.footer.value}">
            <div v-if="cupom.itens.length" class="cupom_footer" style="margin-top: 10px; text-align: left; font-family: tahoma;" v-bind:style="{fontSize: balcao_pref.cupom_printer.children.footer.value}">
              (Itens: {{ cupom.itens.length }})<br><span class="bold">Sub-total:</span> {{ cupom.subtotal | money }}<br><span class="bold">Desconto:</span> {{ desconto | money }}<br><span class="bold">Total:</span> {{ cupom.subtotal - desconto | money }}
            </div>
            <div class="cupom_footer" style="margin-top: 10px;" v-bind:style="{fontSize: balcao_pref.cupom_printer.children.footer.value}">
              <span class="bold">Forma de pagamento:</span><br>
              <div style="margin-top: 5px;">
                <div v-if="pago_dinheiro"><span class="bold">Dinheiro:</span> {{ pago_dinheiro | money }}</div>
                <div v-if="pago_debito"><span class="bold">Cartão de débito:</span> {{ pago_debito | money }}</div>
                <div v-if="pago_credito"><span class="bold">Cartão de crédito:</span> {{ pago_credito | money }}</div>
                <div v-if="pago_faturado"><span class="bold">Faturado:</span> {{ pago_faturado | money }}</div>
              </div>
            </div>
            <div class="cupom_footer" v-bind:style="{fontSize: balcao_pref.cupom_printer.children.footer.value}">
              <p>{{balcao_pref.cupom_printer.children.goodby_message.value}}</p>
            </div>
          </div>
        </div>
      </el-dialog>

      <!-- Caixa status -->
      <modal name="modal_caixa_op" :click-to-close="false" :width="700" :height="570" :adaptive="true">
        <div style="padding:20px;">
          <div class="center" style="font-size: 25px; padding-bottom: 30px;">Operação de Caixa</div>
          <div style="font-size: 20px;">
            <table style="width: 100%; margin: auto;" border="0">
              <tr>
                <td class="bold_" style="width: 33%; background-color: #f0f0f5; text-align: center; important!; padding: 10px;">Data:<br>{{ today }}</td>
                <!-- <td style="padding: 5px;">{{today}}</td> -->

                <td class="bold_" style="width: 33%; background-color: #f0f0f5; text-align: center; important!; padding: 10px;">Usuário:<br>{{ user }}</td>
                <!-- <td style="padding: 5px;">{{user}}</td> -->

                <td class="bold_" style="width: 33%; background-color: #f0f0f5; text-align: center; important!; padding: 10px;">Posição:<br>{{ caixa_.status | caixa_op_filter }}</td>
                <!-- <td style="padding: 5px;">{{caixa_.status | caixa_op_filter}}</td> -->
              </tr>
              <tr><td colspan="3">&nbsp;</td></tr>
              <tr>
                <td colspan="3" style="_padding: 5px;">

                  <el-tabs type="card" @tab-click="caixa_op">
                    <el-tab-pane :disabled="caixa_.status == 'opened'" label="Abertura">
                      <table v-if="caixa_.status !== 'opened'" style="width: 100%">
                        <tr>
                          <td class="bold" style="text-align: right; important!">Valor:</td>
                          <td style="padding: 5px;">
                            <money v-model="caixa_open_value" v-bind="money" class="el-input__inner" :readonly="caixa_op_selected=='fechamento'" />
                          </td>
                        </tr>
                        <tr>
                          <td class="bold" style="text-align: right; important!">Obs:</td>
                          <td style="padding: 5px;">
                            <el-input
                              v-model="caixa_status_op_obs"
                              type="textarea"
                              :rows="4"
                              placeholder=""
                              style="font-size: 18px; width: 100%;"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="text-align: center; _height: 70px; padding-top: 15px;">
                            <el-button  type="success" style="width: 100%; font-size: 30px; margin-bottom: 5px;" @click="caixa_op_ok">Confirma</el-button><br>
                            <el-button type="primary" style="width: 100%; " :disabled="caixa_.status=='closed'" @click="caixa().close()">Cancela</el-button>
                          </td>
                        </tr>

                      </table>
                    </el-tab-pane>
                    <el-tab-pane :disabled="caixa_.status == 'closed'" label="Reforço">
                      <table style="width: 100%">
                        <tr>
                          <td class="bold" style="text-align: right; important!">Valor:</td>
                          <td style="padding: 5px;">
                            <money v-model="caixa_op_value" v-bind="money" class="el-input__inner" :readonly="caixa_op_selected=='fechamento'" />
                          </td>
                        </tr>
                        <tr>
                          <td class="bold" style="text-align: right; important!">Obs:</td>
                          <td style="padding: 5px;">
                            <el-input
                              v-model="caixa_status_op_obs"
                              type="textarea"
                              :rows="4"
                              placeholder="Motivo"
                              style="font-size: 18px; width: 100%;"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="text-align: center; _height: 70px; padding-top: 15px;">
                            <el-button v-if="aux_caixa_op" type="success" style="width: 100%; font-size: 30px; margin-bottom: 5px;" @click="caixa_op_ok">Confirma</el-button><br>
                            <el-button type="primary" style="width: 100%; " :disabled="caixa_.status=='closed'" @click="caixa().close()">Cancela</el-button>
                          </td>
                        </tr>
                      </table>
                    </el-tab-pane>
                    <el-tab-pane :disabled="caixa_.status == 'closed'" label="Sangria">
                      <table style="width: 100%">
                        <tr>
                          <td class="bold" style="text-align: right; important!">Valor:</td>
                          <td style="padding: 5px;">
                            <money v-model="caixa_op_value" v-bind="money" class="el-input__inner" />
                          </td>
                        </tr>
                        <tr>
                          <td class="bold" style="text-align: right; important!">Obs:</td>
                          <td style="padding: 5px;">
                            <el-input
                              v-model="caixa_status_op_obs"
                              type="textarea"
                              :rows="4"
                              placeholder="Motivo"
                              style="font-size: 18px; width: 100%;"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="text-align: center; _height: 70px; padding-top: 15px;">
                            <el-button v-if="aux_caixa_op" type="success" style="width: 100%; font-size: 30px; margin-bottom: 5px;" @click="caixa_op_ok">Confirma</el-button><br>
                            <el-button type="primary" style="width: 100%; " :disabled="caixa_.status=='closed'" @click="caixa().close()">Cancela</el-button>
                          </td>
                        </tr>
                      </table>

                    </el-tab-pane>
                    <el-tab-pane :disabled="caixa_.status == 'closed'" label="Fechamento">
                      <table style="width: 100%">
                        <tr>
                          <td class="bold" style="text-align: right; important!">Dinheiro:</td>
                          <td style="padding: 5px;">
                            {{ caixa_fechamento_value.dinheiro }}
                            <!-- <money v-model="caixa_fechamento_value.dinheiro" v-bind="money" class="el-input__inner" readonly="true" /> -->
                          </td>
                        </tr>
                        <tr>
                          <td class="bold" style="text-align: right; important!">Cartão:</td>
                          <td style="padding: 5px;">
                            {{ caixa_fechamento_value.cartao | money }}
                            <!-- <money v-model="caixa_fechamento_value.cartao" v-bind="money" class="el-input__inner" readonly="true" /> -->
                          </td>
                        </tr>
                        <tr>
                          <td class="bold" style="text-align: right; important!">Faturado:</td>
                          <td style="padding: 5px;">
                            {{ caixa_fechamento_value.faturado | money }}
                            <!-- <money v-model="caixa_fechamento_value.faturado" v-bind="money" class="el-input__inner" readonly="true" /> -->
                          </td>
                        </tr>
                        <tr>
                          <td class="bold" style="text-align: right; important!">Total:</td>
                          <td style="padding: 5px;">
                            {{ caixa_fechamento_value.dinheiro + caixa_fechamento_value.cartao + caixa_fechamento_value.faturado }}
                            <!-- <money v-model="caixa_fechamento_value.faturado" v-bind="money" class="el-input__inner" readonly="true" /> -->
                          </td>
                        </tr>
                        <tr>
                          <td class="bold" style="text-align: right; important!">Obs:</td>
                          <td style="_padding: 5px;">
                            <el-input
                              v-model="caixa_status_op_obs"
                              type="textarea"
                              :rows="2"
                              placeholder="obs"
                              style="font-size: 18px; width: 100%;"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="text-align: center; _height: 70px; padding-top: 15px;">
                            <el-button v-if="aux_caixa_op" type="success" style="width: 100%; font-size: 30px; margin-bottom: 5px;" @click="caixa_op_ok">Confirma</el-button><br>
                            <el-button type="primary" style="width: 100%; " :disabled="caixa_.status=='closed'" @click="caixa().close()">Cancela</el-button>
                          </td>
                        </tr>
                      </table>
                    </el-tab-pane>
                  </el-tabs>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </modal>

      <!-- Data upload -->
      <modal name="modal_data_upload" :click-to-close="false" :width="400" :height="250" :adaptive="true">
        <p style="text-align: center;">Enviar dados para o servidor</p>
        <el-button type="success" style="width: 100%; font-size: 30px; margin-bottom: 5px;" @click="caixa_close_upload">Enviar</el-button>
      </modal> 
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { getToken } from '@/utils/auth'
import { getInfo } from '@/api/user'
import { fetchList, create } from '@/api/generic'
import { vendaClose } from '@/api/vendaClose'
import waves from '@/directive/waves' // waves directive
import { Money } from 'v-money'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import { Printd } from 'printd'
import Autocomplete from '@/components/Autocomplete'
import magaform from '@/components/Magaform'
// import ProductsThumbGridItem from '@/components/ProductsThumbGridItem'
import moment from 'moment'
import swal from 'sweetalert'

export default {
  name: 'Balcao',
  components: { magaform, Money, VueGoodTable, Autocomplete, swal, moment },
  directives: { waves, money: Money },
  filters: {
    caixa_op_filter(op) {
      if (op == 'opened') return 'Aberta'
      if (op == 'closed') return 'Fechada'
    },

    money(value) {
      if (typeof value !== 'number') {
        return value
      }
      var formatter = new Intl.NumberFormat([], {
        style: 'currency',
        currency: 'BRL'
      })
      return formatter.format(value)
    }
  },
  data() {
    return {
      modal_data_upload: false,
      dataUpload_is_ok: false,
      dataUpload_status: false,
      corrent_user_info: {},
      som1: new Audio(require('@/assets/audio/zapsplat_multimedia_button_click_006_53867.mp3')),
      caixastatus: [],
      vendas: [],
      preferences: {},
      balcao_pref: null,
      info: {
        nome_fantasia: null,
        doc: null
      },
      EAN: null,
      caixa_open_value: 0,
      caixa_fechamento_value: {
        dinheiro: 0,
        cartao: 0,
        faturado: 0
      },
      caixa_display: null,
      caixa_status_op_obs: null,
      caixa_op_selected: null,
      caixa_op_value: 0,
      freeToClose: false,
      m: {},
      item: null,
      lines: [],
      caixaSession: null,
      aux_caixa_op: null,
      caixa_: {
        created: null,
        session: null,
        status: 'closed',
        op: null,
        value: 0
      },
      parametros_flg: true,
      vendaCloseEndFlg: false,
      date_ref: null,
      source: null,
      atalhos: {
        ativo: true,
        itens: [
          'tomate', 'cebola', 'alho', 'pimentao', 'limao', 'banana prata', 'banana nanica', 'banana terra', 'laranja', 'mamão papaia', 'abacaxi', 'maça',
          'manga', 'pera', 'batatinha', 'chuchu', 'cenoura', 'beterraba', 'uva sem semente', 'repolho', 'pepino', 'melancia grande',
          'melão', 'abacate', 'kiwi', 'coco verde', 'quiabo', 'inhame', 'ovos cartela', 'berinjela', 'limao siciliano',
          'abobrinha', 'abobora japonesa', 'goiaba', 'alface crespa', 'rucula', 'salsa', 'coentro', 'couve', 'hortelan'
        ]
      },
      value: null,
      user: null,
      novoItem: true,
      today_timestamp: null,
      today: null,
      vendaPrintFlg: false,
      produtos_: [],
      cupom: {
        date: null,
        cliente: {
          id: 1,
          nome: 'Cliente'
        },
        itens: [],
        itens_n: 0,
        subtotal: null,
        desconto: null,
        total: null
      },
      dialogFormCupomView: false,
      product_selected: {
        qnt: 0,
        total: 0
      },
      columns_clientes: [
        {
          label: 'Código',
          field: 'id',
          width: '100px'
        },
        {
          label: 'Nome',
          field: 'nome',
          type: 'string'
        }
      ],
      columns_cupom: [
        {
          label: 'Cod',
          field: 'id'
        },
        {
          label: 'Descricao',
          field: 'descricao',
          type: 'string'
        },
        {
          label: 'Preço ',
          field: 'pco_venda',
          type: 'decimal'
          // dateInputFormat: 'yyyy-MM-dd',
          // dateOutputFormat: 'MMM Do yy',
        },
        {
          label: 'Quantidade',
          field: 'qnt',
          type: 'decimal'
          // dateInputFormat: 'yyyy-MM-dd',
          // dateOutputFormat: 'MMM Do yy',
        },
        {
          label: 'Unidade',
          field: 'unidade',
          type: 'string'
        },
        {
          label: 'Total',
          field: 'total',
          type: 'decimal'
        }
      ],
      columns: [
        {
          label: 'Cod',
          field: 'id'
        },
        {
          label: 'Descricao',
          field: 'descricao',
          type: 'string'
        },
        {
          label: 'Preço',
          field: 'pco_venda',
          type: 'decimal'
        },
        {
          label: 'Unidade',
          field: 'unidade',
          type: 'string'
        }
      ],
      caixaStatus_: {
        data: new Date().toLocaleString('pt-BR'),
        usuario: this.$store.getters.name,
        operacao: 'abertura',
        valor: 0
      },
      msgMain: { txt: 'Caixa livre', color: 'green' },
      produtos: [],
      searchClient: null,
      searchTermClient: null,
      clientesList: [],
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      form: {},
      valor_pago: 0,
      pago_troco: 0,
      pago_dinheiro: 0,
      pago_debito: 0,
      pago_credito: 0,
      pago_faturado: 0,
      pago_falta: 0,
      total_a_pagar: 0,
      desconto: 0,
      acrescimo: 0,
      vendaCloseFlg: false,
      clientesListFlg: false,
      qnt: null,
      temp2: {
        n: 0,
        id: 0
      }
    }
  },
  watch: {
    qnt: function() {
      console.log('this.qnt:', this.qnt)
      if (this.qnt) {
        this.qnt = this.qnt ? this.qnt.toString().replace(',', '.') : ''
        this.product_selected.qnt = this.qnt
        this.product_selected.total = this.product_selected.qnt * this.product_selected.pco_venda
      }
    },
    desconto: function() {
      if (this.desconto > this.cupom.subtotal) {
        return this.cupom.total
      } else {
        this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
        this.pago_falta = this.cupom.subtotal - this.desconto - this.valor_pago
      }
    },
    pago_dinheiro: function() {
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.subtotal - this.desconto - this.valor_pago
    },
    pago_debito: function() {
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.subtotal - this.desconto - this.valor_pago
    },
    pago_credito: function() {
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.subtotal - this.desconto - this.valor_pago
    },
    pago_faturado: function() {
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.subtotal - this.desconto - this.valor_pago
    }
  },
  mounted(){
    this.server_data_load()
    this.local_data_load('caixastatus')
    this.local_data_load('vendas')
  },
  mounted_() {
    //If online get the server databank values
    if (navigator.onLine){
       this.databank_load()
      //  this.vai()
      }else{  
        //Get info (if already exists)
        if (localStorage.getItem(getToken()+'.info')) {
          try {
            this.info = JSON.parse(localStorage.getItem(getToken()+'.info'));
            this.info_data_adjustes()
            console.log('localStorage, this.info:', this.info);
          } catch(e) {
            localStorage.removeItem(getToken()+'.info');
          }
        }
        
        //Get clientesList (if already exists)
        if (localStorage.getItem(getToken()+'.clientesList')) {
          try {
            this.clientesList = JSON.parse(localStorage.getItem(getToken()+'.clientesList'));
            this.produtos_data_adjustes()
            console.log('localStorage, this.clientesList:', this.clientesList);
         } catch(e) {
            localStorage.removeItem(getToken()+'.clientesList');
          }
        }

        //Check produtos (if already exists)
        if (localStorage.getItem(getToken()+'.produtos')) {
          try {
            this.produtos = JSON.parse(localStorage.getItem(getToken()+'.produtos'));
            console.log('localStorage, this.produtos:', this.produtos);
          } catch(e) {
            localStorage.removeItem(getToken()+'.produtos');
          }
        }

         //Check vendas (if already exists)
        if (localStorage.getItem(getToken()+'.vendas')) {
          try {
            this.vendas = JSON.parse(localStorage.getItem(getToken()+'.vendas'));
            console.log('localStorage, this.vendas:', this.vendas);
          } catch(e) {
            localStorage.removeItem(getToken()+'.vendas');
          }
        }

         //Check caixa status (if already exists)
        if (localStorage.getItem(getToken()+'.caixastatus')) {
          try {
            this.caixastatus = JSON.parse(localStorage.getItem(getToken()+'.caixastatus'));
            console.log('localStorage, this.caixastatus:', this.caixastatus);
          } catch(e) {
            localStorage.removeItem(getToken()+'.caixastatus');
          }
        }
    }
  },
  created() {
    this.updateDateTime()
    // this.getUser()
    // this.caixa().get()
    window.addEventListener('keydown', (e) => {
      if (e.key == 'F2') {
        e.preventDefault()
        this.vendaClose()
      }
    })
  },
  methods: {
    caixastatus_plus(val){
      this.caixastatus.push(JSON.parse(JSON.stringify(val)))
    },
    local_data_load(table){ 
      var self = this
      switch (table) {
        case 'corrent_user_info':
          console.log('>', table)
          //Get info (if already exists)
          if (localStorage.getItem(getToken()+'.corrent_user_info')) {
            try {
              this.corrent_user_info = localStorage.getItem(getToken()+'.corrent_user_info');
              console.log('this.corrent_user_info:', this.corrent_user_info);
            } catch(e) {
              localStorage.removeItem(getToken()+'.corrent_user_info');
            }
          }
          break;
        case 'info':
          console.log('>', table)
          //Get info (if already exists)
          if (localStorage.getItem(getToken()+'.info')) {
            try {
              this.info = JSON.parse(localStorage.getItem(getToken()+'.info'));
              this.info_data_adjustes()
              console.log('localStorage, this.info:', this.info);
            } catch(e) {
              localStorage.removeItem(getToken()+'.info');
            }
          }
          break;
        case 'clientes':
          console.log('>', table)
          //Get clientesList (if already exists)
          if (localStorage.getItem(getToken()+'.clientesList')) {
        try {
          this.clientesList = JSON.parse(localStorage.getItem(getToken()+'.clientesList'));
          console.log('localStorage, this.clientesList:', this.clientesList);
        } catch(e) {
          localStorage.removeItem(getToken()+'.clientesList');
        }
      }
          break;
        case 'produtos':  
          console.log('>', table)
          //Check produtos (if already exists)
          if (localStorage.getItem(getToken()+'.produtos')) {
            try {
              this.produtos = JSON.parse(localStorage.getItem(getToken()+'.produtos'));
              console.log('localStorage, this.produtos:', this.produtos);
              this.produtos_data_adjustes()
            } catch(e) {
              localStorage.removeItem(getToken()+'.produtos');
            }
          }
          break;
        case 'vendas':
          console.log('>', table) 
          //Check vendas (if already exists)
          if (localStorage.getItem(getToken()+'.vendas')) {
            try {
              this.vendas = JSON.parse(localStorage.getItem(getToken()+'.vendas'));
              console.log('localStorage, this.vendas:', this.vendas);
            } catch(e) {
              alert()
              localStorage.removeItem(getToken()+'.vendas');
            }
          }
          break;
        case 'caixastatus':
            console.log('>', table)
            //Check caixa status (if already exists)
            if (localStorage.getItem(getToken()+'.caixastatus')) {
            try {
              self.caixastatus = JSON.parse(localStorage.getItem(getToken()+'.caixastatus'));
              console.log('localStorage, self.caixastatus:', self.caixastatus);
              self.caixa_ = self.caixastatus[self.caixastatus.length-1]
            } catch(e) {
              localStorage.removeItem(getToken()+'.caixastatus');
            }
          }
          break;
        default:
          console.log('default>', table)
          this.local_data_load('corrent_user_info')
          this.local_data_load('info')
          this.local_data_load('clientes')
          this.local_data_load('produtos')
          this.local_data_load('vendas')
          this.local_data_load('caixastatus')
      }
    },
    server_data_load(table){
      var self = this
      console.log(table);
      switch (table){
        case 'corrent_user_info':
          //Get current usuario data
          getInfo().then(function(x) {
            self.corrent_user_info = x.data
            self.user = x.data.name
            console.log('self.corrent_user_info:', self.corrent_user_info);
            // Clean up register
            if (localStorage.getItem(getToken()+'.corrent_user_info')) {
              localStorage.removeItem(getToken()+'.corrent_user_info');
            }
            // Set local item 
            localStorage.setItem(getToken()+'.corrent_user_info', self.corrent_user_info);
          })
          break;
        case 'info':
          // Load enterprise info
          fetchList('info', '').then(response => {
            self.info = response.data.items[0]
            console.log('self.info:', self.info);
            //Save in local storage
            const parsed = JSON.stringify(self.info);
            localStorage.setItem(getToken()+'.info', parsed);
            self.info_data_adjustes()
            // this.vai()
          })
          break;
        case 'caixa_status':
          fetchList('caixa_status',
              { find: { 'token': getToken() }, page: 1, limit: 1, sort: 'id DESC' }
          ).then(response => {
            if (response.data.items[0]) {
              console.log('caixa_status:', response.data.items[0])
              self.caixastatus = response.data.items
              self.caixa_ = response.data.items[0]
              if (self.caixa_.status == 'opened') {
                self.caixaSession = self.caixa_.session
                // Load vendas
                fetchList('vendas',
                  { find: { 'session': self.caixaSession } }
                ).then(response => {
                  fetchList('vendas', { find: { session: self.caixaSession }}).then(response => {
                    self.vendas = response.data.items
                    console.log('self.vendas:', self.vendas)
                    //Save in local storage
                    const parsed = JSON.stringify(self.vendas);
                    localStorage.setItem(getToken()+'.vendas', parsed);
                  })
                })
              }
              delete self.caixa_.id
              // if (self.caixa_.status == 'closed') {
              //   self.caixa_op({ label: 'Abertura' })
              //   self.$modal.show('modal_caixa_op')
              // }
            }else{
              //Since caixa_status doesn't exist in server most open to begin day work
              if (localStorage.getItem(getToken()+'.caixa_status')) {
                localStorage.removeItem(getToken()+'.caixa_status');
              }
              self.caixa_op({ label: 'Abertura' })
              self.$modal.show('modal_caixa_op')
            }
          }).catch(function(error) {
           console.log(error)
          })
          break;
        case 'clientes':
          // Load clients list
          fetchList('clientes', '').then(response => {
            console.log('clientesList:', response.data)
            this.clientesList = response.data.items
            //Save in local storage
            const parsed = JSON.stringify(this.clientesList);
            localStorage.setItem(getToken()+'.clientesList', parsed);
          })
          break;
        case 'produtos':
          // Load products list
          fetchList('produtos', '').then(response => {
            this.produtos = response.data.items
            console.log('this.produtos:', this.produtos)
            for (var t = 0; t < this.produtos.length; t++) {
              if (this.produtos[t].descricao) {
                this.produtos[t].descricao = this.produtos[t].descricao.replace(/\s+/g, ' ').trim()
              }
            }   
            this.produtos_data_adjustes()
            //Save in local storage
            const parsed = JSON.stringify(this.produtos);
            localStorage.setItem(getToken()+'.produtos', parsed);
            this.produtos_data_adjustes()
            //Define 'diversos' item
            this.diversos_set()
          })
          break;
        default:
          self.server_data_load('corrent_user_info')
          self.server_data_load('info')
          //self.server_data_load('caixa_status')
          self.server_data_load('clientes')
          self.server_data_load('produtos')
      } 
    },
    info_data_adjustes(){
      //info
      this.info.preferences = JSON.parse(this.info.preferences)
      console.log('..>', this.info.preferences);
      this.balcao_pref = this.info.preferences.children.balcao.children
    },
    produtos_data_adjustes(){
      //produtos
      this.produtos_ = this.produtos.map(function(item) {
        return { id: item.id, name: item.descricao ? item.descricao.replace(/\s+/g, ' ').trim() : '' }
      })
    },
    diversos_set() {
      this.qnt = 1
      this.product_selected.id = 5429
      this.product_selected.descricao = 'diversos'
      this.product_selected.pco_venda = 0
      this.product_selected.unidade = 'Uni'
      this.product_selected.total = 0
    },
    img_mini(value) {
      if (value) {
        var img = '/assets/img/produtos/noimg.png'
        value = value.trim().replace(/\s/g, '')
        value = value.replace('ã', 'a')
        value = value.replace('ç', 'c')
        img = '/assets/img/produtos/' + value + '.png'
        // console.log('img:', img);
        return img
        // console.log('img_mini > value:', value);
        // var a = this.produtos.filter(item => item.descricao == value)[0]
        // if (a) {
        //   console.log('a.img_mini:', a.img_mini);
        //   return a.img_mini
        // }
      }
    },
   
    caixa_open(){
      var self = this
      swal("Abertura de caixa:", {
        content: "input",
      })
      .then((value) => {
        //swal(`You typed: ${value}`);
         //Zera caixastatus e vendas
        self.vendas = []
        localStorage.removeItem(getToken()+'.vendas');

        self.caixastatus = []
        localStorage.removeItem(getToken()+'.caixastatus');
        
        // process data
        self.caixa_.id = getToken() + '|' + (+new Date())
        self.caixa_.created = self.today_timestamp
        self.caixa_.token = getToken()
        self.caixa_.status = 'opened'
        self.caixa_.op = 'open'
        self.caixa_.session = getToken() + '-' + self.today_timestamp
        self.caixa_.value = value
        // self.caixa_.obs = self.caixa_status_op_obs
        console.log(self.caixa_)
        //Insert in memory
        self.caixastatus.push(JSON.parse(JSON.stringify(self.caixa_)))
        //Insert in local storage
        const parsed = JSON.stringify(self.caixastatus);
        localStorage.setItem(getToken()+'.caixastatus', parsed);
      });
    },
    caixa_reforco(){
      var self = this
      swal("Reforço de caixa:", {
        content: "input",
      })
      .then((value) => {
        // process data
        self.caixa_.id = getToken() + '|' + (+new Date())
        self.caixa_.created = self.today_timestamp
        self.caixa_.token = getToken()
        self.caixa_.status = 'opened'
        self.caixa_.op = 'reforco'
        self.caixa_.session = self.caixa_.session
        self.caixa_.value = value
        // self.caixa_.obs = self.caixa_status_op_obs
        console.log(self.caixa_)
        //Insert in memory
        self.caixastatus.push(JSON.parse(JSON.stringify(self.caixa_)))
        //Insert in local storage
        localStorage.removeItem(getToken()+'.caixastatus');
        const parsed = JSON.stringify(self.caixastatus);
        localStorage.setItem(getToken()+'.caixastatus', parsed);
      });
    },
    caixa_sangria(){
      var self = this
      swal("Sangria de caixa:", {
        content: "input",
      })
      .then((value) => {
        // process data
        self.caixa_.id = getToken() + '|' + (+new Date())
        self.caixa_.created = self.today_timestamp
        self.caixa_.token = getToken()
        self.caixa_.status = 'opened'
        self.caixa_.op = 'sangria'
        self.caixa_.session = self.caixa_.session
        self.caixa_.value = value * -1
        // self.caixa_.obs = self.caixa_status_op_obs
        console.log(self.caixa_)
        //Insert in memory
        self.caixastatus.push(JSON.parse(JSON.stringify(self.caixa_)))
        //Insert in local storage
        localStorage.removeItem(getToken()+'.caixastatus');
        const parsed = JSON.stringify(self.caixastatus);
        localStorage.setItem(getToken()+'.caixastatus', parsed);
      });
    },
    caixa_close(){
      var self = this
      swal("Fechamento de caixa:", {
        content: "input",
      })
      .then((value) => {

        var total_parcial = self.caixastatus.map(a => +a.value).reduce(function(t, c) {return t + c}, 0)
        console.log('total_parcial:', total_parcial);

        var vendas_da_sessao = self.vendas.filter(x => x.session === self.caixa_.session)
        console.log('vendas_da_sessao:', vendas_da_sessao);

        var amountByPaymentType = {
          dinheiro(item) {
            console.log(+item.dinheiro)
            // return JSON.parse(item.pagamento).dinheiro
            return +item.dinheiro
          },
          debito(item) {
            console.log(+item.debito)
            // return JSON.parse(item.pagamento).debito
            return +item.debito
          },
          credito(item) {
            console.log(+item.credito)
            // return JSON.parse(item.pagamento).credito
            return +item.credito
          },
          faturado(item) {
            console.log(+item.faturado)
            // return JSON.parse(item.pagamento).faturado
            return +item.faturado
          }
        }

        var total_vendido = {
          dinheiro: vendas_da_sessao.map(amountByPaymentType.dinheiro).reduce((a, b) => a + b, 0),
          debito: vendas_da_sessao.map(amountByPaymentType.debito).reduce((a, b) => a + b, 0),
          credito: vendas_da_sessao.map(amountByPaymentType.credito).reduce((a, b) => a + b, 0),
          faturado: vendas_da_sessao.map(amountByPaymentType.faturado).reduce((a, b) => a + b, 0)
        }

        self.caixa_fechamento_value = {
          dinheiro: total_vendido.dinheiro + total_parcial,
          cartao: total_vendido.debito + total_vendido.credito,
          faturado: total_vendido.faturado
        }

        // process data
        self.caixa_.id = getToken() + '|' + (+new Date())
        self.caixa_.created = self.today_timestamp
        self.caixa_.token = getToken()
        self.caixa_.status = 'close'
        self.caixa_.op = 'fechamento'
        self.caixa_.session = self.caixa_.session
        self.caixa_.value = JSON.stringify(self.caixa_fechamento_value)
        // self.caixa_.obs = self.caixa_status_op_obs
        console.log(self.caixa_)
        //Insert in memory
        self.caixastatus.push(JSON.parse(JSON.stringify(self.caixa_)))
        //Insert in local storage
        localStorage.removeItem(getToken()+'.caixastatus');
        const parsed = JSON.stringify(self.caixastatus);
        localStorage.setItem(getToken()+'.caixastatus', parsed);
        
        //reset caixa_
        // self.caixa_ = {}

        //self.$modal.show('modal_data_upload')
      });
    },
    caixa_upload(){
      this.$modal.show('modal_data_upload')
    },
    caixa() {
      var self = this
      return {
        open_panel() {
          self.$modal.show('modal_caixa_op')
        },
        open() {
          // self.caixa_op = null
          // console.log('1>self.caixastatus:', self.caixastatus);
          self.caixa_open_value = 0
          self.caixa_op({ label: 'Abertura' })
          self.$modal.show('modal_caixa_op')
        },
        close() {
          console.log(self.caixa_op)
          self.$modal.hide('modal_caixa_op')
        },
        get(f) {
          //Off-line
          //check local storage
          if (self.caixastatus.length == 0){
            if (localStorage.getItem(getToken()+'.caixastatus')) {
              try {
                self.caixastatus = JSON.parse(localStorage.getItem(getToken()+'.caixastatus'));
                self.caixa_ = self.caixastatus[self.caixastatus.length-1]
              } catch(e) {
                localStorage.removeItem(getToken()+'.caixastatus');
              }
            }
          }

          console.log('self.caixa_:',self.caixa_);

          if (self.caixa_) {
            if (self.caixa_.status == 'opened') {
              self.caixaSession = self.caixa_.session
            }
            delete self.caixa_.id
            if (self.caixa_.status == 'closed') {
              console.log('self.caixa_.status:', self.caixa_.status)
              self.caixa_op({ label: 'Abertura' })
              self.$modal.show('modal_caixa_op')
            }
          } else {
            self.caixa_op({ label: 'Abertura' })
          }


          //On-line
          // fetchList(
          //   'caixa_status',
          //   { find: { 'token': getToken() }, page: 1, limit: 1, sort: 'id DESC' }
          // ).then(response => {
          //   if (response.data.items[0]) {
          //     console.log('caixa_status:', response.data.items[0])
          //     self.caixa_ = response.data.items[0]
          //   }
          //   if (self.caixa_) {
          //     if (self.caixa_.status == 'opened') {
          //       self.caixaSession = self.caixa_.session
          //     }
          //     delete self.caixa_.id
          //     if (self.caixa_.status == 'closed') {
          //       console.log('self.caixa_.status:', self.caixa_.status)
          //       // self.caixa_op = null
          //       self.caixa_op({ label: 'Abertura' })
          //       self.$modal.show('modal_caixa_op')
          //     }
          //   } else {
          //     console.log('pp')
          //     self.caixa_op({ label: 'Abertura' })
          //   }
          // }).catch(function(error) {
          //   console.log(error)
          // })
        },
        set(obj) {
          console.log('set: (obj)', obj)
          self.caixa_ = obj

          //Off-line local storage
          console.log('1>self.caixastatus:', self.caixastatus);
              
          // self.caixastatus.push(obj)       
          self.caixastatus_plus(obj)
         
          // self.caixastatus.push(obj)
          const parsed = JSON.stringify(self.caixastatus);
          localStorage.setItem(getToken()+'.caixastatus', parsed);

          console.log('2>self.caixastatus:', self.caixastatus);
          //Save operation in databank
          // create('caixa_status', obj).then((ret) => {
          //   console.log('ret:', ret)
          // })
        }
      }
    },
    caixa_op(x) {
      var self = this
      var op = x.label
      console.log('op:', op)
   
        
        self.caixa_op_value = 0
        self.caixa_status_op_obs = ''
        self.caixa_op_selected = op
        if (op == 'Fechamento') {
          //off-line
          console.log('self.caixastatus:', self.caixastatus);
          /// Calcula totais
         
          var open_ = self.caixastatus.find(function(item) {
            return item.op == 'open'
          }).value
          console.log('open_:', open_);
          
          // Get reforco total
          var total_parcial = self.caixastatus.map(a => a.value).reduce(function(t, c) {return t + c}, 0)
          console.log('total_parcial:', total_parcial);

          // var reforco_ = self.caixastatus.filter(function(item) {
          //   return item.op == 'reforco'
          // }).map(a => a.value).reduce(function(t, c) {return t + c}, 0)
          // console.log('reforco_:', reforco_);
          
          // // Get sangria total
          // var sangria_array = self.caixastatus.filter(function(item) {
          //   return item.op == 'sangria'
          // }).map(a => a.value)
          // console.log('sangria_array:', sangria_array);

          // var sangria_ = self.caixastatus.filter(function(item) {
          //   return item.op == 'sangria'
          // }).map(a => a.value).reduce((a, b) => a + b, 0)
          // console.log('sangria_:', sangria_);
          
          // // Calcula o total parcial
          // var total_parcial = (open_||0) + (reforco_||0) - (sangria_||0)
          // console.log('total_parcial:', total_parcial);

          ///Calcula o total de vendas da sessão do caixa
        
          // self.vendas = JSON.parse(self.vendas)
         
          var vendas_da_sessao = self.vendas.filter(x => x.session === self.caixa_.session)
          console.log('vendas_da_sessao:', vendas_da_sessao);
          var amountByPaymentType = {
            dinheiro(item) {
              console.log(+item.dinheiro)
              // return JSON.parse(item.pagamento).dinheiro
              return +item.dinheiro
            },
            debito(item) {
              console.log(+item.debito)
              // return JSON.parse(item.pagamento).debito
              return +item.debito
            },
            credito(item) {
              console.log(+item.credito)
              // return JSON.parse(item.pagamento).credito
              return +item.credito
            },
            faturado(item) {
              console.log(+item.faturado)
              // return JSON.parse(item.pagamento).faturado
              return +item.faturado
            }
          }
          var total_vendido = {
            dinheiro: vendas_da_sessao.map(amountByPaymentType.dinheiro).reduce((a, b) => a + b, 0),
            debito: vendas_da_sessao.map(amountByPaymentType.debito).reduce((a, b) => a + b, 0),
            credito: vendas_da_sessao.map(amountByPaymentType.credito).reduce((a, b) => a + b, 0),
            faturado: vendas_da_sessao.map(amountByPaymentType.faturado).reduce((a, b) => a + b, 0)
          }
          self.caixa_fechamento_value = {
            dinheiro: total_vendido.dinheiro + total_parcial,
            cartao: total_vendido.debito + total_vendido.credito,
            faturado: total_vendido.faturado
          }
          self.caixa_op_value = self.caixa_fechamento_value.dinheiro

          console.log('total_vendido:', total_vendido);
          console.log('local:self.caixa_op_value:', self.caixa_op_value)


          // Get open value
          // fetchList('caixa_status', { tipo: 0, fields: ['op', 'created', 'sum(value) tot'], find: { session: self.caixaSession }, groupby: 'op' }).then(response => {
          //   console.log('response.data>:', response.data)

          //   var open_ = response.data.items.filter(function(item) {
          //     return item.op == 'open'
          //   })
          //   var reforco_ = response.data.items.filter(function(item) {
          //     return item.op == 'reforco'
          //   })
          //   var sangria_ = response.data.items.filter(function(item) {
          //     return item.op == 'sangria'
          //   })
          //   var t1 = {
          //     open: (open_[0] ? open_[0].tot : 0),
          //     reforco: (reforco_[0] ? reforco_[0].tot : 0),
          //     sangria: (sangria_[0] ? sangria_[0].tot : 0)
          //   }
          //   var tt = t1.open + t1.reforco - t1.sangria
          //   console.log('open_>:', tt)
          //   // ret = response.data.items
          //   // console.log('valor de abertura:', ret.value);

          //   fetchList('vendas', { find: { session: self.caixaSession }}).then(response => {
          //     console.log('response.data:', response.data)

          //     // Calc de total
          //     var amount = {
          //       dinheiro(item) {
          //         console.log(JSON.parse(item.pagamento).dinheiro)
          //         return JSON.parse(item.pagamento).dinheiro
          //       },
          //       debito(item) {
          //         console.log(JSON.parse(item.pagamento).debito)
          //         return JSON.parse(item.pagamento).debito
          //       },
          //       credito(item) {
          //         console.log(JSON.parse(item.pagamento).credito)
          //         return JSON.parse(item.pagamento).credito
          //       },
          //       faturado(item) {
          //         console.log(JSON.parse(item.pagamento).faturado)
          //         return JSON.parse(item.pagamento).faturado
          //       }
          //     }
          //     function sum(prev, next) { return prev + next }
          //     function varExistTest(val) {
          //       if (val) { return val } else { return [] }
          //     }

          //     var total = {
          //       dinheiro: response.data.items.map(amount.dinheiro).reduce(sum, 0) + tt,
          //       debito: response.data.items.map(amount.debito).reduce(sum, 0),
          //       credito: response.data.items.map(amount.credito).reduce(sum, 0),
          //       faturado: response.data.items.map(amount.faturado).reduce(sum, 0)
          //     }

          //     self.caixa_fechamento_value = {
          //       dinheiro: total.dinheiro,
          //       cartao: total.debito + total.credito,
          //       faturado: total.faturado
          //     }
          //     console.log('self.caixa_op_value:', self.caixa_op_value)
      
          //   }).catch(function(error) {
          //     console.log(error)
          //   })
          // }).catch(function(error) {
          //   console.log(error)
          // })
          console.log('!!!!-!!!')
        }

        self.user = self.corrent_user_info.name
        self.aux_caixa_op = op
        self.$modal.show('modal_caixa_op')
     
    },
    caixa_op_ok(op) {
      var self = this
      // var dataUpload_is_ok = true
      console.log('!!!!-!!!>', self.aux_caixa_op)

      var status = self.caixa_.status

      if (self.aux_caixa_op == 'Abertura') {
        //Zera caixastatus e vendas
        self.vendas = []
        localStorage.removeItem(getToken()+'.vendas');

        self.caixastatus = []
        localStorage.removeItem(getToken()+'.caixastatus');
        
        self.caixa_.value = self.caixa_open_value
        self.caixaSession = getToken() + '-' + self.today_timestamp
        self.aux_caixa_op = 'open'
        status = 'opened'
      }
      if (self.aux_caixa_op == 'Reforço') {
        self.caixa_.value = self.caixa_op_value
        self.aux_caixa_op = 'reforco'
        status = 'opened'
      }
      if (self.aux_caixa_op == 'Sangria') {
        self.caixa_.value = self.caixa_op_value
        self.aux_caixa_op = 'sangria'
        status = 'opened'
      }
      if (self.aux_caixa_op == 'Fechamento') {
        //Zera caixastatus e vendas
        self.caixa_.value = JSON.stringify(self.caixa_fechamento_value)
        self.aux_caixa_op = 'close'
        status = 'closed'

        console.log('vendas to upload:', this.vendas);
        
      }

      // process data
      self.caixa_.id = getToken() + '|' + (+new Date())
      self.caixa_.created = self.today_timestamp
      self.caixa_.token = getToken()
      self.caixa_.status = status
      self.caixa_.op = self.aux_caixa_op
      self.caixa_.session = self.caixaSession
      self.caixa_.obs = self.caixa_status_op_obs
      console.log(self.caixa_)
      self.caixa().set(self.caixa_)


      if (this.aux_caixa_op == 'close') {
        self.$modal.show('modal_data_upload')
        // if (self.dataUpload()) {
        //   this.$router.push('/')
        // }else{
        //   swal("Erro: Sem internet ou o servidor fora do ar, não é possível fechar o caixa, por favor aguarde.")
        // }
      }else{
        self.$modal.hide('modal_caixa_op')
      }

      // if (dataUpload_is_ok) {
      //   this.$modal.hide('modal_caixa_op')
      // }else{
      //   swal("Erro: Sem internet ou o servidor fora do ar, não é possível fechar o caixa, por favor aguarde.")
      // }
    },
    caixa_close_upload() {
      var self = this
      this.dataUpload().then(function(x){
        console.log('self.dataUpload_is_ok:::>', self.dataUpload_is_ok);
        if (self.dataUpload_is_ok) {
         
          //Reset caixa
          self.caixa_ = {}
          localStorage.removeItem(getToken()+'.caixastatus');
          localStorage.removeItem(getToken()+'.vendas');
         
         //Redirect do home site (dashboard)
          self.$router.push('/')
        }else{
          swal("Erro: Sem internet ou o servidor fora do ar, não é possível fechar o caixa, por favor aguarde.")
        }
      })
    },
    vai() {
      this.$nextTick(function() {
       //Start cursor fild by user info preferences
        if (this.balcao_pref.init_field_focus.value == "ean"){
          this.$refs.EAN.focus()
        }
        if (this.balcao_pref.init_field_focus.value == "product_name"){
          this.$refs.searchTerm_.focus()
        }
        // this.$refs.searchTerm_.focus()
        // this.$refs.EAN.focus()
        this.source = null
        this.diversos_set()
      })
    },
    handleCliente_insert() {
      this.$confirm(`Confirma a inclusão do cliente: ${this.searchTermClient}`, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        create('clientes', { nome: this.searchTermClient }).then((ret) => {
          console.log('response.data:', ret.data.id)
          var params = {
            row: {
              id: ret.data.id,
              nome: this.searchTermClient
            }
          }
          this.clienteSet(params)
          this.$message({
            type: 'success',
            message: 'Cliente inserido com sucesso!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelado'
        })
      })
    },
    scrollToEnd() {
      var container = this.$el.querySelector('#container')
      container.scrollTop = container.scrollHeight
    },
    getUser() {
      var self = this
      console.log('getToken:', getToken())
      getInfo().then(function(x) {
        self.user = x.data.name
        console.log('x.data.name:', x.data.name)
        return self.user
      })
    },
    updateDateTime() {
      var self = this
      const today = new Date()
      const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      const dateTime = date + ' ' + time
      self.today = dateTime
      self.today_timestamp = Date.now()
      setTimeout(self.updateDateTime, 1000)
    },
    pagamento_ops_reset() {
      this.pago_dinheiro = 0
      this.pago_debito = 0
      this.pago_credito = 0
      this.pago_faturado = 0
    },
    isNumber(evt) {
      const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ',']
      const keyPressed = evt.key
      if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault()
      }
    },
    getCliente() {
      this.clientesListFlg = true
      this.$nextTick(() => {
        this.searchTermClient = null
        this.$refs.searchClient.focus()
      })
    },
    clienteSet(params) {
      var row = params.row
      console.log('row:', row)
      this.cupom.cliente.id = row.id
      this.cupom.cliente.nome = row.nome
      this.clientesListFlg = false
      this.msgMain = { txt: 'Venda em curso', color: '#886A08' }
      this.$nextTick(() => {
        this.vai()
      })
    },
    cupom_add() {
      // Check if is a register of a credit
      if (this.product_selected.pco_venda > 0) {
        if (this.product_selected.qnt == 0) this.product_selected.qnt = 1
        if (this.product_selected.qnt > 0) {
          const sound = (new Audio(require('@/assets/audio/timer_beep.mp3'))).play()
          this.msgMain = { txt: 'Venda em curso', color: '#886A08' }
          // Procura produto pelo ID
          if (this.product_selected.id) {
            var auxObj = {
              n: +new Date(),
              id: this.product_selected.id,
              ean: this.product_selected.ean,
              descricao: this.product_selected.descricao,
              pco_venda: this.product_selected.pco_venda,
              qnt: this.product_selected.qnt,
              unidade: this.product_selected.unidade,
              total: this.product_selected.qnt * this.product_selected.pco_venda
            }
            // this.cupom.itens.unshift(auxObj)
            if (!this.cupom.id) {this.cupom.id = +new Date()}
            this.cupom.itens.push(auxObj)
            this.cupom.itens_n++
            this.cupom.subtotal += (parseFloat(this.product_selected.qnt) * parseFloat(this.product_selected.pco_venda)) // Calc row subtotal

            // Total Calc
            this.cupom.total = this.cupom.subtotal // += (parseFloat(this.qnt) * parseFloat(item.pco_venda))

            // Reset qnt
            this.product_selected = {}
            this.search = {}
            this.qnt = null
            this.EAN = null

            // Reset products list
            this.novoItem = false
            this.$nextTick(function() {
              this.novoItem = true
              this.scrollToEnd()
            })
            this.vai()
          }
        }
      }
    },
    cupomRowView(row) {
      console.log('row:', row)
      this.temp2 = this.cupom.itens.find(x => parseInt(x.n) === parseInt(row.n))
      this.dialogFormCupomView = true
    },
    productSet_EAN() {
      this.som1.play()
      console.log('this.EAN:', parseInt(this.EAN))
      var item = this.produtos.find(x => parseInt(x.ean) === parseInt(this.EAN))
      console.log(item)
      if (item) {
        this.qnt = 1
        this.product_selected = item
        this.product_selected.qnt = 0.0
        this.product_selected.total = 0
        console.log('this.product_selected:', this.product_selected)
        this.$nextTick(() => {
          // this.$refs.qnt.focus()
          this.cupom_add()
        })
      }else{
        swal("Código não cadastrado")
         swal({
        title: 'Erro',
        text: "Código não cadastrado",
        icon: 'error',
        buttons: {
          cadastrar: {
            text: 'Cadastrar',
            value: 'insert'
          },
          ok: {
            text: 'Ok',
            value: 'ok'
          }
        }
      }).then((value) => {
        switch (value) {
          case 'insert':
            this.$router.push('/cadastros/produtos')
            break
          case 'ok':
            this.EAN = null
            this.$refs.EAN.focus()
            // this.$nextTick(() => {
            //   this.$refs.EAN.focus()
            // })
            break
        }
      })
        
      }
    },
    productSet(params) {
      this.som1.play()
      // Check if is called by datalist or by product button
      if (params === Object(params)) var params = this.source
      // var item = this.produtos.find(x => parseInt(x.id) === parseInt(params))
      // var item = this.produtos.find(x => (x.descricao) === (params))
      // var item = this.produtos.filter(x => x.includes(params));
      console.log('>>>', params)
      var item
      this.produtos.forEach(x => { if (parseInt(x.ean) === parseInt(params) || (x.descricao) === (params)) item = x })
      console.log(item)
      if (item) {
        this.qnt = ''
        this.product_selected = item
        this.product_selected.qnt = 0.0
        this.product_selected.total = 0
        console.log('this.product_selected:', this.product_selected)
        this.$nextTick(() => {
          this.$refs.qnt.focus()
        })
      }
    },
    print() {
      // Check if is needed to print
      const d = new Printd()
      var cupom_printer = this.balcao_pref.cupom_printer.children
      const cssText = `
        .cupom_header {
          text-align: left; font-family: tahoma; font-size: ${cupom_printer.header.children.font_size}px;
        }
        .cupom_table_header {
          width: 100%; font-family: tahoma; font-size: ${cupom_printer.table_header}px;
        }
        .cupom_table_rows {
          height:40px; width: 100%; text-align: left; font-family: tahoma; font-size: ${cupom_printer.table_rows}px;
        }
        .cupom_footer {
          text-align: left; font-family: tahoma; font-size: ${cupom_printer.footer}px;
        }
      `
      d.print(document.getElementById('myelement'), [cssText])
      this.check_out_print_option = false
      this.vendaCloseOkFim()
    },
    vendaPrintClose() {
      this.vendaPrintFlg = false
      this.vendaCloseOkFim()
    },
    vendaClose() {
      const sound = (new Audio(require('@/assets/audio/zapsplat_bell_small_reception_desk_bell_single_ring_003_15125.mp3'))).play()
      this.desconto = 0
      this.pago_dinheiro = 0
      this.pago_debito = 0
      this.pago_credito = 0
      this.pago_faturado = 0
      this.pago_troco = 0
      this.pago_falta = this.cupom.subtotal
      this.vendaCloseFlg = true
    },
    vendaCloseOk() {
      console.log('this.cupom', this.cupom)
      const sound = (new Audio(require('@/assets/audio/caixa_registradora.mp3'))).play()
      this.cupom.total = this.cupom.subtotal - this.desconto
      this.totalpago = this.pago_dinheiro + this.pago_debito + this.pago_credito + this.pago_faturado
      console.log('this.cupom.date:', this.cupom.date)
     
      // data_ref to timestamp
      if (this.date_ref) {
        var myDate = this.date_ref.split('/')
        myDate = myDate[1] + '/' + myDate[0] + '/' + myDate[2]
        this.date_ref = new Date(myDate).getTime()
        console.log('this.date_ref:', this.date_ref)
      }

      const auxObj = {
        id: getToken()+'|'+this.cupom.id,
        date: +new Date(),
        date_ref: this.date_ref,
        session: this.caixa_.session,
        cliente: this.cupom.cliente.id,
        subtotal: this.cupom.subtotal,
        desconto: this.desconto,
        total: this.cupom.total,
        dinheiro: this.pago_dinheiro + this.pago_falta, // pago_falta = -troco
        debito: this.pago_debito,
        credito: this.pago_credito,
        faturado: this.pago_faturado,
        troco: this.pago_troco,
        itens: this.cupom.itens }
      console.log('auxObj>>', auxObj)
      const auxJson = JSON.stringify(auxObj)

      // Try save operation
      if (navigator.onLine){
        // // in server
        // vendaClose({ json_data: auxJson }).then((ret) => {
        //   console.log('response:', ret)
        // })
      }

      //in local storage
      console.log('>this.vendas:', this.vendas);
      this.vendas.push(auxObj)
      localStorage.setItem(getToken()+'.vendas', JSON.stringify(this.vendas));
      
      // Close modal
      this.vendaCloseFlg = false
      // this.vendaCloseEndFlg = true
      swal({
        title: 'Bom trabalho!',
        text: 'Venda registrada com sucesso',
        icon: 'success',
        buttons: {
          cancel: {
            text: 'Nova venda',
            value: 'new'
          },
          print: {
            text: 'Imprimir',
            value: 'print'
          },
          new: {
            text: 'Nova venda',
            value: 'new'
          }
        }
      }).then((value) => {
        switch (value) {
          case 'print':
            this.vendaPrintFlg = true
            break
          case 'new':
            this.vendaCloseOkFim()
            break
        }
      })
    },
    vendaCloseOkFim() {
      // Clean up form
      this.cupom = {
        id: null,
        date: this.today_timestamp,
        cliente: {
          id: 1,
          nome: 'Cliente'
        },
        itens: [],
        subtotal: 0,
        total: 0
      }
      this.cupom.itens_n = 0
      this.date_ref = null
      this.desconto = 0
      this.acrescimo = 0
      this.pago_dinheiro = 0
      this.pago_debito = 0
      this.pago_credito = 0
      this.pago_faturado = 0
      this.pago_troco = 0

      this.vendaCloseEndFlg = false
      this.$refs.searchTerm_.focus()
      this.source = null

      // reset parametros board
      // this.parametros_flg = false
      this.$nextTick(() => {
        this.parametros_flg = true
      })
    },
    async dataUpload(){
      var self = this
      // Try save operation
      if (navigator.onLine){
        //Save operation in databank
        console.log('this.caixastatus:', this.caixastatus);
        await create('caixa_status', this.caixastatus).then((ret) => {
          console.log('caixa_status.ret:', ret)
            vendaClose({ data: this.vendas }).then((ret) => {
            console.log('response:', ret)
           
            return true
          }).catch((error) => {
            console.warn('Not good man2 :(');
            return false
          })
          self.dataUpload_is_ok = true
        }).catch((error) => {
          self.dataUpload_status = "up load error"     
        })

        

        
      }
    },
    vendaCancel() {
      this.cupom = {
        cliente: {
          id: 1,
          nome: 'Cliente'
        },
        itens: [],
        subtotal: 0,
        total: 0
      }
      this.$nextTick(() => {
        this.vai()
      })
    },
    handleDelete(row) {
      this.$notify({
        title: 'Sucesso',
        message: 'Registro excluido',
        type: 'success',
        duration: 2000
      })
      console.log(row)
      this.cupom.subtotal -= row.total
      this.cupom.itens = this.cupom.itens.filter(item => item.n !== row.n)
      this.cupom.itens_n--
      this.dialogFormCupomView = false
    }
  }
}
</script>
