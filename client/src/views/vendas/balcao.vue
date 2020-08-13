<style scoped>

  @page {
    margin-left: 0cm;
    size: 58mm 100mm } /* output size */
  .receipt .sheet { width: 58mm; _height: 100mm } /* sheet size */
  @media print { .receipt { width: 58mm } } /* fix for Chrome */

  .bold {
    font-weight: bold;
  }

  input[list] {
    margin-left:auto;
    margin-right:auto;
    max-width: 600px;
    /* background: #D2E9FF; */
    /* padding: 20px 20px 20px 20px; */
    font: 20px Arial, Helvetica, sans-serif;
    color: #666;
  }

  .produto_button  {
    width: 102px;
    height: 102px;
    background-color: white;
    border: none;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.19);
  }

  .line{
    width: 100%;
    height: 5px;
    border-bottom: 1px solid #a6a6a6;
    margin-bottom: 3px;
  }
  .cupom_total {
    text-align: right; font-family: tahoma; font-size: 13px;
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

  .body {
    /* background-color: #f5f5ff; */
  }

  .box_product_selected {
    font-size: 20px;
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

  tbody tr div {
    text-align: center;
  }
  tr:nth-child(even) {
    background-color: #E6C793
  }
</style>
<template>
  <div class="app-container body">
    <el-row :gutter="20">
      <el-col :span="11">
        <el-row :gutter="20">
          <el-col :span="24">
            <!-- Produtos -->

            <el-card class="box-card" shadow="always" style="height: 330px; background-color: #f5f5ff;">
              <div slot="header" class="clearfix cardtitle">
                <el-row>
                  <el-col :span="8">
                    <span>Produtos</span>
                  </el-col>
                  <el-col :span="16">
                    <!-- <autocomplete ref="searchTerm_" :items="produtos_" @input="productSet"  /> -->
                    <input ref="searchTerm_" v-model="source" placeholder="Selecione o produto" list="my-list-id" @input="productSet" style="width: 99%; height: 35px;">
                    <datalist id="my-list-id">
                      <option v-for="(value, key) in produtos_" :key="key">{{ value.name }}</option>
                    </datalist>
                  </el-col>
                </el-row>
              </div>
              <el-row :gutter="20">

                <el-col v-if="atalhos" :span="6">
                  <button class="produto_button" @click="productSet('tomate')"><img :src="'tomate' | img_mini(produtos)"> </button>
                </el-col>
                <el-col v-if="atalhos" :span="6">
                  <button class="produto_button" @click="productSet('cebola')"><img style="margin-left:-5px;" :src="'cebola' | img_mini(produtos)"></button>
                </el-col>
                <el-col v-if="atalhos" :span="6">
                  <button class="produto_button" @click="productSet('alho')"><img style="margin-left:-5px;" :src="'alho' | img_mini(produtos)"></button>
                </el-col>
                <el-col v-if="atalhos" :span="6">
                  <button class="produto_button" @click="productSet('pimentao')"><img style="margin-left:-5px;" :src="'pimentao' | img_mini(produtos)"></button>
                </el-col>

              </el-row><br>
              <el-row :gutter="20">
                <el-col v-if="atalhos" :span="6">
                  <button class="produto_button" @click="productSet('laranja')"><img style="margin-left:-5px;" :src="'laranja' | img_mini(produtos)"></button>
                </el-col>
                <el-col v-if="atalhos" :span="6">
                  <button class="produto_button" @click="productSet('limao')"><img style="margin-left:-5px;" :src="'limao' | img_mini(produtos)"></button>
                </el-col>
                <el-col v-if="atalhos" :span="6">
                  <button class="produto_button" @click="productSet('banana prata')"><img style="margin-left:-5px;" :src="'banana prata' | img_mini(produtos)"></button>
                </el-col>
                <el-col v-if="atalhos" :span="6">
                  <button class="produto_button" @click="productSet('coentro')"><img style="margin-left:-5px;" :src="'coentro' | img_mini(produtos)"></button>
                </el-col>
              </el-row>
              <!-- <el-row>
                      <el-col :span="24">
                          <vue-good-table
                            v-if="novoItem"
                            :columns="columns"
                            :rows="produtos"
                            :search-options="{
                              enabled: false,
                              externalQuery: searchTerm
                            }"
                            theme="black-rhino"
                            max-height="200px"
                            @on-row-click="productSet"/>
                      </el-col>
                    </el-row> -->
            </el-card>
            <!-- /Produtos -->
          </el-col>
        </el-row><br>
        <el-row>
          <el-col :span="24">
            <!-- Produto selected -->
            <el-card v-show="product_selected.id" class="box-card box_product_selected" shadow="always" style="height: 260px">
              <div slot="header" class="clearfix cardtitle ">

                <div id="wrapper">
                  <div class="left" style="width: 70%">
                    <span>{{ product_selected.descricao }} ({{ product_selected.id }})</span>
                  </div>
                  <div class="right" style="width: 30%">
                    <span style="font-family: tahoma; font-size: 22px;">
                      <!--{{ product_selected.pco_venda | money }}-->
                      <money v-model="product_selected.pco_venda" v-bind="money" style="width: 100%; _margin-top: 5px; _font-size: 22px;" class="el-input__inner" />
                    </span>
                  </div>
                </div>
              </div>
              <div v-show="product_selected.id">
                <el-row :gutter="20" style="_margin-top: 10px">
                  <el-col :span="8">
                    Unidade<br>
                    <!-- <input ref="qnt" v-model="product_selected.qnt" style="width: 100%; margin-top: 5px; font-size: 22px;" class="el-input__inner" @keyup.enter="cupom_add()"> -->
                    <input ref="unidade" v-model="product_selected.unidade" style="width: 100%; margin-top: 5px; font-size: 22px;" class="el-input__inner" readonly>
                  </el-col>
                  <el-col :span="8">
                    Quantidade<br>
                    <!-- <input ref="qnt" v-model="product_selected.qnt" style="width: 100%; margin-top: 5px; font-size: 22px;" class="el-input__inner" @keyup.enter="cupom_add()"> -->
                    <input ref="qnt" v-model="qnt" style="width: 100%; margin-top: 5px; font-size: 22px;" class="el-input__inner" @keypress="isNumber($event)" @keyup.enter="cupom_add()">
                  </el-col>
                  <el-col :span="8">
                    Total<br>
                    <money v-model="product_selected.total" v-bind="money" style="width: 100%; margin-top: 5px; font-size: 22px;" class="el-input__inner" readonly />
                  </el-col>
                </el-row>
                <el-row :gutter="5" style="margin-top: 20px">
                  <el-col :span="8">
                    <el-button v-waves style="width: 100%; height: 60px; font-size: 25px;" class="filter-item" type="warning" _icon="el-icon-search" @click="product_selected = {}">
                      Cancela
                    </el-button>
                  </el-col>
                  <el-col :span="16">
                    <el-button v-waves style="width: 100%; height: 60px; font-size: 25px;" class="filter-item" type="primary" _icon="el-icon-search" @click="cupom_add">
                      Incluir
                    </el-button>
                  </el-col>

                </el-row>
              </div>
            </el-card>
            <!-- /Produto selected -->
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="13">
        <el-row :gutter="20">
          <el-col :span="24">
            <!-- Cupom -->
            <el-card id="myelement_" class="box-card" shadow="always" style="height: 430px; background-color: #ffffe6;">
              <div slot="header" class="clearfix cardtitle">
                <el-row :gutter="5">
                  <el-col :span="12">
                    <span>Cupom</span>
                  </el-col>
                  <el-col :span="12" style="text-align: right; margin-top:3px; font-size: 70%; color: #856514">
                    {{ today }}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <span style="font-family: tahoma; font-size: 70%;">
                      <a @click="getCliente"><span v-if="cupom.cliente.id" />
                        <span class="bold">Usuário:</span> {{ user }}</a>
                    </span>
                  </el-col>
                  <el-col :span="12" style="text-align: right;">
                    <span style="font-family: tahoma; font-size: 70%;">
                      <a @click="getCliente"><span v-if="cupom.cliente.id" />
                        <span class="bold">Cliente:</span> {{ cupom.cliente.nome }} ({{ cupom.cliente.id }})</a>
                    </span>
                  </el-col>
                </el-row>
              </div>
              <div v-if="cupom.itens.length == 0" style="text-align: center; vertical-align: middle; width: 100%; _height: 300px; _background-color: green;"><br><h1 id="caixa_Status">Caixa livre</h1></div>
              <el-row v-if="cupom.itens.length > 0" :gutter="25" style="text-align: center; width: 100%; font-weight: bold; font-size: 16px; margin-top: -5px; margin-bottom: -15px; margin-left:0px; _background-color: #ffffb3;">
                <el-col :span="2" style="text-align: center;">
                  #
                </el-col>
                <el-col :span="3">
                  Cod
                </el-col>
                <el-col :span="5" style="text-align: center;">
                  Descrição
                </el-col>
                <el-col :span="4">
                  Preço
                </el-col>
                <el-col :span="3">
                  Uni
                </el-col>
                <el-col :span="2">
                  Qnt
                </el-col>
                <el-col :span="5" style="text-align: center;">
                  Total
                </el-col>
              </el-row>
              <el-divider v-if="cupom.itens.length > 0" />
              <div id="container" style="margin-top:-15px; width: 100%; max-height:270px; overflow-y: auto;">
                <el-row v-for="(row, rindex) in cupom.itens" :key="rindex" :gutter="25" :style="{backgroundColor: (rindex % 2 === 0? '' : '#f2f2da')}" style="width: 100%; margin-left:0px; margin-bottom: 3px;padding: 5px; font-size: 19px;">
                  <div @click="cupomRowView(row.n)">
                    <el-col :span="2" style="text-align: center;">
                      {{ rindex + 1 }}
                    </el-col>
                    <el-col :span="3" style="text-align: center;">
                      {{ row.id }}
                    </el-col>
                    <el-col :span="5" style="text-align: center;">
                      {{ row.descricao }}
                    </el-col>
                    <el-col :span="4" style="text-align: center;">
                      {{ row.pco_venda | money }}
                    </el-col>
                    <el-col :span="3" style="text-align: center;">
                      {{ row.unidade||'uni' }}
                    </el-col>
                    <el-col :span="2" style="text-align: center;">
                      {{ row.qnt }}
                    </el-col>
                    <el-col :span="5" style="text-align: right;">
                      {{ row.total | money }}
                    </el-col>
                  </div>
                </el-row>
                <!-- <vue-good-table
                      v-if="cupom.itens.length > 0"
                      :columns="columns_cupom"
                      :rows="cupom.itens"
                      theme="nocturnal"
                      max-height="330px"
                      @on-row-click="cupomRowView">
                      <div slot="emptystate">
                        Caixa livre
                      </div>
                    </vue-good-table> -->
                <!-- <div v-if=cupom.itens.length class=cupom_total style="margin-top: 5px">
                            (Itens: {{ cupom.itens.length }}) Sub-total: {{ cupom.subtotal | money }}
                    </div> -->
              </div>
            </el-card>
            <!-- /Cupom -->
          </el-col>
        </el-row><br>
        <el-row>
          <el-col :span="24">
            <!-- Venda Check-out -->
            <el-card v-show="cupom.itens.length > 0" class="box-card cardtitle" shadow="always" style="height: 160px; font-family: arial;">
              <div slot="header" class="clearfix cardtitle">
                <div id="wrapper">
                  <div class="left">
                    <span>Itens: {{ cupom.itens.length }}</span>
                  </div>
                  <div class="right">
                    <span style="font-family: tahoma; font-size: 22px;">
                      Sub-total: {{ cupom.subtotal | money }}
                    </span>
                  </div>
                </div>
              </div>
              <el-row type="flex" class="row-bg">
                <el-col :span="24">
                  <el-row :gutter="5" type="flex" class="row-bg" style="_margin-top: 18px">
                    <el-col :span="8">
                      <el-button
                        v-show="cupom.total>0"
                        style="height:60px; font-size:25px; width: 100%;"
                        type="danger"
                        @click="vendaCancel()">
                        Cancelar
                      </el-button>
                    </el-col>
                    <el-col :span="16">
                      <el-button v-show="cupom.total > 0" style="height:60px; font-size:25px; width: 100%;" type="success" icon="el-icon-check" @click="vendaClose()">
                        Pagar
                      </el-button>
                    </el-col>
                  </el-row>
                  <br>
                </el-col>
              </el-row>
            </el-card>
            <!-- /Venda Check-out -->
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!----                                                        ----->
    <!----          Modal aux windows                             ----->
    <!----                                                        ----->

    <!-- CUPOM view row -->
    <el-dialog :visible.sync="dialogFormCupomView" title="Item do cupom" top="5vh">
      <el-form ref="dataForm" :model="temp2" label-position="right" label-width="140px" style="_width: 400px; _margin-left:50px; font-size: 18px;">
        <el-form-item label="#:" prop="n">
          <el-input v-model="temp2.n" readonly />
        </el-form-item>
        <el-form-item label="Código:" prop="ean">
          <el-input v-model="temp2.id" readonly />
        </el-form-item>
        <el-form-item label="Descrição:" prop="descricao">
          <el-input v-model="temp2.descricao" readonly />
        </el-form-item>
        <el-form-item label="Preço:" prop="preco">
          <money v-model="temp2.pco_venda" v-bind="money" class="el-input__inner" readonly />
        </el-form-item>
        <el-form-item label="Unidade:" prop="unidade">
          <el-input v-model="temp2.unidade" readonly />
        </el-form-item>
        <el-form-item label="Quantidade:" prop="qnt">
          <el-input v-model="temp2.qnt" style="width: 100px;" readonly />
          <!-- <input ref="qnt" v-model="temp2.qnt" :min="1" :max="10" @change="temp2.subtotal = temp2.qnt * temp2.pco_venda" /> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormQntVisible = false">Cancela</el-button> -->
        <el-button @click="dialogFormCupomView = false">
          Fechar
        </el-button>
        <el-button type="danger" @click="handleDelete(temp2)">Excluir</el-button>
      </div>
    </el-dialog>

    <!-- Venda close -->
    <el-dialog :visible.sync="vendaCloseFlg" width="60%" center top="5vh">
      <span slot="title" style="font-size: 30px">Fechamento de venda</span>
      <el-form ref="form" style="font-size: 20px" :model="form" label-width="0px" label-position="top">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>Total da compra</span>
                <!-- <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button> -->
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
                <!-- </el-form-item> -->
              </div>
            </el-card>

          </el-col>

          <el-col :span="12">

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>Forma de pagamento</span>
                <!-- <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button> -->
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
        <el-button v-if="pago_falta <= 0.04" style="margin-left: 10px; width: 250px; font-size: 25px;" type="success" @click="vendaCloseOk();">Confirma</el-button>
        <el-button style="font-size: 25px" @click="vendaCloseFlg = false">
          Cancela
        </el-button>
      </span>
    </el-dialog>

    <!-- Venda fechada! -->
    <el-dialog :visible.sync="vendaCloseEndFlg" width="50%" center top="5vh">
      <el-card class="box-card">
            <div slot="header" class="clearfix" style="text-align: center;">
              <span style="font-size: 30px;">Venda Registrada com sucesso!</span>
            </div>
            <div style="text-align: center;">
              <img src="@/assets/img/ok.png" style="width:200px; height:200px; margin-bottom: 20px;"><br>
              <el-button @click="vendaPrintFlg=true" type="primary" style="width: 200px;" round>Imprimir cupom</el-button>
              <el-button @click="vendaCloseOkFim" v-on:keyup.enter="vendaCloseOkFim" type="success"  style="width: 200px; z-index: -1;" round autofocus>Nova venda</el-button>   
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
        _class="vgt-input vgt-pull-left"
        autocomplete="nope"
      />
      <vue-good-table
        :columns="columns_clientes"
        :rows="clientesList"
        :search-options="{
          enabled: false,
          externalQuery: searchTermClient
        }"
        theme="black-rhino"
        max-height="255px"
        @on-row-click="clienteSet"
      />
      <span slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" v-if="searchTermClient" @click="handleCliente_insert">Incluir novo cliente</el-button>
        <el-button type="primary" @click="clientesListFlg = false">Fechar</el-button>
      </span>
    </el-dialog>

    <!-- Print venda -->
    <el-dialog :visible.sync="vendaPrintFlg" title="Impressão de ticket" width="45%" align="left">
      <span align="center">
        <el-button type="primary" @click="print">Imprimir</el-button>
        <el-button type="primary" @click="vendaPrintFlg = false">Fechar</el-button>
      </span><br><br>
      <div id="myelement" class="receipt">
        <div class="cupom_total2">
          <b>Hortifruti Nova Caraíva</b><br>
          CNPJ: 33.042.633/0001-11<br>
          Data: {{ today }}<br>
          Cliente: {{ cupom.cliente.nome }} - {{ cupom.cliente.id }}<br>
        </div><br>
        <el-table
          border
          :data="cupom.itens"
          row-class-name="cupom_total"
          header-row-class-name="cupom_total"
          style="width: 100%; font-size:13px;">
          <el-table-column
            prop="descricao"
            label="Desc"
            width="50px">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}<br>{{ scope.row.descricao }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="pco_venda"
            label="Pço"
            width="50px">
            <template slot-scope="scope">
              <span>{{ scope.row.pco_venda | money }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="unidade"
            label="Uni"
            width="40px"
          />
          <el-table-column
            prop="qnt"
            label="Qnt"
            width="40px"
          />
          <el-table-column
            prop="total"
            label="Total"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.total | money }}</span>
            </template>
          </el-table-column>
        </el-table><br>
        <div v-if="cupom.itens.length" class="cupom_total2" style="margin-top: 5px; text-align: left; font-family: tahoma;">
          (Itens: {{ cupom.itens.length }})<br> Sub-total: {{ cupom.subtotal | money }}<br> Desconto:{{ desconto | money }}<br>Total: {{ cupom.subtotal - desconto | money }}
        </div>
        <div>
          <h3>Forma de pagamento:</h3>
          <div v-if="pago_dinheiro">Dinheiro: {{ pago_dinheiro | money }}</div>
          <div v-if="pago_debito">Cartão de débito: {{ pago_debito | money }}</div>
          <div v-if="pago_credito">Cartão de crédito: {{ pago_credito | money }}</div>
          <div v-if="pago_faturado">Faturado :{{ pago_faturado | money }}</div>
        </div>
        <div>
          <p>Obrigado pela preferência! Volte sempre.</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getInfo } from '@/api/user'
import { fetchList, create } from '@/api/generic'
import { vendaClose } from '@/api/vendaClose'
import waves from '@/directive/waves' // waves directive
import { Money } from 'v-money'
// import the styles
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'

import { Printd } from 'printd'
import Autocomplete from '@/components/Autocomplete'

export default {
  name: 'Balcao',
  components: { Money, VueGoodTable, Autocomplete },
  directives: { waves },
  filters: {
    img_mini: function(value, produtos) {
      var a = produtos.filter(item => item.descricao == value)[0]
      if (a) return a.img_mini
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
      vendaCloseEndFlg: false,
      source: null,
      atalhos: true,
      value: null,
      fromChild: null,
      search2: null,
      user: null,
      novoItem: true,
      today_timestamp: null,
      today: null,
      vendaPrintFlg: false,
      produtos_: [],
      check_out_print_option: false,
      search: {
        cliente: null
      },
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
      searchTerm: null,
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
      caixaStatus: {
        data: new Date().toLocaleString('pt-BR'),
        usuario: this.$store.getters.name,
        operacao: 'abertura',
        valor: 0
      },
      msgMain: { txt: 'Caixa livre', color: 'green' },
      produtos: [],
      searchClient: null,
      searchTermClient: null,
      clienteBusca: '',
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
        n: null,
        id: 0
      },
      dialogStatus: '',
      textMap: {
        update: 'Editar',
        create: 'Incluir'
      }
    }
  },
  watch: {
    qnt: function() {
      if (this.qnt) {
        this.qnt = this.qnt ? this.qnt.replace(',', '.') : ''
        this.product_selected.qnt = this.qnt
        this.product_selected.total = this.product_selected.qnt * this.product_selected.pco_venda
      }
    },
    desconto: function() {
      // this.cupom.total = this.cupom.total - this.desconto
      if (this.desconto > this.cupom.subtotal) {
        return this.cupom.total
      } else {
        this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
        this.pago_falta = this.cupom.subtotal - this.desconto - this.valor_pago
      }
    },
    pago_dinheiro: function() {
      // this.cupom.total = this.cupom.total - this.desconto
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.subtotal - this.desconto - this.valor_pago
    },
    pago_debito: function() {
      // this.cupom.total = this.cupom.total - this.desconto
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.subtotal - this.desconto - this.valor_pago
    },
    pago_credito: function() {
      // this.cupom.total = this.cupom.total - this.desconto
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.subtotal - this.desconto - this.valor_pago
    },
    pago_faturado: function() {
      // this.cupom.total = this.cupom.total - this.desconto
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.subtotal - this.desconto - this.valor_pago
    }
  },
  mounted() {
    this.vai()
  },
  created() {
    this.updateDateTime()
    this.getUser()
    window.addEventListener('keydown', (e) => {
      if (e.key == 'F2') {
        e.preventDefault()
        this.vendaClose()
      }
    })
    fetchList('produtos', '').then(response => {
      this.produtos = response.data.items
      this.produtos_ = response.data.items.map(function(item) {
        return { id: item.id, name: item.descricao }
      })
    })
  },
  methods: {
    handleCliente_insert(){
        this.$confirm(`Confirma a inclusão do cliente: ${this.searchTermClient}`, 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            create('clientes', {nome: this.searchTermClient}).then((ret) => {
              console.log('response.data:', ret.data.id)
              var params = {
                row:{
                  id: ret.data.id,
                  nome: this.searchTermClient 
                }
              }
              this.clienteSet(params)
              this.$message({
                type: 'success',
                message: 'Cliente inserido com sucesso!'
              });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancelado'
          });          
      });
    },
    xx() {
      console.log(this.source)
    },
    vv(x) {
      console.log(x)
    },
    scrollToEnd: function() {
      var container = this.$el.querySelector('#container')
      container.scrollTop = container.scrollHeight
    },
    scrollToElement() {
      const el = this.$el.getElementsByClassName('scroll-to-me')[0]
      if (el) {
        el.scrollIntoView()
      }
    },
    getUser() {
      var self = this
      getInfo().then(function(x) {
        self.user = x.data.name
      })
    },
    getZeroPad(x) {
      return x
    },
    updateDateTime() {
      var self = this
      const today = new Date()
      const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
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
    teste(x) {
      console.log(x)
    },
    vai() {
      console.log(this.$refs)
      this.$nextTick(function() {
        this.$refs.searchTerm_.focus()
        this.source = null
        // this.$refs.searchTerm_.value=null;
        // this.$refs.searchTerm_.$refs.searchTerm_.focus()
        // this.$refs.searchTerm.clear()
        // this.searchTerm_ = null
      })
    },
    vai2() {
      this.$refs.qnt.focus()
    },
    vai3() {
      this.$refs.searchClient.focus()
    },
    getCliente() {
      const self = this
      self.clientesList = []
      fetchList('clientes', '').then(response => {
        console.log('response.data:', response.data)
        self.clientesList = response.data.items
      }).catch(function(error) {
        console.log(error)
      })
      this.clientesListFlg = true
      this.$nextTick(() => {
        this.searchTermClient = null
        this.vai3()
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
      if (this.product_selected.qnt > -1) {
        if (this.product_selected.qnt == 0) this.product_selected.qnt = 1
        const sound = (new Audio(require('@/assets/audio/timer_beep.mp3'))).play()
        this.msgMain = { txt: 'Venda em curso', color: '#886A08' }
        // Procura produto pelo ID
        if (this.product_selected.id) {
          this.cupom.itens_n++
          var auxObj = {
            n: this.cupom.itens_n,
            id: this.product_selected.id,
            descricao: this.product_selected.descricao,
            pco_venda: this.product_selected.pco_venda,
            qnt: this.product_selected.qnt,
            unidade: this.product_selected.unidade,
            total: this.product_selected.qnt * this.product_selected.pco_venda
          }
          // this.cupom.itens.unshift(auxObj)
          this.cupom.itens.push(auxObj)
          this.cupom.subtotal += (parseFloat(this.product_selected.qnt) * parseFloat(this.product_selected.pco_venda)) // Calc row subtotal

          // Total Calc
          this.cupom.total = this.cupom.subtotal // += (parseFloat(this.qnt) * parseFloat(item.pco_venda))

          // Reset qnt
          this.product_selected = {}
          this.search = {}
          this.qnt = null

          // Reset products list
          this.novoItem = false
          this.$nextTick(function() {
            this.novoItem = true
            this.scrollToEnd()
          })
          this.vai()
        }
      }
    },
    cupomRowView(n) {
      this.dialogFormCupomView = true
      var item = this.cupom.itens.find(x => parseInt(x.n) === parseInt(n))
      this.temp2 = item
    },
    productSet(params) {
      // Check if is called by datalist or by product button
      if (params === Object(params)) var params = this.source
      // var item = this.produtos.find(x => parseInt(x.id) === parseInt(params))
      var item = this.produtos.find(x => (x.descricao) === (params))
      if (item) {
        this.product_selected = item
        this.product_selected.qnt = 0.0
        this.product_selected.total = 0
        console.log('this.product_selected:', this.product_selected)
        this.$nextTick(() => {
          this.vai2()
        })
      }
    },
    print() {
      // Check if is needed to print
      const d = new Printd()
      const cssText = `
          .cupom_total {
            text-align: left; font-family: tahoma; font-size: 15px;
          }
          .cupom_total2 {
            text-align: left; font-family: tahoma; font-size: 18px;
          }
        `
      d.print(document.getElementById('myelement'), [cssText])
      this.check_out_print_option = false
    },
    vendaClose() {
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
      console.log('this.cupom.date:', this.cupom.date);
      // this.falta_pagar = this.cupom.total - this.totalpago
      const auxObj = {
        date: + new Date(),
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

      // Try save operation in server
      vendaClose({ json_data: auxJson }).then((ret) => {
        console.log('response:', ret)   
      })
      // Close modal
      this.vendaCloseFlg = false
      this.vendaCloseEndFlg = true
    },
    vendaCloseOkFim(){
      // Clean up form
      this.cupom = {
        date: this.today_timestamp,
        cliente: {
          id: 1,
          nome: 'Cliente'
        },
        itens: [],
        subtotal: 0,
        total: 0
      }
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
      this.dialogFormCupomView = false
    }
  }
}
</script>
