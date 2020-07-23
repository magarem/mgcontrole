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
    <el-row :gutter="20">
      <el-col :span="17">
        <!-- <el-card  class="box-card" shadow="always"> -->
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
        <!-- </el-card> -->
      </el-col>
      <el-col :span="7">
        <el-card class="box-card" shadow="always" style="height: 270px">
          <el-row type="flex" class="row-bg">
            <el-col :span="24">
              <el-row :gutter="15" type="flex" class="row-bg">
                <el-col :span="24">
                  <span v-if="cupom.cliente.nome" style="font-size: 25px;">
                    <a @click="getCliente"><b>Cliente</b></a>:<br>{{ cupom.cliente.id }}<span v-if="cupom.cliente.id"> - </span>
                    {{ cupom.cliente.nome }}
                  </span>
                </el-col>
              </el-row>
              <el-row :gutter="15" type="flex" class="row-bg" style="margin-top: 17px">
                <el-col :span="24">
                  <div style="font-family: verdana; font-size: 25px; ">
                    <b>Itens:</b> {{ cupom.itens.length }}
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="15" type="flex" class="row-bg" style="margin-top: 10px">
                <el-col :span="24">
                  <div style="font-family: tahoma; font-size: 25px;">
                    <b>Total:</b> {{ cupom.subtotal | money }}
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="5" type="flex" class="row-bg" style="margin-top: 33px">
                <el-col :span="12">
                  <!-- <el-button
                    v-waves
                    style="font-size:20px; width: 100%;"
                    class="filter-item"
                    type="primary"
                    icon="el-icon-search"
                    @click="clientesListFlg = true"
                  >
                    Cliente
                  </el-button> -->
                  <el-button v-show="cupom.total > 0" style="height:60px; font-size:25px; width: 100%;" type="success" icon="el-icon-check" @click="vendaClose()">
                    Pagar
                  </el-button>
                </el-col>
                <el-col :span="12">
                  <el-button
                    v-show="cupom.total>0"
                    style="height:60px; font-size:25px; width: 100%;"
                    type="danger"
                    @click="vendaCancel()"
                  >
                    Cancelar
                  </el-button>
                </el-col>
              </el-row>
              <br>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="20">
      <!--
          Products List
      -->
      <el-col :span="17">
        <el-card class="box-card" shadow="always">
          <el-row>
            <el-col :span="24">
              <el-row justify="center">
                <el-col :span="24">
                  <div style="font-size: 20px; text-align:center; background-color: #4D5C7A; color: white; padding: 5px;">Produtos</div>
                </el-col>
              </el-row>
              <el-input
                ref="searchTerm"
                v-model="searchTerm"
                placeholder="Nome ou código do produto"
                prefix-icon="el-icon-search"
                style="margin: 0px; padding: 5px; width: 100%; color: white; font-size: 20px; background-color: #4C5C7A"
                _class="vgt-input vgt-pull-left"
                autocomplete="nope"
              />
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
                max-height="200px"
                @on-row-click="productSet"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card v-show="product_selected.id" class="box-card box_product_selected" shadow="always">
          <el-row :gutter="20">
            <el-col :span="24">
              {{ product_selected.id }} -
              {{ product_selected.descricao }}<br>
              <span style="font-size:40px;">{{ product_selected.pco_venda | money }}/{{ product_selected.unidade }}</span><br>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 10px">
            <el-col :span="12">
              Quantidade:<br>
              <!-- <input ref="qnt" v-model="product_selected.qnt" style="width: 100%; margin-top: 5px; font-size: 22px;" class="el-input__inner" @keyup.enter="cupom_add()"> -->
              <input ref="qnt" v-model="qnt" style="width: 100%; margin-top: 5px; font-size: 22px;" class="el-input__inner" @keyup.enter="cupom_add()">
            </el-col>

            <el-col :span="12">
              Valor:<br>
              <money v-model="product_selected.total" v-bind="money" style="width: 100%; margin-top: 5px; font-size: 22px;" class="el-input__inner" />
            </el-col>
          </el-row>
          <el-row :gutter="5" style="margin-top: 20px">
            <el-col :span="12">
              <el-button v-waves style="width: 100%; height: 60px; font-size: 25px;" class="filter-item" type="primary" _icon="el-icon-search" @click="cupom_add">
                Ok
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button v-waves style="width: 100%; height: 60px; font-size: 25px;" class="filter-item" type="warning" _icon="el-icon-search" @click="product_selected = {}">
                Cancela
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!----                                                        ----->
    <!----          Modal aux windows                             ----->
    <!----                                                        ----->

    <!-- CUPOM view row -->
    <el-dialog :visible.sync="dialogFormCupomView" :title="textMap[dialogStatus]" top="5vh">
      <el-form ref="dataForm" :model="temp2" label-position="right" label-width="140px" style="_width: 400px; _margin-left:50px; font-size: 18px;">
        <el-form-item label="Código:" prop="ean">
          <el-input v-model="temp2.id" />
        </el-form-item>
        <el-form-item label="Descrição:" prop="descricao">
          <el-input v-model="temp2.descricao" />
        </el-form-item>
        <el-form-item label="Preço:" prop="preco">
          <el-input v-model="temp2.pco_venda" />
        </el-form-item>
        <el-form-item label="Unidade:" prop="unidade">
          <el-input v-model="temp2.unidade" />
        </el-form-item>
        <el-form-item label="Quantidade:" prop="qnt">
          <el-input v-model="temp2.qnt" style="width: 100px;" />
          <!-- <input ref="qnt" v-model="temp2.qnt" :min="1" :max="10" @change="temp2.subtotal = temp2.qnt * temp2.pco_venda" /> -->
        </el-form-item>
        <el-form-item label="subtotal:" prop="total">
          <el-input v-model="temp2.subtotal" />
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
    <el-dialog :visible.sync="vendaCloseFlg"  width="60%" center top="5vh">
      <span slot="title" style="font-size: 35px">Fechamento de venda</span>
      <el-form ref="form" style="font-size: 20px" :model="form" label-width="0px" label-position=top>
        <el-row :gutter="25">
              <el-col :span="12">

                 <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>Total da compra</span>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button> -->
                  </div>
                  <div>
                  <div style="margin-bottom: 10px">Sub Total:
                   <span style="font-size: 25px;">{{ cupom.subtotal | money }}</span>
                  </div>
                  <div style="margin-bottom: 10px">Desconto:</div>
                  <money v-model="desconto" v-bind="money" class="el-input__inner" />
                   <div style="margin-top: 15px; margin-bottom: 15px">Total a pagar:
                <!-- <el-form-item label="Total a pagar"> --><br>
                <span style="font-size: 45px;">{{ (cupom.subtotal - desconto) | money }}</span></div>
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
                    <div style="margin-top: 0px; margin-bottom: 15px">Dinheiro:<br>
                      <money v-model="pago_dinheiro" v-bind="money" class="el-input__inner" />
                    </div>
                    <div style="margin-bottom: 15px">Cartão de débito:<br>
                      <money v-model="pago_debito" v-bind="money" class="el-input__inner" />
                    </div>
                    <div style="margin-bottom: 15px">Cartão de crédito:<br>
                      <money v-model="pago_credito" v-bind="money" class="el-input__inner" />
                    </div>
                    <div v-if="cupom.cliente.id > 1" style="margin-bottom: 15px">Faturado:
                      <money v-model="pago_faturado" v-bind="money" class="el-input__inner" />
                    </div>
                    <div v-if="pago_falta > 0" style="margin-top: 15px; margin-bottom: 5px">Falta pagar:
                      {{pago_falta | money}}
                    </div>
                    <div v-if="pago_falta <= 0" style="margin-top: 15px; margin-bottom: 5px">Troco:
                      {{pago_falta | money}}
                    </div>
                </div>
                </el-card>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="pago_falta <= 0" type="primary" @click="vendaCloseOk();">Confirma</el-button>
        <el-button @click="vendaCloseFlg = false">
          Cancela
        </el-button>
      </span>
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
        <el-button type="primary" @click="clientesListFlg = false">Fechar</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/generic'
import { vendaClose } from '@/api/vendaClose'
import waves from '@/directive/waves' // waves directive
import { Money } from 'v-money'
// import the styles
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'

export default {
  name: 'Balcao',
  components: { Money, VueGoodTable },
  directives: { waves },
  filters: {
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
      search: {
        cliente: null
      },
      cupom: {
        cliente: {
          id: 1,
          nome: 'Indefinido'
        },
        itens: [],
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
          label: 'ID',
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
          label: 'total (R$)',
          field: 'total',
          type: 'decimal'
        }
      ],
      columns: [
        {
          label: 'ID',
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
      this.qnt = this.qnt ? this.qnt.replace(',', '.') : ''
      this.product_selected.qnt = this.qnt
      this.product_selected.total = this.product_selected.qnt * this.product_selected.pco_venda
    },
    desconto: function() {
      // this.cupom.total = this.cupom.total - this.desconto
      if (this.desconto > this.cupom.total) { 
        return this.cupom.total
      }else{
        this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
        this.pago_falta = this.cupom.total - this.desconto - this.valor_pago
      }
    },
    pago_dinheiro: function() {
      // this.cupom.total = this.cupom.total - this.desconto
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.total - this.desconto - this.valor_pago
    },
    pago_debito: function() {
      // this.cupom.total = this.cupom.total - this.desconto
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.total - this.desconto - this.valor_pago
    },
    pago_credito: function() {
      // this.cupom.total = this.cupom.total - this.desconto
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.total - this.desconto - this.valor_pago
    },
    pago_faturado: function() {
      // this.cupom.total = this.cupom.total - this.desconto
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito) + parseFloat(this.pago_faturado))
      this.pago_falta = this.cupom.total - this.desconto - this.valor_pago
    }
  },
  mounted() {
    this.vai()
  },
  created() {
    fetchList('produtos', '').then(response => {
      this.produtos = response.data.items
    })
  },
  methods: {
    vai() {
      this.$refs.searchTerm.focus()
      this.searchTerm = null
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
      this.msgMain = { txt: 'Venda em curso', color: '#886A08' }
      this.product_selected.qnt = this.product_selected.qnt.replace(',', '.')
      // Procura produto pelo ID
      if (this.product_selected.id) {
        var auxObj = {
          id: this.product_selected.id,
          descricao: this.product_selected.descricao,
          pco_venda: this.product_selected.pco_venda,
          qnt: this.product_selected.qnt,
          unidade: this.product_selected.unidade,
          total: this.product_selected.qnt * this.product_selected.pco_venda
        }
        this.cupom.itens.unshift(auxObj)
        this.cupom.subtotal += (parseFloat(this.product_selected.qnt) * parseFloat(this.product_selected.pco_venda)) // Calc row subtotal

        // Total Calc
        this.cupom.total = this.cupom.subtotal // += (parseFloat(this.qnt) * parseFloat(item.pco_venda))

        // Reset qnt
        this.product_selected = {}
        this.search = {}
        this.qnt = null
        this.vai()
      }
    },
    cupomRowView(params) {
      this.dialogFormCupomView = true
      this.temp2 = params.row
    },
    productSet(params) {
      console.log(params)
      // this.item = this.produtos.find(x => parseInt(x.id) === parseInt(params.row.id))
      this.product_selected = params.row
      this.product_selected.qnt = 0.0
      this.product_selected.total = 0
      console.log('this.product_selected:', this.product_selected)
      this.$nextTick(() => {
        this.vai2()
      })
    },
    vendaClose() {
      this.desconto = 0
      this.pago_dinheiro = 0
      this.pago_debito = 0
      this.pago_credito = 0
      this.pago_faturado = 0
      this.pago_troco = 0
      this.pago_falta = this.cupom.total
      this.vendaCloseFlg = true
    },
    vendaCloseOk() {
      console.log('this.cupom', this.cupom)
      this.cupom.total = this.cupom.subtotal - this.desconto
      this.totalpago = this.pago_dinheiro + this.pago_debito + this.pago_credito + this.pago_faturado

      // this.falta_pagar = this.cupom.total - this.totalpago
      const auxObj = {
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
        this.cupom = {
          cliente: {
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
    vendaCancel() {
      this.cupom = {
        cliente: {
          id: 1,
          nome: 'Indefinido'
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
      this.cupom.itens = this.cupom.itens.filter(item => item.id !== row.id)
      this.dialogFormCupomView = false
    }
  }
}
</script>
