<template>
  <div class="app-container">
    <div class="filter-container">
      <router-link to="/vendas/balcao">
        <el-button class="filter-item" style="margin-left: 10px; height: 50px; font-size: 25px;" type="success">
          Incluir nova venda
        </el-button>
      </router-link>
    </div>
    <div style="width: 90%; margin: auto;">

      <el-table
        v-loading="listLoading"
        :data="vendas"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @row-click="getList_vendaItens"
      >

        <el-table-column label="Data" prop="data" sortable="custom" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ timeConverter(scope.row.data) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Cliente" prop="cliente" sortable="custom" align="center" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.cliente }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Subtotal" prop="subtotal" sortable="custom" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.subtotal | money }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Desconto" prop="desconto" sortable="custom" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.desconto | money }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Total" prop="total" sortable="custom" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.total | money }}</span>
          </template>
        </el-table-column>

      <!-- <el-table-column label="Actions" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            Delete
          </el-button>
        </template>
      </el-table-column> -->
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" layout="prev, pager, next" @pagination="getVendas" />

    </div>
    <!--

    Modal Venda details

    -->
    <el-dialog :visible.sync="dialogPvVisible" title="Venda" width="80%" top="5vh" center>
      <span slot="title" style="font-size: 30px; margin-bottom: 100px;">Venda detalhada</span>
      <el-row :gutter="10" type="flex" class="row-bg">
        <el-col :span="2"><div class="grid-content bg-purple"><b>#:</b> {{ venda_selected.id }}</div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple"><b>Data:</b> {{ timeConverter(venda_selected.data) }}</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple"><b>Subtotal:</b> {{ venda_selected.subtotal | money }}</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple"><b>Desconto:</b> {{ venda_selected.desconto | money }}</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple"><b>Total:</b> {{ venda_selected.total | money }}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24"><div class="grid-content bg-purple"><b>Cliente:</b> {{ venda_selected.cliente }} - {{ venda_selected.nome }}</div></el-col>
      </el-row>

      <vue-good-table
        :columns="venda_itens_columns"
        :rows="venda_selected.itens"
        :search-options="{ enabled: false }"
        :line-numbers="true"
        theme="black-rhino"
      />

      <!-- <table class=table1 v-if=venda_selected.pagamento >
        <tr>
            <th class=titulo :colspan="venda_selected_pagamento_keys_length">Forma de pagamento</th>
        </tr>
        <tr>
            <th  v-for="y,t in venda_selected.pagamento" >{{ t }}</th>
        </tr>
         <tr v-for="j in venda_selected.pagamento" >
            <td  v-for="yy in j"  >{{ yy }}</td>
        </tr>
      </table> -->
      <br>
      <!-- <table v-if="venda_selected.pagamento" class="table1">
        <tr>
          <th class="titulo" :colspan="venda_selected_pagamento_keys_length">Forma de pagamento</th>
        </tr>
        <tr>
          <th v-for="y,t in venda_selected.pagamento">{{ t }}</th>
        </tr>
        <tr>
          <td v-for="yy in venda_selected.pagamento">{{ yy | money }}</td>
        </tr>
      </table> -->

      <div v-if="venda_selected.pagamento" style="font-size: 18px;">
        <h3>Forma de pagamento:</h3>
        <div v-if="venda_selected.pagamento.dinheiro">Dinheiro: {{ venda_selected.pagamento.dinheiro | money }}</div>
        <div v-if="venda_selected.pagamento.debito">Cartão de débito: {{ venda_selected.pagamento.debito | money }}</div>
        <div v-if="venda_selected.pagamento.credito">Cartão de crédito: {{ venda_selected.pagamento.credito | money }}</div>
        <div v-if="venda_selected.pagamento.faturado">Faturado: {{ venda_selected.pagamento.faturado | money }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="vendaPrintFlg = true">Imprimir</el-button>
        <el-button type="primary" @click="dialogPvVisible = false">Fechar</el-button>
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
          Cupom número: {{ venda_selected.id }}<br>
          Data: {{ venda_selected.data }}<br>
          {{ venda_selected.cliente }} - {{ venda_selected.nome }}
          Cliente: {{ venda_selected.cliente }} - {{ venda_selected.nome }}<br>
        </div><br>
        <el-table
          border
          :data="venda_selected.itens"
          row-class-name="cupom_total"
          header-row-class-name="cupom_total"
          style="width: 100%; font-size:13px;"
        >
          <el-table-column
            prop="descricao"
            label="Desc"
            width="50px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.id }}<br>{{ scope.row.descricao }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="pco_venda"
            label="Pço"
            width="50px"
          >
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
        <!-- <table class="table1 sheet" border=1 v-if=cupom.itens style="margin-left:0px; _width: 100%;">
          <tr>
              <th class=titulo colspan="6">Produtos comprados</th>
          </tr>
          <tr>
              <th v-for="y,t in cupom.itens[0]" >{{ t }}</th>
          </tr>
          <tr v-for="j in cupom.itens" >
              <td  v-for="yy in j"  >
                {{ yy }}
              </td>
          </tr>
        </table> -->
        <div v-if="venda_selected.itens" class="cupom_total2" style="margin-top: 5px; text-align: left; font-family: tahoma;">
          (Itens: {{ venda_selected.itens.length }})<br> Sub-total: {{ venda_selected.subtotal | money }}<br> Desconto:{{ venda_selected.desconto | money }}<br>Total: {{ venda_selected.total | money }}
        </div>
        <div v-if="venda_selected.pagamento">
          <h3>Forma de pagamento:</h3>
          <div v-if="venda_selected.pagamento.dinheiro">Dinheiro: {{ venda_selected.pagamento.dinheiro | money }}</div>
          <div v-if="venda_selected.pagamento.debito">Cartão de débito: {{ venda_selected.pagamento.debito | money }}</div>
          <div v-if="venda_selected.pagamento.credito">Cartão de crédito: {{ venda_selected.pagamento.credito | money }}</div>
          <div v-if="venda_selected.pagamento.faturado">Faturado: {{ venda_selected.pagamento.faturado | money }}</div>
        </div>
        <div>
          <p>Obrigado pela preferência! Volte sempre.</p>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<style scoped>
  @page {
      margin-left: 0cm;
      size: 58mm 100mm } /* output size */
    .receipt .sheet { width: 58mm; _height: 100mm } /* sheet size */
  @media print { .receipt { width: 58mm } } /* fix for Chrome */

  .cupom_total {
      text-align: right; font-family: tahoma; font-size: 13px;
    }

  .table1 td, th {
    background-color: #F8F8F8;
    padding: 15px;
    margin: 5px;
    border-bottom: 1px solid #ddd;
    text-transform: capitalize;
    font-size: 16px;
  }

  .titulo {
    text-transform: uppercase;
  }

  .grid-content {
    padding: 7px;;
    font-size: 18px;;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

<script>
import { fetchList } from '@/api/generic'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import { Printd } from 'printd'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Vendas',
  components: { Pagination, VueGoodTable },
  filters: {
    timeConverter(UNIX_timestamp) {
      var a = new Date(UNIX_timestamp)
      console.log('a:', a)
      var months = ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      var year = a.getFullYear()
      // var month = months[a.getMonth()];
      var month = a.getMonth() + 1
      var date = a.getDate()
      var hour = a.getHours()
      var min = a.getMinutes()
      var sec = a.getSeconds()
      var time = date + '/' + month + '/' + year + ' - ' + hour + ':' + min + ':' + sec
      console.log('log:', time)
      return time
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
      vendaPrintFlg: false,
      tableKey: null,
      sortChange: null,
      dialogPvVisible: false,
      venda_itens_columns: [
        {
          label: 'Código',
          field: 'id',
          type: 'number'
        },
        {
          label: 'Produto',
          field: 'descricao',
          type: 'string',
          width: '500px'
        },
        {
          label: 'Valor',
          field: 'pco_venda',
          type: 'decimal'
        },
        {
          label: 'Quantidade',
          field: 'qnt',
          type: 'number',
          width: '150px'
        },
        {
          label: 'Total',
          field: 'total',
          type: 'decimal'
        }
      ],
      columns: [
        {
          label: 'Data',
          field: 'data',
          type: 'string',
          width: '200px'
        },
        {
          label: 'Cliente',
          field: 'cliente',
          type: 'string',
          width: '350px'
        },
        {
          label: 'Subtotal',
          field: 'subtotal',
          type: 'decimal',
          width: '150px'

          // dateInputFormat: 'yyyy-MM-dd',
          // dateOutputFormat: 'MMM Do yy',
        },
        {
          label: 'Desconto',
          field: 'desconto',
          type: 'decimal'
        },
        {
          label: 'Total',
          field: 'total',
          type: 'decimal',
          width: '200px'
        }
      ],
      venda_selected_itens_keys_length: 0,
      venda_selected_pagamento_keys_length: 0,
      venda_selected: {
        items: {}
      },
      vendas: [{
        id: null,
        cliente: null,
        cliente_nome: null,
        subtotal: null,
        desconto: null,
        total: null,
        created: null,
        pagamento: {
          id: null,
          id_venda: null,
          dinheiro: null,
          cartao_debito: null,
          cartao_credito: null,
          faturado: null
        },
        itens: [{
          id_venda: null,
          produto: null,
          valor: null,
          qnt: null,
          total: null
        }]
      }],
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: 'id DESC',
        find: {
          nome: '',
          doc: ''
        }
      },
      temp: {
        id: undefined,
        timestamp: new Date()
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  mounted() {
    this.getVendas()
  },
  methods: {
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
    getVendas() {
      this.listLoading = true
      console.log(this.listQuery)

      fetchList('view_vendas_completo', this.listQuery).then(response => {
        console.log('response.data.items:', response.data.items)
        this.vendas = response.data.items

        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 0)
      })
    },
    getList_vendaItens(params) {
      console.log(1, params)
      this.getVendas()
      // Load spin
      this.listLoading = true
      this.venda_selected = {}
      // Set object of form view
      this.venda_selected = params
      this.venda_selected.itens = JSON.parse(this.venda_selected.itens)
      this.venda_selected_itens_keys_length = Object.keys(this.venda_selected.itens[0]).length

      // Pagamento
      this.venda_selected.pagamento = JSON.parse(this.venda_selected.pagamento)
      this.venda_selected_pagamento_keys_length = Object.keys(this.venda_selected.pagamento).length

      // Sum total
      this.venda_selected.total = params.subtotal - params.desconto

      this.dialogPvVisible = true
    }
  }
}
</script>
