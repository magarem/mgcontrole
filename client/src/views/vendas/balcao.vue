<style scoped>
  /* It is simple way to use scroll bar to table body*/

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
  <div class="app-container">
    <el-row :gutter=40>
      <el-col :span="17">
        <el-row type="flex" class="row-bg" justify="center" _style="background-color: #112940">
          <el-col :span="24">
             <!-- <span class="grid-content bg-red" justify="center" style="font-family: tahoma; font-size: 25px;" :style="{color: msgMain.color}">
              {{ msgMain.txt }}
             </span> -->
             <!-- <div class="grid-content bg-red"  style="font-family: tahoma; font-size: 22px; _padding: 16px; color: white; text-align: center">
              Cupom
             </div> -->
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center" _style="background-color: #112940">
          <el-col :span="24">
            <el-table
              :data="list"
              border  highlight-current-row
              stripe
              height="255"
              cell-style="padding:0px;"
              header-cell-style="padding:3px;"
              empty-text="Caixa livre"
              style="width: 100%; font-size: 14px;">
              <el-table-column align=center label="CUPOM">
              <el-table-column
                align=center
                type="index"
                label="#"
                width="40">
              </el-table-column>
              <el-table-column
                align=center
                prop="descricao"
                label="Produto"
                width="250">
              </el-table-column>
              <el-table-column
                align=center
                prop="unidade"
                label="Unidade"
                width="100">
              </el-table-column>
              <el-table-column
                align=center
                prop="qnt"
                label="Quantidade">
              </el-table-column>
              <el-table-column
                align=center
                prop="pco_venda"
                label="Preço">
                <template slot-scope="scope">
                  {{ scope.row.pco_venda | money }}
                </template>
              </el-table-column>

              <el-table-column label="Sub-total"  align="center">
                <template slot-scope="scope">
                  {{ scope.row.subtotal | money }}
                </template>
              </el-table-column>
              <el-table-column
                align="center" label="Excluir">
                <template slot-scope="scope">
                  <el-button @click="handleDelete(scope.row)" type="text" size="small">Excluir</el-button>
                </template>
              </el-table-column>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

      </el-col>
      <el-col :span="7" style="background-color: #F0F8FF; height: 255px">
        <el-row type="flex" class="row-bg" _justify="center" style="padding-top: 10px;">
          <el-col :span="24" >
              <el-button  v-waves :loading="downloadLoading" class="filter-item" type="primary" @click="clientesListFlg = true" icon=el-icon-search>
              Cliente
              </el-button>
              <span v-if="cliente.nome" style="margin-right: 10px; font-size: 25px;">
                <br>{{cliente.id}}<span v-if="cliente.id"> - </span>
                {{ cliente.nome }}
              </span>
              
            
             <div  style="font-family: tahoma; font-size: 30px;">
               Total: {{ totalGeral | money }}
            </div><br>

            <el-button v-show="totalGeral>0" _style="height:60px; font-size:25px;" type="warning" icon="el-icon-cancel" @click="vendaCancel()">
              Cancelar
            </el-button>
            <el-button v-show="totalGeral>0" _style="height:60px; font-size:25px;" type="success" icon="el-icon-check" @click="vendaClose()">
              Pagar
            </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row >

    <br>
    <el-row :gutter=40 >
      <el-col :span="17">
        <el-form :inline="true" label-position="right" label-width="100px"  class="demo-form-inline">
          <!-- <el-form-item label="Nome">
            <input ref="clienteBusca" placeholder="Nome" v-model="cliente.busca" class="el-input__inner" style="width: 250px; height: 33px;" @keyup.enter="getCliente({nome: cliente.busca})">
          </el-form-item> -->
          <h4>Defina os produtos</h4>
          <el-form-item label="Produto">
            <input ref="produto.id" placeholder="Código" v-model="item.id" class="el-input__inner" style="width: 80px; _height: 33px;" autofocus @keyup.enter="productSetById()" />
          </el-form-item>
          <el-button v-waves  class="filter-item" type="primary" icon="el-icon-search" @click="produtosListFlg = true">
            Procurar pelo nome
          </el-button>
        
          <!-- <br>
          <el-form-item label="Diversos">
            <input ref="diversos.txt" v-model="diversos.txt" placeholder="Diversos" class="el-input__inner" style="width: 100px; height: 33px;">
            <money ref="diversos.valor" v-model="diversos.valor" v-bind="money" class="el-input__inner" style="width: 100px; height: 33px;" @keyup.enter="addDiversos()"/>
          </el-form-item> -->
          <!-- <el-form-item>
            <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="addDiversos()">
              Incluir
            </el-button>
          </el-form-item> -->
          <br>
        </el-form>
      </el-col>
      <el-col :span="7" style="padding-top: 10px; height: 350px; background-color: #FFF8DC;">
          Produto:<br>
          <div v-show="item.descricao">
            <span style="font-size: 35px; _margin-left: 10px">{{ item.id }}</span><br>
            <span style="font-size: 40px; _margin-left: 10px">{{ item.descricao }}</span><br>
            <span style="font-size: 35px; _margin-left: 10px">{{ item.pco_venda | money }}</span><br>
            <span style="font-size: 35px; _margin-left: 10px">{{ item.unidade }}</span><br><br>
            Quantidade:<br>
            <input v-model="qnt"  style="width: 125px; margin-top: 5px; font-size: 30px;" class="el-input__inner" @keyup="qnt = qnt.replace(',','.')" @keyup.enter="addList()" /><br><br>
            <el-button v-waves  class="filter-item" type="primary" _icon="el-icon-search" @click="addList()">
              Registra item
            </el-button>
          </div>
      </el-col>
    </el-row >
    
    
    
    
   
    
    <!-- /TOTAL -->

    <!----                                                        ----->
    <!----          Modal aux windows                             ----->
    <!----                                                        ----->
    
    <el-dialog :visible.sync="dialogCaixaStatus" title="Posição de caixa" top="5vh">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">

        <el-form-item label="Data" prop="data">
          <el-input v-model="caixaStatus.data" />
        </el-form-item>

        <el-form-item label="Usuário" prop="usuario">
          <el-input v-model="caixaStatus.usuario" />
        </el-form-item>

        <el-form-item label="Operação" prop="operacao">
          <el-input v-model="caixaStatus.operacao" />
        </el-form-item>

        <el-form-item label="Valor" prop="valor">
          <money v-model="caixaStatus.valor" v-bind="money" class="el-input__inner" />
          <!-- <el-button  v-waves   type="primary" @click="eansearch()">
            >>
          </el-button> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCaixaStatus = false">
          Cancela
        </el-button>
        <el-button type="primary" @click="setCaixaPosicao()" >
          Confirma
        </el-button>
      </div>
    </el-dialog>


    <!-- Change qnt of row -->
    <el-dialog :visible.sync="dialogFormQntVisible" :title="textMap[dialogStatus]" top="5vh">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="140px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Código" prop="ean">
          {{ temp2.ean }}
        </el-form-item>
        <el-form-item label="Descrição" prop="descricao">
          {{ temp2.descricao }}
        </el-form-item>
        <el-form-item label="Preço" prop="preco">
          {{ temp2.pco_venda | money }}
        </el-form-item>
        <el-form-item label="Unidade" prop="unidade">
          {{ temp2.unidade }}
        </el-form-item>
        <el-form-item label="Quantidade" prop="qnt">
          <el-input-number v-model="temp2.qnt" :min="1" :max="10" @change="temp2.subtotal = temp2.qnt * temp2.pco_venda" />
        </el-form-item>
        <el-form-item label="subtotal" prop="total">
          {{ temp2.subtotal | money }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormQntVisible = false">Cancela</el-button>
        <el-button type="primary" @click="updateData()">Confirma</el-button>
      </div>
    </el-dialog>

    <!-- Venda close -->
    <el-dialog :visible.sync="vendaCloseFlg" title="Fechamento de venda" width="60%" center top="5vh">
      <el-form ref="form" :model="form" label-width="170px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-row>
              <el-col :span="24"><div class="grid-content bg-purple-dark">Venda</div></el-col>
            </el-row>
            <el-form-item label="Total">
              <!--el-input v-model="totalGeral" v-money="money"></el-input-->
              {{ totalGeral|money }}
            </el-form-item>
            <el-form-item label="Desconto">
              <!--el-input v-model="desconto" v-money="money"></el-input-->
              <money v-model="desconto" v-bind="money" class="el-input__inner" />
            </el-form-item>
            <!--el-form-item label="Acréscimo"-->
              <!--el-input v-model="acrescimo" v-money="money"></el-input-->
              <!--money v-model="acrescimo" v-bind="money" class="el-input__inner" /-->
            <!--/el-form-item-->
            <el-form-item label="Total a pagar">
              {{ total_a_pagar | money }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="24"><div class="grid-content bg-purple-dark">Pagamento</div></el-col>
            </el-row>
            <el-form-item label="">
              <el-checkbox v-model="faturado">A faturar</el-checkbox>
            </el-form-item>
            <div v-if="!faturado">
              <el-form-item label="Dinheiro">
                <!--el-input v-model="pago_dinheiro"></el-input-->
                <money v-model="pago_dinheiro" v-bind="money" class="el-input__inner" />
              </el-form-item>
              <el-form-item label="Cartão de débito">
                <!--el-input v-model="pago_debito"></el-input-->
                <money v-model="pago_debito" v-bind="money" class="el-input__inner" />
              </el-form-item>
              <el-form-item label="Cartão de crédito">
                <!--el-input v-model="pago_credito"></el-input-->
                <money v-model="pago_credito" v-bind="money" class="el-input__inner" />
              </el-form-item>
              <el-form-item label="Valor pago">
                <!--el-input v-model="valor_pago"></el-input-->
                <money v-model="valor_pago" v-bind="money" class="el-input__inner" />
              </el-form-item>

              <el-form-item label="Troco">
                <!--el-input v-model="pago_troco"></el-input-->
                <money v-if="pago_troco>0" v-model="pago_troco" v-bind="money" class="el-input__inner" />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <p v-if="(faturado && !cliente.id)">Defina o código do cliente a ser faturado</p>
        <el-button v-if="(faturado && cliente.id) || pago_troco>=0" type="primary" @click="vendaCloseOk(); dialogPvVisible = false">Confirma</el-button>
        <el-button @click="vendaCloseFlg = false">
            Cancela
        </el-button>
      </span>
    </el-dialog>

    <!-- Venda close end -->
    <!-- <el-dialog :visible.sync="vendaCloseOkVisible" title="Venda registrada" width="30%">
      <span>Venda registrada com sucesso!</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="vendaCloseOkEnd">Ok</el-button>
      </span>
    </el-dialog> -->

    <!-- Products list -->
    <el-dialog :visible.sync="produtosListFlg" title="Busca de produto" width="70%">
        <!-- <input ref="nome" placeholder="Nome" v-model="listQuery.descricao" class="el-input__inner" style="width: 170px; height: 33px;" autofocus @keyup.enter="searchProduct({descricao: listQuery.descricao})" /> -->
     
      <el-table 
        :data="produtos.filter(data => !search || data.descricao.toLowerCase().includes(search.toLowerCase()))"
        border fit highlight-current-row style="width: 100%">
        
        <el-table-column label="ID" prop="ID" sortable="custom" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column>
          <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="Procurar pelo nome"/>
            </template>
          <el-table-column label="Descricao" prop="descricao" sortable="custom" align="center" width="350">
            <template slot-scope="scope">
              <span>{{ scope.row.descricao | capitalize }}</span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="unidade" prop="unidade" sortable="custom" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.unidade }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Preço" prop="pco_venda" sortable="custom" align="center" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.pco_venda | money }}</span>
          </template>
        </el-table-column>

        <el-table-column  align="center" width="200" class-name="small-padding fixed-width">
 
               
          <template slot-scope="{row}">
            <el-button size="mini" type="success" @click="productSet(row); produtosListFlg=false">
              Selecionar
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="produtosListFlg = false">Fechar</el-button>
      </span>
    </el-dialog>

    <!-- Clientes busca lista -->
    <el-dialog :visible.sync="clientesListFlg" title="Busca cliente" width="70%" align="center">
      <input ref="clienteBusca" placeholder="Nome" v-model="cliente.busca" class="el-input__inner" style="width: 250px; height: 33px; margin-bottom:10px;" @keyup.enter="getCliente({nome: cliente.busca})">
      <el-table :data="clientesList" border fit highlight-current-row style="width: 100%">
        <el-table-column label="Código" prop="id" sortable="custom" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Nome" prop="nome" sortable="custom" align="center" width="385">
          <template slot-scope="scope">
            <span>{{ scope.row.nome | capitalize }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Documento" prop="doc" sortable="custom" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.doc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Ações" align="center" width="170" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button size="default" type="success" @click="clienteSet(row)">
              Selecionar
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" @click="clientesListFlg = false">Fechar</el-button>
      </span>
    </el-dialog>

    <!-- /Modal aux windows -->

  </div>
</template>

<script>
import { fetchList, create, update } from '@/api/generic'
import { vendaClose } from '@/api/vendaClose'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import axios from 'axios'
import { Money } from 'v-money'
// import elTableInfiniteScroll from 'el-table-infinite-scroll';

async function foo(ean){
    var data = await fetch(process.env.VUE_APP_BASE_API + '/eansearch?ean='+ean); // notice the await
    // code here only executes _after_ the request is done
    console.log('data:', data);
    return data // data is defined
}
export default {
  name: 'Balcao',
  components: { Pagination, Money },
  directives: { waves },
  filters: {

     money(value) {

      if (typeof value !== "number") {
          return value;
      }
      var formatter = new Intl.NumberFormat([], {
        style: 'currency',
        currency: 'BRL'
      })
      return formatter.format(value);
     },
    money2(value) {
      value = parseFloat(value).toFixed(2)
      if (!value) return ''
      value = value.toString()
      if (value.indexOf('.') == -1) {
        value += ',00'
      }
      return value.replace('.', ',')
    },
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      server: '/dev-api',
      search: null,
      dialogCaixaStatus: false,
      caixaStatus:{
        data: new Date().toLocaleString("pt-BR"),
        usuario: this.$store.getters.name,
        operacao: 'abertura',
        valor: 0
      },
      busca: {
        produto: {
          id: null,
          nome: null
        }
      },
      msgMain: { txt: 'Caixa livre', color: 'green' },
      subtotal: 0,
      diversos: {
        txt: '',
        valor: 0
      },
      produtos:[],
      cliente: {
        id: null,
        nome: null,
        busca: null
      },
      clienteBusca: '',
      clientesList: [],
      list2: [],
      dialogFormProductUpdateVisible: false,
      item: {},
      itemAdd_qnt: '',
      itemAdd_descricao: '',
      itemAdd_pco_venda: '',
      itemAdd_subTotal: '',
      itemN: 0,
      itemAdd_ean: '',
      vendaItemId: 0,
      totalItens: 0,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      form: {},
      lastEan: null,
      faturado: false,
      valor_pago: 0,
      pago_troco: 0,
      pago_dinheiro: 0,
      pago_debito: 0,
      pago_credito: 0,
      total_a_pagar: 0,
      desconto: 0,
      acrescimo: 0,
      pago_falta: 0,
      vendaID: Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 6),
      vendaItem: 0,
      produtosListFlg: false,
      vendaCloseFlg: false,
      clientesListFlg: false,
      dialogFormQntVisible: false,
      dialogFormVisible: false,
      produtosListVisible: false,
      vendaCloseOkVisible: false,
      tableKey: 0,
      list: [],
      vendasStack: [],
      produtosList: [],
      total: 0,
      totalGeral: 0,
      listLoading: true,
      qnt: 1,
      listQuery: {
        id: null,
        descricao: null,
        page: 1,
        limit: 20,
        // importance: undefined,
        // title: undefined,
        // type: undefined,
        sort: '+id'
      },
      // importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: 0,
        ean: ''
      },
      temp2: {
        id: 0
      },
      dialogStatus: '',
      textMap: {
        update: 'Editar',
        create: 'Incluir'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  watch: {
    // sempre que a pergunta mudar, essa função será executada
    desconto: function() {
      this.total_a_pagar = this.totalGeral - this.desconto + parseFloat(this.acrescimo)
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito))
      this.pago_troco = this.valor_pago - this.total_a_pagar
      // this.answer = 'Esperando você parar de escrever...'
      // this.debouncedGetAnswer()
    },
    acrescimo: function() {
      this.total_a_pagar = this.totalGeral - this.desconto + parseFloat(this.acrescimo)
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito))
      this.pago_troco = this.valor_pago - this.total_a_pagar
      // this.answer = 'Esperando você parar de escrever...'
      // this.debouncedGetAnswer()
    },
    pago_dinheiro: function() {
      this.total_a_pagar = this.totalGeral - this.desconto + parseFloat(this.acrescimo)
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito))
      this.pago_troco = this.valor_pago - this.total_a_pagar
      this.pago_falta = this.total_a_pagar - this.pago_falta
      // this.answer = 'Esperando você parar de escrever...'
      // this.debouncedGetAnswer()
    },
    pago_debito: function() {
      this.total_a_pagar = this.totalGeral - this.desconto + parseFloat(this.acrescimo)
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito))
      this.pago_troco = this.valor_pago - this.total_a_pagar
      // this.answer = 'Esperando você parar de escrever...'
      // this.debouncedGetAnswer()
    },
    pago_credito: function() {
      this.total_a_pagar = this.totalGeral - this.desconto + parseFloat(this.acrescimo)
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito))
      this.pago_troco = this.valor_pago - this.total_a_pagar
      // this.answer = 'Esperando você parar de escrever...'
      // this.debouncedGetAnswer()
    }

  },
  created() {
    fetchList('produtos','').then(response => {
        this.produtos = response.data.items
        console.log(this.produtos);
        
      })
    // this.dialogCaixaStatus = true
    // if (localStorage.getItem('produtos')) {
    //   try {
    //     this.produtos = JSON.parse(localStorage.getItem('produtos'));
    //   } catch(e) {
    //     localStorage.removeItem('produtos');
    //   }
    // }else{
    //   fetchList('produtos','').then(response => {
    //     // console.log('ferchList.response:', response);
    //     this.produtos = response.data.items
    //     console.log('this.produtos:', this.produtos);
    //     const produtos = JSON.stringify(this.produtos);
    //     localStorage.setItem('produtos', produtos);
    //   })
    // }
  },
  methods: {
    dataUpdate(){
      var self = this
      fetchList('produtos','').then(response => {
        self.produtos = response.data.items
        console.log('this.produtos:', self.produtos);
        const produtos = JSON.stringify(self.produtos);
        localStorage.setItem('produtos', produtos);
      })
    },
    handleCaixaPosicao(){
      this.dialogCaixaStatus = true
      this.caixaStatus.operacao = 'Fechamento'
    },
    setCaixaPosicao(){
      let vars = { data: new Date().toLocaleString("pt-BR"), usuario: this.$store.getters.name, operacao: this.caixaStatus.operacao, valor: this.caixaStatus.valor }
      console.log(vars);
      this.dialogCaixaStatus = false
      
      axios.post(this.server + '/setCaixaPosicao', vars, {
        // Separate configuration
        withCredentials: true
      })
        .then(function (response) {
          console.log('ok:', response);
        })
        .catch(function (error) {
          alert('erro')
      });
    },
    getCaixaPosicao(){
      return axios.get(this.server + '/getCaixaPosicao?usuario=' + this.$store.getters.name, {
        // Separate configuration
        withCredentials: true
      }).then(function (response) {
          console.log('response:', response)
      //     setTimeout(() => {
      //       self.temp.descricao = response.data;
      //     }, 10000)
      })
    },
    roles(){
      console.log('>>>',this.$store.getters.roles[0])
    },
    eansearch(){
      var strr = []
      var self = this

      //console.log('>>>>>', foo(self.temp.ean));
      return axios.get(self.server + '/eansearch?ean='+self.temp.ean, {
        // Separate configuration
        withCredentials: true
      });
    },
    vendasStackUpload(){
      var self = this
      console.log('this.vendasStack:', this.vendasStack);
      if (this.vendasStack.length > 0) {
        for (var t=0; t < this.vendasStack.length; t++){
          axios.post(self.server + '/vendaClose', this.vendasStack[t], {
            // Separate configuration
            withCredentials: true
          })
            .then(function (response) {
              console.log('ok:', response);
            })
            .catch(function (error) {
              alert('erro')
          });
        }
      }
      this.$notify({
        title: 'Sucesso',
        message: 'Vendas enviado com sucesso',
        type: 'success',
        duration: 2000
      })
      //Sending Products list
      axios.post(self.server + '/productsList', this.produtos, {
        // Separate configuration
        withCredentials: true
      }).then(function (response) {
          console.log('ok:', response);
        })
        .catch(function (error) {
          alert('erro')
      });
      this.$notify({
        title: 'Sucesso',
        message: 'Produtos enviado com sucesso',
        type: 'success',
        duration: 2000
      })
    },
    productEdit(){
      var objProduct = {
        id:this.lastId,
        ean:this.lastEan,
        descricao: this.lastDescricao,
        unidade: this.lastUnidade,
        pco_venda: this.lastPco_venda,
        estoque: this.lastEstoque
      }
      this.handleProductUpdate(objProduct)
    },
    indexMethod(index) {
      return index * 2
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = ''
          return
        }
        if (index === 1) {
          sums[index] = ''
          return
        }
        if (index === 2) {
          sums[index] = ''
          return
        }
        if (index === 3) {
          sums[index] = ''
          return
        }
        if (index === 4) {
          sums[index] = 'Total:'
          return
        }
        if (index === 6) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = 'R$ ' + values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },
    productSetById() {
      console.log(this.busca.produto.id);
      this.item = this.produtos.find(x => parseInt(x.id) === parseInt(this.busca.produto.id))
      console.log(this.item);
      // itemAdd_descricao = item.descricao
    },
    productSet(row) {
      this.item = this.produtos.find(x => parseInt(x.id) === parseInt(row.id))
      // itemAdd_descricao = item.descricao
      
    },
    produtoIncluir(ean) {
      this.addList(ean)
      this.produtosListFlg = false
    },
    clienteSet(row) {
      // this.listQuery.ean = ean
      console.log('cliente id:', row.id)
      this.cliente.id = row.id
      this.cliente.nome = row.nome
      this.clientesListFlg = false
      this.msgMain = { txt: 'Venda em curso', color: '#886A08' }
      this.$refs.ean.focus()
    },
    vendaClose() {
      this.totalGeral = 0
      this.faturado = 0
      // Totaliza
      for (const v of this.list) {
        this.totalGeral += v.subtotal
      }

      this.total_a_pagar = this.totalGeral

      // clean up form
      this.desconto = 0
      this.acrescimo = 0
      this.pago_dinheiro = 0
      this.pago_credito = 0
      this.totalpago = 0
      this.pago_troco = 0 - this.total_a_pagar
      this.vendaCloseFlg = true
    },
    vendaCloseOk() {
      var self = this
      this.totalpago = this.pago_dinheiro + this.pago_debito + this.pago_credito
      const b = { 
        vendaID: this.vendaID, 
        cliente: this.cliente.id, 
        subtotal: this.totalGeral, 
        desconto: this.desconto, 
        acrescimo: this.acrescimo, 
        total: this.total, 
        faturado: this.faturado, 
        dinheiro: this.pago_dinheiro, 
        debito: this.pago_debito, 
        credito: this.pago_credito, 
        totalpago: this.totalpago, 
        troco: this.pago_troco, 
        itens: this.list }
      console.log('b>>', b)
      const json = JSON.stringify(b)
      console.log(':::>>', json)

      // Try save operation in server

      const post_data = { json_data: json }
      // axios.post(self.server+'/vendaClose', post_data)

      vendaClose(post_data).then((ret) => {
        // this.temp.id = response.data
        console.log('response:', ret) 
        this.$notify({
              title: 'Sucesso',
              message: 'Venda registrada com sucesso!',
              type: 'success',
              duration: 2000
            })
      })


      // Reset venda
      this.vendaID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      this.total_a_pagar = 0
      this.totalGeral = 0

      // clean up form
      this.desconto = 0
      this.acrescimo = 0
      this.pago_dinheiro = 0
      this.pago_debito = 0
      this.pago_credito = 0
      this.pago_troco = 0 - this.total_a_pagar
      this.list = []

      this.listQuery.ean = ''
      this.listQuery.descricao = ''

      this.itemAdd_descricao = ''
      this.itemAdd_pco_venda = 0

      this.vendaCloseFlg = false
      this.vendaCloseOkVisible = true
      this.vendaItem = 0
    },
    vendaCloseOkEnd() {
      this.totalItens = 0
      this.msgMain = { txt: 'Caixa Livre', color: 'green' }
      this.listQuery.descricao = ''
      this.$refs.ean.focus()
      this.vendaCloseOkVisible = false
    },
    scrollToEnd() {
      // var container = this.$el.querySelector('#container')
      // container.scrollTop = container.scrollHeight
    },
    addDiversos() {

      this.msgMain = { txt: 'Venda em curso', color: '#886A08' }
      this.vendaItemId++
      var descricao = this.diversos.txt||'Diversos'
      console.log(descricao);
      this.subtotal = (parseFloat(this.qnt) * parseFloat(this.diversos.valor)) // Calc row subtotal
      this.list.unshift({ id: this.vendaItemId, vendaID: this.vendaID, ean: '00001', descricao: descricao, pco_venda: this.diversos.valor, unidade: 'uni', qnt: this.qnt, subtotal: this.subtotal })
      this.total = 1 // Rows total

      this.itemAdd_ean = '00001'
      this.itemAdd_descricao = descricao
      this.itemAdd_unidade = 'Uni'
      this.itemAdd_pco_venda = this.diversos.valor
      this.itemAdd_subTotal = this.subtotal

      // Itens sum
      this.totalItens = 0
      for (let t = 0; t < this.list.length; t++) {
        this.totalItens += this.list[t].qnt
      }

      // Total Calc
      this.totalGeral += (parseFloat(this.qnt) * parseFloat(this.diversos.valor))

      // Just to simulate the time of the request
      setTimeout(() => {
        this.scrollToEnd()
      }, 0.2 * 1000)

      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)

      // Reset top doc values
      this.listQuery.ean = ''
      this.qnt = 1

      // Clean up diversos fields
      this.diversos.txt = ''
      this.diversos.valor = 0

      // EAN input focus to get ready to next product EAN enter
      this.$refs.ean.focus()
    },
    addList() {
      var id = this.item.id
      console.log('id:>', id);
      
      if (id > 0){

        this.msgMain = { txt: 'Venda em curso', color: '#886A08' }
        this.produtosListFlg = false
        this.listLoading = true

        console.log('this.produtos:', this.produtos);
        

        // Search product EAN code in produtos
        console.log('id:', parseInt(id))
        var item = null
        // for (var t=0; t<this.produtos.length; t++){
        //   console.log(parseInt(this.produtos[t].id), parseInt(id), parseInt(this.produtos[t].id) == parseInt(id));
          
        //   if (parseInt(this.produtos[t].id) == parseInt(id)){
        //     console.log('!!');
            
        //     item = this.produtos[t] 
        //   }
        // }
        var item = this.produtos.find(x => parseInt(x.id) === parseInt(id))
        console.log('item:', item);
        // fetchList({ ean: ean }).then(response => {
          // Caso encontre o código de barra no banco executa bloco
        if (item) {
          this.vendaItemId++ // add one in venda ID
          // var item = response.data.items[0] // Aux var
          // var item = produto // Aux var
          var subtotal = (parseFloat(this.qnt) * parseFloat(item.pco_venda)) // Calc row subtotal
          // console.log('item:', item.ean);
          // Add in list array
          this.itemN++
          // this.list.unshift({ id: this.vendaItemId, itemN: this.itemN, id_produto: item.id, vendaID: this.vendaID, ean: item.ean||0, descricao: item.descricao, pco_venda: item.pco_venda, unidade: item.unidade, qnt: this.qnt, subtotal: subtotal })
          this.list.unshift({ id: this.vendaItemId, itemN: this.itemN, id_produto: item.id, vendaID: this.vendaID, ean: item.ean||0, descricao: item.descricao, pco_venda: item.pco_venda, unidade: item.unidade, qnt: this.qnt, subtotal: subtotal })
          this.total = 1 // Rows total


          this.itemAdd_ean = item.ean
          this.itemAdd_id = item.id
          this.itemAdd_qnt = item.qnt
          this.itemAdd_descricao = item.descricao
          this.itemAdd_unidade = item.unidade
          this.itemAdd_pco_venda = item.pco_venda
          this.itemAdd_subTotal = subtotal

          // Itens sum
          this.totalItens = 0
          for (let t = 0; t < this.list.length; t++) {
            this.totalItens += this.list[t].qnt
          }

          // Total Calc
          this.totalGeral += (parseFloat(this.qnt) * parseFloat(item.pco_venda))

          // Just to simulate the time of the request
          setTimeout(() => {
            this.scrollToEnd()
          }, 0.2 * 1000)

          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)

          // Reset top doc values
          this.listQuery.ean = ''
          this.qnt = 0
          // this.item =


          // EAN input focus to get ready to next product EAN enter
          this.$refs.ean.focus()
          
        } else {
          // Caso não encontre o código de barra no banco pula para Incluir
          this.handleProductCreate(ean)
        }
        this.item = null
        // })
      }
    },
    searchProduct(obj) {
      // If search word have more than 2 chars execute block
      if (true) {
        this.produtosListFlg = true // Open products window
        this.listLoading = true // Open listLoading

        // Search obj in databank
        fetchList('produtos', {find: obj}).then(response => {
          console.log('response.data.items:', response.data.items)
          this.produtosList = response.data.items
          this.total2 = response.data.total

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else {
        // Show warning advise when desc words are less than 3 words
        this.$notify({
          title: 'Procurar',
          message: 'Digite mais de 2 dígitos',
          type: 'warning',
          duration: 2000
        })
      }

      // Reset search input fields
      this.listQuery.ean = ''
      this.listQuery.descricao = ''
    },
    getCliente(x) {
      const self = this
      // this.cliente.id = ""
      // this.cliente.nome = ""
      self.clientesList = []
      if (this.cliente.id){
        this.cliente.nome = ""
      }
      if (this.cliente.nome){
        this.cliente.id = ""
      }
      if (1==1) {
        this.clientesListFlg = true
        this.listLoading = true
        fetchList('clientes', {find: x}).then(response => {
          console.log('response.data-->:', response.data)
          self.clientesList = response.data.items
          this.total2 = response.data.total
          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        }).catch(function(error) {
          // handle error
          console.log(error)
        })
        .finally(function() {
          // always executed
        })
      } else {
        this.$notify({
          title: 'Procurar',
          message: 'Digite mais de 2 dígitos',
          type: 'warning',
          duration: 2000
        })
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: 'Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: this.temp.id,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleProductCreate(ean) {
      this.resetTemp()

      // alert(ean)
      if (ean != null) this.temp.ean = ean



      this.eansearch(ean).then((result) => {
           console.log('result:', result.data);

           this.temp.descricao = result.data

           // if (this.eansearch()) {this.temp.descricao = this.eansearch()}

           // this.$refs.tempPco_venda.focus()

           // this.qnt = 10
           this.temp.id++
           // console.log('this.temp.id:', this.temp.id)
           // console.log('ean:', ean)
           this.temp.ean = ean
           this.temp.qnt = this.qnt
           this.temp.unidade = 'uni'
           this.temp.estoque = 10
           this.dialogStatus = 'create'
           this.dialogFormVisible = true
           this.$nextTick(() => {
             this.$refs['dataForm'].clearValidate()
             this.$refs.form_descricao.focus()
           })
           this.listQuery.ean = ''
           this.qnt = 1
       })


    },
    createData() {
      var self = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {

          //Add new product in product array
          this.vendaItemId++
          const aux = { id: this.vendaItemId, ean: this.temp.ean, descricao: this.temp.descricao, pco_venda: this.temp.pco_venda, unidade: this.temp.unidade, qnt: this.qnt, subtotal: (parseFloat(this.qnt) * parseFloat(this.temp.pco_venda)) }
          console.log(aux)
          this.produtos.push(aux)

          //Add new product in local storage
          localStorage.removeItem('produtos');
          localStorage.setItem('produtos', JSON.stringify(this.produtos));

          this.$refs.ean.focus()
          this.total = this.produtos.length

          // this.totalGeral += (parseFloat(this.qnt) * parseFloat(this.temp.pco_venda))

          // itens sum
          this.totalItens = 0
          for (let t = 0; t < this.list.length; t++) {
            this.totalItens += this.list[t].qnt
          }

          console.log('this.totalItens:', this.totalItens)

          this.itemAdd_ean = this.temp.ean
          this.itemAdd_descricao = this.temp.descricao
          this.itemAdd_pco_venda = this.temp.pco_venda



          // Add in venda lista
          this.addList(this.temp.ean)

          // Zera campo de código
          this.listQuery.ean = ''

          this.dialogFormVisible = false



          //Add new product in databank

            create(this.temp).then(() => {
              this.$notify({
                title: 'Sucesso',
                message: 'Produto cadastrado com sucesso',
                type: 'success',
                duration: 2000
              })
            }, function(motivo) {
              self.$notify({
                title: 'erro2',
                message: motivo,
                type: 'error',
                duration: 2000
              })
            })

        }
      })
    },
    handleProductUpdate(row) {
      console.log(row)
      this.temp2 = Object.assign({}, row) // copy obj
      this.temp2.timestamp = new Date(this.temp2.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormProductUpdateVisible = true
      this.$nextTick(() => {
        this.$refs['dataFormProductEdit'].clearValidate()
      })
    },
    handleUpdate(row) {
      alert(row)
      console.log(row)
      this.temp2 = Object.assign({}, row) // copy obj
      this.temp2.timestamp = new Date(this.temp2.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormQntVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp2)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // updateArticle(tempData).then(() => {
          for (const v of this.list) {
            console.log('this.temp2.id:', this.temp2.id)
            if (v.id === this.temp2.id) {
              const index = this.list.indexOf(v)
              this.list.splice(index, 1, this.temp2)
              break
            }
          }
          this.dialogFormVisible = false
          this.$notify({
            title: 'Sucesso',
            message: 'Registro alterado',
            type: 'success',
            duration: 2000
          })
          // itens sum
          this.totalItens = 0
          for (let t = 0; t < this.list.length; t++) {
            this.totalItens += this.list[t].qnt
          }
          // Totaliza
          this.totalGeral = 0
          for (const v of this.list) {
            this.totalGeral += v.subtotal
          }
          this.dialogFormQntVisible = false
          // })
        }
      })
    },
    updateProductEdit() {
      this.$refs['dataFormProductEdit'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp2)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
        update(tempData).then(() => {
          for (const v of this.list) {
            console.log('this.temp2.id:', this.temp2.id)
            if (v.id === this.temp2.id) {
              const index = this.list.indexOf(v)
              this.list.splice(index, 1, this.temp2)
              break
            }
          }
          this.dialogFormProductUpdateVisible = false
          this.$notify({
            title: 'Sucesso',
            message: 'Registro alterado',
            type: 'success',
            duration: 2000
          })
         })
        }
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
      this.totalGeral -= row.subtotal
      const index = this.list.indexOf(row)

      this.list.splice(index, 1)
      // itens sum
      this.totalItens = 0
      for (let t = 0; t < this.list.length; t++) {
        this.totalItens += this.list[t].qnt
      }
      // this.vendaItem--
    },
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
