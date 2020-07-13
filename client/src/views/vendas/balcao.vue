<style scoped>
  /* It is simple way to use scroll bar to table body*/
  .box_product_selected {
    font-size: 25px;
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
  <div class="app-container">
    <el-row :gutter=20>
      <el-col :span="17">
        <el-row type="flex" class="row-bg" justify="center" _style="background-color: #112940">
          <el-col :span="24">
            <el-row justify="center">
              <el-col :span="24">
                <div style="text-align:center; background-color: #121e33; color: white; padding: 5px;">CUPOM</div>
              </el-col>
            </el-row>
            <el-row justify="center">
              <el-col :span="24">
                <vue-good-table
                  :columns="columns_cupom"
                  :rows="cupom.itens"  
                  theme="nocturnal" 
                  max-height="255px"
                  @on-row-click="cupomRowView" >
                  <div slot="emptystate">
                    Caixa livre
                  </div>
                </vue-good-table>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="7" >
        <el-card class="box-card" shadow="always" style="height: 270px">
          <el-row type="flex" class="row-bg">
            <el-col :span="24" >
              <el-row :gutter=15 type="flex" class="row-bg">
                <el-col :span="24" >
                  <span v-if="cupom.cliente.nome" style="margin-right: 10px; font-size: 25px;">
                    {{ cupom.cliente.id }}<span v-if="cupom.cliente.id"> - </span>
                    {{ cupom.cliente.nome }}
                  </span>
                  <div style="font-family: verdana; font-size: 25px; margin-top:10px;">
                    Itens: {{ cupom.itens.length }}
                  </div>
                  <div  style="font-family: tahoma; font-size: 25px;">
                    Total: {{ cupom.subtotal | money }}
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter=15 type="flex" class="row-bg" style="margin-top:15px">
                <el-col :span="12" >
                  <el-button v-waves 
                    style="font-size:20px; width: 100%;" 
                    class="filter-item" type="primary" 
                    @click="clientesListFlg = true" 
                    icon=el-icon-search>
                    Cliente
                  </el-button>
                </el-col>
                <el-col :span="12" >
                  <el-button v-show="cupom.total>0" 
                    style="font-size:20px; width: 100%;" 
                    type="warning" icon="el-icon-cancel" 
                    @click="vendaCancel()">
                    Cancelar
                  </el-button>
                </el-col> 
              </el-row>
              <br>
              <el-button v-show="cupom.total > 0" style="height:60px; font-size:25px; width: 100%;" type="success" icon="el-icon-check" @click="vendaClose()">
                Pagar
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter=20 >
      <!--
          Products List
      -->
      <el-col :span="17">
        <el-row>
          <el-col :span="24">
            <el-input
              placeholder="Nome ou código do produto"
              prefix-icon="el-icon-search"
              ref=searchTerm v-model="searchTerm" style="padding: 5px; width: 100%; color: white; font-size: 20px; background-color: #4C5C7A" _class="vgt-input vgt-pull-left">
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <vue-good-table
              :columns="columns"
              :rows="produtos"
              :search-options="{
                enabled: false,
                externalQuery: searchTerm
              }"
              theme="black-rhino" 
              max-height="290px"
              @on-row-click="productSet"
              >
            </vue-good-table>
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
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="7">
        <el-card v-show="product_selected.id" class="box-card box_product_selected" shadow="always">
          <el-row :gutter=20 >
           <el-col :span="24">
            {{ product_selected.id }}<br>
            {{ product_selected.descricao }}<br>
            {{ product_selected.pco_venda | money }}/{{ product_selected.unidade }}<br><br>
             Quantidade:<br>
             <input ref=qnt v-model="product_selected.qnt"  style="width: 100%; margin-top: 5px; font-size: 22px;" class="el-input__inner" @keyup.enter="cupom_add()" />
             Valor:<br>
             <input v-model="product_selected.total" v-bind="money" style="width: 100%; margin-top: 5px; font-size: 22px;" class="el-input__inner"  />
           </el-col>
          </el-row>
          <el-row :gutter=20 style="margin-top: 20px">
            <el-col :span="24">
              <el-button v-waves  class="filter-item" type="success" _icon="el-icon-search" @click="cupom_add">
                Registra item
              </el-button>
              <el-button v-waves  class="filter-item" type="warning" _icon="el-icon-search" @click="product_selected = {}">
                Cancela item
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row >





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

    <!-- CUPOM view row -->
    <el-dialog :visible.sync="dialogFormCupomView" :title="textMap[dialogStatus]" top="5vh">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="140px" style="_width: 400px; _margin-left:50px; font-size: 18px;">
        <el-form-item label="Código:" prop="ean">
          <el-input v-model="temp2.id"></el-input>
        </el-form-item>
        <el-form-item label="Código:" prop="ean">
          <el-input v-model="temp2.id"></el-input>
        </el-form-item>
        <el-form-item label="Descrição:" prop="descricao">
          <el-input v-model="temp2.descricao"></el-input>
        </el-form-item>
        <el-form-item label="Preço:" prop="preco">
          <el-input v-model="temp2.pco_venda"></el-input>
        </el-form-item>
        <el-form-item label="Unidade:" prop="unidade">
          <el-input v-model="temp2.unidade"></el-input>
        </el-form-item>
        <el-form-item label="Quantidade:" prop="qnt">
          <el-input v-model="temp2.qnt" style="width: 100px;"></el-input>
          <!-- <input ref="qnt" v-model="temp2.qnt" :min="1" :max="10" @change="temp2.subtotal = temp2.qnt * temp2.pco_venda" /> -->
        </el-form-item>
        <el-form-item label="subtotal:" prop="total">
          <el-input v-model="temp2.subtotal"></el-input>
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
    <el-dialog :visible.sync="vendaCloseFlg" title="Fechamento de venda" width="60%" center top="5vh">
      <el-form ref="form" :model="form" label-width="170px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-row>
              <el-col :span="24"><div class="grid-content bg-purple-dark">Venda</div></el-col>
            </el-row>
            <el-form-item label="Total">
              {{ cupom.subtotal | money }}
            </el-form-item>
            <el-form-item label="Desconto">
              <money v-model="desconto" v-bind="money" class="el-input__inner" />
            </el-form-item>
            <el-form-item label="Total a pagar">
              {{ (cupom.subtotal - desconto) | money }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="24"><div class="grid-content bg-purple-dark">Pagamento</div></el-col>
            </el-row>
            <div>
              <el-form-item label="Dinheiro">
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
              <el-form-item label="Faturado">
                <money v-model="pago_faturado" v-bind="money" class="el-input__inner" />
              </el-form-item>
              <!-- <el-form-item label="Falta pagar">
                <money v-model="falta_pagar" v-bind="money" class="el-input__inner" />
              </el-form-item> -->
              <el-form-item label="Falta pagar" v-if="pago_falta > 0">
                <money v-model="pago_falta" v-bind="money" class="el-input__inner" />
              </el-form-item>
              <el-form-item label="Troco" v-if="pago_falta <= 0">
                <money v-model="pago_falta" v-bind="money" class="el-input__inner" />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button  type="primary" @click="vendaCloseOk();">Confirma</el-button>
        <el-button @click="vendaCloseFlg = false">
            Cancela
        </el-button>
      </span>
    </el-dialog>

    <!-- Clientes busca lista -->
    <el-dialog :visible.sync="clientesListFlg" title="Busca cliente" width="70%" align="center">
      <input ref="clienteBusca" placeholder="Nome" v-model="search.cliente" class="el-input__inner" style="width: 250px; height: 33px; margin-bottom:10px;" @keyup.enter="getCliente">
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
// import the styles
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
// import elTableInfiniteScroll from 'el-table-infinite-scroll';
import { ModelSelect } from 'vue-search-select'
import 'vue-search-select/dist/VueSearchSelect.css'

async function foo(ean){
    var data = await fetch(process.env.VUE_APP_BASE_API + '/eansearch?ean='+ean); // notice the await
    // code here only executes _after_ the request is done
    console.log('data:', data);
    return data // data is defined
}
export default {
  name: 'Balcao',
  components: { Pagination, Money, VueGoodTable, ModelSelect },
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
      search:{
        cliente: null
      },
      cupom:{
        cliente:{
          id: 1,
          nome: 'Indefinido'
        },
        itens:[],
        subtotal: null,
        desconto: null,
        total: null
      },
      dialogFormCupomView: false,
      product_selected: {
        qnt: null
      },
      searchTerm: null,
      xx: true,
      itemx: {
        value: '',
        text: ''
      },
      columns_cupom:[
          {
            label: 'ID',
            field: 'id',
          },
          {
            label: 'Descricao',
            field: 'descricao',
            type: 'string',
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
            type: 'string',
          },
          {
            label: 'total (R$)',
            field: 'total',
            type: 'decimal'
          }
      ],
      columns: [
          {
            label: 'ID',
            field: 'id',
          },
          {
            label: 'Descricao',
            field: 'descricao',
            type: 'string',
          },
          {
            label: 'Preço',
            field: 'pco_venda',
            type: 'decimal'
          },
          {
            label: 'Unidade',
            field: 'unidade',
            type: 'string',
          },
        ],
        server: '/dev-api',
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
        subtotal: null,
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
        pago_faturado: 0,
        pago_falta: 0,
        total_a_pagar: 0,
        desconto: 0,
        acrescimo: 0,
        pago_falta: 0,
        // vendaID: Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 6),
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
        qnt: null,
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
    desconto: function() {
      this.cupom.total = this.cupom.total - this.desconto 
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.total - this.valor_pago 
    },
    pago_dinheiro: function() {
      // this.cupom.total = this.cupom.total - this.desconto 
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.total - this.valor_pago
    },
    pago_debito: function() {
      // this.cupom.total = this.cupom.total - this.desconto 
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.total - this.valor_pago
    },
    pago_credito: function() {
      // this.cupom.total = this.cupom.total - this.desconto 
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito)  + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.total - this.valor_pago
    },
    pago_faturado: function() {
      // this.cupom.total = this.cupom.total - this.desconto 
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito)  + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.total - this.valor_pago
    }
  },
  mounted(){
    this.vai()
  },
  created() {
    // this.$refs.searchTerm.focus()
    // this.$nextTick(() => this.$refs.searchTerm.$el.focus())
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
    cupomRowView(params) {
      this.dialogFormCupomView = true
      this.temp2 = params.row
      console.log('params:', params);
    },
    vai(){
      this.$refs.searchTerm.focus()
      // this.$refs.searchTerm.$refs.input
      this.searchTerm = null
    },
    vai2(){
      this.$refs.qnt.focus()
    },
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
    productSet(params) {
      console.log(params);
      // this.item = this.produtos.find(x => parseInt(x.id) === parseInt(params.row.id))
      this.product_selected = params.row
      this.product_selected.qnt = null
      this.product_selected.total = null
      console.log('this.product_selected:', this.product_selected);
      this.$nextTick(() => {
            this.vai2()
      })
    },
    produtoIncluir(ean) {
      this.addList(ean)
      this.qnt = 0
      this.vai()
    },
    clienteSet(row) {
      // this.listQuery.ean = ean
      console.log('row:', row)
      this.cupom.cliente.id = row.id
      this.cupom.cliente.nome = row.nome
      this.clientesListFlg = false
      this.msgMain = { txt: 'Venda em curso', color: '#886A08' }
      // this.$refs.ean.focus()
    },
    vendaClose() {
      // this.total = 0
      // // Totaliza
      // for (const v of this.cupom.itens) {
      //   this.total += v.total
      // }

      // this.total_a_pagar = this.totalGeral

      // clean up Venda Close form
      this.desconto = 0
      this.pago_dinheiro = 0
      this.pago_credito = 0
      this.pago_faturado = 0
      this.pago_troco = 0
      this.vendaCloseFlg = true
    },
    vendaCloseOk() {
      console.log("this.cupom", this.cupom);
      this.cupom.total = this.cupom.subtotal - this.desconto
      this.totalpago = this.pago_dinheiro + this.pago_debito + this.pago_credito + this.pago_faturado
      // this.falta_pagar = this.cupom.total - this.totalpago
      const auxObj = { 
        cliente: this.cupom.cliente.id, 
        subtotal: this.cupom.subtotal, 
        desconto: this.desconto, 
        total: this.cupom.total, 
        dinheiro: this.pago_dinheiro, 
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
        this.cupom = {
          cliente:{
            id: 1,
            nome: 'Indefinido'
          },
          itens: [],
          subtotal: 0,
          total: 0
        }
       this.$notify({
          title: 'Sucesso',
          message: 'Venda registrada com sucesso!',
          type: 'success',
          duration: 2000
        })
        
      })

      // Reset venda
      // this.vendaID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      // this.cupom = {}

      // Clean up form
      this.desconto = 0
      this.acrescimo = 0
      this.pago_dinheiro = 0
      this.pago_debito = 0
      this.pago_credito = 0
      this.pago_faturado = 0
      this.pago_troco = 0

      // Close modal
      this.vendaCloseFlg = false
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
      // this.totalItens = 0
      // for (let t = 0; t < this.list.length; t++) {
      //   this.totalItens += this.list[t].qnt
      // }

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
    cupom_add() {
      this.msgMain = { txt: 'Venda em curso', color: '#886A08' }
      this.product_selected.qnt = this.product_selected.qnt.replace(',','.')
      // Procura produto pelo ID
      // var item = this.produtos.find(x => parseInt(x.id) === parseInt(id))
      // Caso encontre o código de barra no banco executa bloco
      if (this.product_selected.id) {
       var auxObj = {
          id: this.product_selected.id,
          descricao: this.product_selected.descricao,
          pco_venda: this.product_selected.pco_venda,
          qnt: this.product_selected.qnt,
          unidade: this.product_selected.unidade,
          total: this.product_selected.qnt * this.product_selected.pco_venda
        }

        console.log('auxObj:', auxObj);
        
        this.cupom.itens.unshift(auxObj)
        // this.vendaItemId++ // add one in venda ID
        this.cupom.subtotal += (parseFloat(this.product_selected.qnt) * parseFloat(this.product_selected.pco_venda)) // Calc row subtotal
       
        // Total Calc
        this.cupom.total = this.cupom.subtotal //+= (parseFloat(this.qnt) * parseFloat(item.pco_venda))

        // Reset qnt
        this.product_selected = {}
        this.search = {}
        this.vai()
      }
    },
    addList() {
      if (this.qnt <= 0){
        this.$notify({
          title: 'Erro',
          message: 'Defina a quantidade do produto',
          type: 'warning',
          duration: 2000
        })
        // this.$refs.qnt.focus()
      }else{
        this.xx = false
        this.subtotal = (this.item.pco_venda * this.qnt)
        this.cupom_add(this.item.id)
        // Just to simulate the time of the request
          setTimeout(() => {
            this.xx = true
          }, 1.5 * 100)
        
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
      self.clientesList = []
      if (1==1) {
        // this.clientesListFlg = true
        // this.listLoading = true
        fetchList('clientes', {find: {nome: this.search.cliente}}).then(response => {
          console.log('response.data-->:', response.data)
          self.clientesList = response.data.items
          // this.total2 = response.data.total
          // Just to simulate the time of the request
          // setTimeout(() => {
          //   this.listLoading = false
          // }, 1.5 * 1000)
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
      this.cupom.subtotal  -= row.total
      // const index = this.list.indexOf(row)
      this.cupom.itens = this.cupom.itens.filter(item => item.id !== row.id);
      this.dialogFormCupomView = false
      // this.list.splice(index, 1)
      // itens sum
      // this.totalItens = 0
      // for (let t = 0; t < this.list.length; t++) {
      //   this.totalItens += this.list[t].qnt
      // }
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
