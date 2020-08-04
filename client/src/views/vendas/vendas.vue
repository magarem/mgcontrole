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
            <span>{{ scope.row.data }}</span>
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

      <!-- <vue-good-table
        :columns="columns"
        :rows="vendas"
        :search-options="{enabled: true}"
        theme="black-rhino"
        :line-numbers="true"
        @on-row-click="getList_vendaItens"
      /> -->
    </div>
    <!--

    Modal Venda details

    -->
    <el-dialog :visible.sync="dialogPvVisible" title="Venda" width="80%" top="5vh" center>
      <span slot="title" style="font-size: 30px; margin-bottom: 100px;">Venda detalhada</span>
      <el-row :gutter="10" type="flex" class="row-bg">
        <el-col :span="2"><div class="grid-content bg-purple"><b>#:</b> {{ venda_selected.id }}</div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple"><b>Data:</b> {{ venda_selected.data }}</div></el-col>
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
      <table v-if="venda_selected.pagamento" class="table1">
        <tr>
          <th class="titulo" :colspan="venda_selected_pagamento_keys_length">Forma de pagamento</th>
        </tr>
        <tr>
          <th v-for="y,t in venda_selected.pagamento">{{ t }}</th>
        </tr>
        <tr>
          <td v-for="yy in venda_selected.pagamento">{{ yy | money }}</td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Fechar</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style scoped>

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

export default {
  name: 'Vendas',
  components: { VueGoodTable },
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
        limit: 20,
        sort: 'id DESC'
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
